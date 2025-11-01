import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { Dir } from '../../common/constants/common';
import { AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { renderMiddlewareBuilder } from '../middlewares/renderMiddlewareBuilder';
import { canvasSize, seatsData, staticSeatTypes } from '../service/serverMockData';

export const createSsrServer = async () => {
  const ssrServer = express();
  const isProduction = Config.nodeEnv === 'production';
  let vite: ViteDevServer | undefined;

  // Init common middlewares
  ssrServer.disable('x-powered-by');
  ssrServer.use(cors({ origin: Config.appUrl, credentials: true }));
  ssrServer.use(compression());
  ssrServer.use(json());
  ssrServer.use(urlencoded({ extended: true }));

  if (!isProduction) {
    // Create vite dev server
    const { createServer: createViteDevServer } = await import('vite');

    vite = await createViteDevServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base: Config.baseUrl,
    });

    ssrServer.use(vite.middlewares);
  } else {
    // Serve static files
    const sirv = (await import('sirv')).default;

    ssrServer.use(AppRoute.ROOT, sirv(`.${Dir.DIST_CLIENT}`, { extensions: [] }));
  }

  ssrServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  // Temporary move to separate route
  ssrServer.get(AppRoute.HALLPLAN, (_, response) => {
    console.info('real response');

    response.status(StatusCodes.OK).json({
      data: {
        canvas: canvasSize,
        seats: seatsData,
        seatTypes: staticSeatTypes,
      },
    });
  });

  // Render content
  ssrServer.use(
    AppRoute.ROOT,

    // TODO Implement data loader middleware, example:

    // async (request, response, next) => {

    // TODO Move fetcher to common

    //   const serverPayload = await fetcher.get<HallplanData>(AppRoute.HALLPLAN);
    //   const { data } = serverPayload;

    // TODO Update Node-Express types

    //   request.locals = request.locals || {};
    //   request.locals.data = data;

    //   next();
    // },
    renderMiddlewareBuilder(vite),
  );

  return ssrServer;
};
