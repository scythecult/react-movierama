import type { Request } from 'express';
import path from 'node:path';
import type { ViteDevServer } from 'vite';
import type { RenderSsrTemplate } from '../../../client/app/entrypoint/entryServer.js';
import { CLIENT_ENTRY_SOURCE_DIR, CLIENT_TEMPLATE_PATH, INDEX_HTML_PATH } from '../../../common/constants/common.js';
import { Config } from '../../../common/env.js';
import { loadServerEntry } from './loadServerEntry.js';
import { readTextFile } from './readTextFile.js';
import { serializeForInlineScript } from './serializeForInlineScript.js';

const APP_HTML_MARKER = '<!-- app html -->';
const INITIAL_DATA_MARKER = '<!-- app-initial-data -->';

type PageAssets = {
  template: string;
  render: RenderSsrTemplate;
};

type SsrDevServer = Pick<ViteDevServer, 'transformIndexHtml' | 'ssrLoadModule'>;

const isRenderSsrTemplate = (value: unknown): value is RenderSsrTemplate => typeof value === 'function';

let productionAssets: Promise<PageAssets> | undefined;

const readRenderExport = (render: unknown): RenderSsrTemplate => {
  if (!isRenderSsrTemplate(render)) {
    throw new Error('SSR entry does not export renderSsrTemplate');
  }

  return render;
};

const loadProductionAssets = async (): Promise<PageAssets> => {
  const template = await readTextFile(CLIENT_TEMPLATE_PATH);
  const serverModule = await loadServerEntry();

  return {
    template,
    render: readRenderExport(serverModule.renderSsrTemplate),
  };
};

// The production bundle stays loaded for the process lifetime. A failed load is retried.
const getProductionAssets = () => {
  productionAssets ??= loadProductionAssets().catch((error: unknown) => {
    productionAssets = undefined;
    throw error;
  });

  return productionAssets;
};

const loadDevelopmentAssets = async (vite: SsrDevServer | undefined, request: Request): Promise<PageAssets> => {
  if (!vite) {
    throw new Error('Vite dev server is required to render a page outside production');
  }

  const templateSource = await readTextFile(INDEX_HTML_PATH);
  const template = await vite.transformIndexHtml(request.originalUrl, templateSource);

  if (!template) {
    throw new Error('Vite returned an empty HTML template');
  }

  const serverModule = await vite.ssrLoadModule(path.join(CLIENT_ENTRY_SOURCE_DIR, 'entryServer.tsx'));

  return {
    template,
    render: readRenderExport(serverModule.renderSsrTemplate),
  };
};

export const renderPage = async (request: Request, vite: SsrDevServer | undefined, signal?: AbortSignal) => {
  const assets =
    Config.nodeEnv === 'production'
      ? await getProductionAssets()
      : await loadDevelopmentAssets(vite, request);

  const missingMarkers = [APP_HTML_MARKER, INITIAL_DATA_MARKER].filter((marker) => !assets.template.includes(marker));

  if (missingMarkers.length > 0) {
    throw new Error(`SSR template is missing ${missingMarkers.join(', ')}`);
  }

  const rendered = await assets.render(request, signal);

  if (rendered.location) {
    return { html: '', statusCode: rendered.statusCode, location: rendered.location };
  }

  const initialData = `<script>
        window.__pageQueryData__=${serializeForInlineScript(rendered.dehydratedQueryState)}
        window.__appInitialState__=${serializeForInlineScript(rendered.zustandState)}
        window.__staticRouterHydrationData=${serializeForInlineScript(rendered.routerHydrationState)}
    </script>`;

  return {
    html: assets.template.replace(APP_HTML_MARKER, rendered.html).replace(INITIAL_DATA_MARKER, initialData),
    statusCode: rendered.statusCode,
  };
};
