import compression from 'compression';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { serverMocks } from '../../../mocks/node';
import { CLIENT_DIST_DIR } from '../../common/constants/common';
import { AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { renderMiddlewareBuilder } from '../middleware/render/renderMiddlewareBuilder';

export const createSsrServer = async () => {
  const ssrServer = express();
  const isProduction = Config.nodeEnv === 'production';
  const isWatchMode = Config.appMode === 'watch';
  const isTestMode = Config.appMode === 'test';
  const isMockServerEnabled = (!isProduction && !isWatchMode) || isTestMode;
  let vite: ViteDevServer | undefined;

  ssrServer.disable('x-powered-by');
  ssrServer.use(compression());

  // Init mocks
  if (isMockServerEnabled) {
    serverMocks.listen();
  }

  if (!isProduction) {
    // Create vite dev server
    const { createServer: createViteDevServer } = await import('vite');

    vite = await createViteDevServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base: Config.baseUrl,
    });

    ssrServer.use(Config.baseUrl, vite.middlewares);
  } else {
    // Serve static files
    const sirv = (await import('sirv')).default;

    ssrServer.use(AppRoute.ROOT, sirv(CLIENT_DIST_DIR, { extensions: [] }));
  }

  ssrServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  // Render content
  ssrServer.use(AppRoute.ROOT, renderMiddlewareBuilder(vite));

  return ssrServer;
};
