import compression from 'compression';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { CLIENT_DIST_DIR } from '../../common/constants/common';
import { AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { errorMiddleware } from '../middleware/error-middleware/errorMiddleware';
import { renderMiddlewareBuilder } from '../middleware/render/renderMiddlewareBuilder';

export const createSsrServer = async () => {
  const ssrServer = express();
  const isProduction = Config.nodeEnv === 'production';
  const isMockServerEnabled = Config.appMode === 'test' || (Config.appMode === 'local' && !isProduction);
  let vite: ViteDevServer | undefined;

  ssrServer.disable('x-powered-by');
  // One proxy hop. req.ip is the viewer address forwarded to the API.
  ssrServer.set('trust proxy', 1);
  ssrServer.use(compression());

  ssrServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  if (isMockServerEnabled) {
    const { listenMockServer } = await import('../../../mocks/node');

    listenMockServer();
  }

  if (isProduction) {
    const sirv = (await import('sirv')).default;
    const serveClientAssets = sirv(CLIENT_DIST_DIR, {
      extensions: [],
      etag: true,
      setHeaders(response, pathname) {
        if (pathname.startsWith('/assets/')) {
          response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    });

    ssrServer.use(AppRoute.ROOT, (request, response, next) => {
      if (request.path.endsWith('.html')) {
        return next();
      }

      return serveClientAssets(request, response, next);
    });
  } else {
    const { createServer: createViteDevServer } = await import('vite');

    vite = await createViteDevServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    ssrServer.use(vite.middlewares);
  }

  ssrServer.use(AppRoute.ROOT, renderMiddlewareBuilder(vite));

  ssrServer.use(errorMiddleware);

  return ssrServer;
};
