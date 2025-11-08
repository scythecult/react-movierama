import type { Request } from 'express';
import { access, constants, readFile } from 'fs/promises';
import type { ViteDevServer } from 'vite';
import { Dir } from '../common/constants/common';
import { Config } from '../common/env';
import type { RenderSsrTemplate } from './entryServer';

export const renderPage = async (request: Request, vite: ViteDevServer | undefined) => {
  const isProduction = Config.nodeEnv === 'production';
  let template: string;
  let render: RenderSsrTemplate;

  // TODO Think about move to tsx as dev-server (only build phase)
  if (!isProduction && vite) {
    // Dev - always read fresh template
    template = await readFile('./index.html', 'utf-8');
    template = await vite.transformIndexHtml(Config.baseUrl, template);

    const { renderSsrTemplate } = await vite.ssrLoadModule(`.${Dir.SOURCE_CLIENT}/entryServer.tsx`);
    render = renderSsrTemplate;
  } else {
    // Prod
    template = await readFile(`.${Dir.DIST_CLIENT}/index.html`, 'utf-8');

    try {
      await access('./dist/server/entryServer.js', constants.R_OK);

      const { renderSsrTemplate } = await import('../../dist/server/entryServer.js');
      render = renderSsrTemplate;
    } catch {
      console.error('⚠️ entryServer.js not found — did you forget to build the project?');

      // TODO Call specific error class
      throw new Error('SSR entry not found');
    }
  }

  const { html, dehydratedQueryState, zustandState } = await render(request.originalUrl);

  const finalHtml = template.replace('<!-- app html -->', html ?? '').replace(
    '<!--app-initial-data-->',
    `<script>
        window.__pageQueryData__=${JSON.stringify(dehydratedQueryState)}
        window.__appInitialState__=${JSON.stringify(zustandState)}
    </script>`,
  );

  return finalHtml;
};
