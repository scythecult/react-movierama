import type { Request } from 'express';
import { access, constants, readFile } from 'fs/promises';
import type { ViteDevServer } from 'vite';
import type { RenderSsrTemplate } from '../../../client/app/entrypoint/entryServer.js';
import { CLIENT_DIST_DIR, CLIENT_ENTRY_SOURCE_DIR, SERVER_DIST_DIR } from '../../../common/constants/common.js';
import { Config } from '../../../common/env.js';

export const renderPage = async (request: Request, vite: ViteDevServer | undefined) => {
  const isProduction = Config.nodeEnv === 'production';
  let template: string;
  let render: RenderSsrTemplate;

  // TODO Think about move to tsx as dev-server (only build phase)
  if (!isProduction && vite) {
    // Dev - always read fresh template
    template = await readFile('./index.html', 'utf-8');
    template = (await vite.transformIndexHtml(Config.baseUrl, template)) || '';

    const { renderSsrTemplate } = await vite.ssrLoadModule(`${CLIENT_ENTRY_SOURCE_DIR}/entryServer.tsx`);

    render = renderSsrTemplate;
  } else {
    // Prod
    template = await readFile(`${CLIENT_DIST_DIR}/index.html`, 'utf-8');

    try {
      await access(`${SERVER_DIST_DIR}/entryServer.js`, constants.R_OK);

      const { renderSsrTemplate } = await import(`${SERVER_DIST_DIR}/entryServer.js`);

      render = renderSsrTemplate;
    } catch {
      console.error('⚠️ entryServer.js not found — did you forget to build the project?');

      // TODO Call specific error class
      throw new Error('SSR entry not found');
    }
  }

  const { html, dehydratedQueryState, zustandState } = await render(request);

  const finalHtml = template.replace('<!-- app html -->', html ?? '').replace(
    '<!--app-initial-data-->',
    `<script>
        window.__pageQueryData__=${JSON.stringify(dehydratedQueryState)}
        window.__appInitialState__=${JSON.stringify(zustandState)}
    </script>`,
  );

  return finalHtml;
};
