import type { Request } from 'express';
import path from 'node:path';
import type { ViteDevServer } from 'vite';
import type { RenderSsrTemplate } from '../../../client/app/entrypoint/entryServer.js';
import { CLIENT_ENTRY_SOURCE_DIR, CLIENT_TEMPLATE_PATH, INDEX_HTML_PATH } from '../../../common/constants/common.js';
import { Config } from '../../../common/env.js';
import { loadServerEntry, type ServerEntryModule } from './loadServerEntry.js';
import { readTextFile } from './readTextFile.js';
import { serializeForInlineScript } from './serializeForInlineScript.js';

const APP_HTML_MARKER = '<!-- app html -->';
const INITIAL_DATA_MARKER = '<!-- app-initial-data -->';

type RenderedPage = Awaited<ReturnType<RenderSsrTemplate>>;

type PageAssets = {
  template: string;
  render: RenderSsrTemplate;
};

type SsrDevServer = Pick<ViteDevServer, 'transformIndexHtml' | 'ssrLoadModule'>;

const isRenderSsrTemplate = (value: unknown): value is RenderSsrTemplate => typeof value === 'function';

let productionAssets: Promise<PageAssets> | undefined;

const requireVite = (vite: SsrDevServer | undefined) => {
  if (!vite) {
    throw new Error('Vite dev server is required to render a page outside production');
  }

  return vite;
};

const readRenderExport = (serverModule: ServerEntryModule): RenderSsrTemplate => {
  if (!isRenderSsrTemplate(serverModule.renderSsrTemplate)) {
    throw new Error('SSR entry does not export renderSsrTemplate');
  }

  return serverModule.renderSsrTemplate;
};

const loadProductionAssets = async (): Promise<PageAssets> => {
  const template = await readTextFile(CLIENT_TEMPLATE_PATH);
  const serverModule = await loadServerEntry();

  return {
    template,
    render: readRenderExport(serverModule),
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

const loadDevelopmentAssets = async (vite: SsrDevServer, request: Request): Promise<PageAssets> => {
  const templateSource = await readTextFile(INDEX_HTML_PATH);
  const template = await vite.transformIndexHtml(request.originalUrl, templateSource);

  if (!template) {
    throw new Error('Vite returned an empty HTML template');
  }

  const serverModule = await vite.ssrLoadModule(path.join(CLIENT_ENTRY_SOURCE_DIR, 'entryServer.tsx'));

  return {
    template,
    render: readRenderExport({ renderSsrTemplate: serverModule.renderSsrTemplate }),
  };
};

const assertDocumentMarkers = (template: string) => {
  const missingMarkers = [APP_HTML_MARKER, INITIAL_DATA_MARKER].filter((marker) => !template.includes(marker));

  if (missingMarkers.length > 0) {
    throw new Error(`SSR template is missing ${missingMarkers.join(', ')}`);
  }
};

const stateScript = (rendered: RenderedPage) => `<script>
        window.__pageQueryData__=${serializeForInlineScript(rendered.dehydratedQueryState)}
        window.__appInitialState__=${serializeForInlineScript(rendered.zustandState)}
        window.__staticRouterHydrationData=${serializeForInlineScript(rendered.routerHydrationState)}
    </script>`;

const applyDocumentTemplate = (template: string, rendered: RenderedPage) => {
  assertDocumentMarkers(template);

  return template.replace(APP_HTML_MARKER, rendered.html).replace(INITIAL_DATA_MARKER, stateScript(rendered));
};

export const renderPage = async (request: Request, vite: SsrDevServer | undefined, signal?: AbortSignal) => {
  const assets =
    Config.nodeEnv === 'production'
      ? await getProductionAssets()
      : await loadDevelopmentAssets(requireVite(vite), request);

  assertDocumentMarkers(assets.template);

  const rendered = await assets.render(request, signal);

  if (rendered.location) {
    return { html: '', statusCode: rendered.statusCode, location: rendered.location };
  }

  return {
    html: applyDocumentTemplate(assets.template, rendered),
    statusCode: rendered.statusCode,
  };
};
