import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import {
  MOCK_CITY_TO_ID_MAP,
  MOCK_CURRENT_LOCATION,
  MOCK_LOCATIONS,
  type MockCityToIdMapKey,
} from '../../../mocks/data/locations';
import { serverMocks } from '../../../mocks/node';
import { Dir } from '../../common/constants/common';
import { AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { renderMiddlewareBuilder } from '../middlewares/renderMiddlewareBuilder';
import { canvasSize, seatsData, staticSeatTypes } from '../services/serverMockData';

export const createSsrServer = async () => {
  const ssrServer = express();
  const isProduction = Config.nodeEnv === 'production';
  const isWatchMode = Config.appMode === 'watch';
  const isTestMode = Config.appMode === 'test';
  const isMockServerEnabled = (!isProduction && !isWatchMode) || isTestMode;
  let vite: ViteDevServer | undefined;

  // Init common middlewares
  // TODO Remove unused
  ssrServer.disable('x-powered-by');
  ssrServer.use(cors({ origin: Config.appUrl, credentials: true }));
  ssrServer.use(compression());
  ssrServer.use(json());
  ssrServer.use(urlencoded({ extended: true }));

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

    ssrServer.use(AppRoute.ROOT, sirv(`.${Dir.DIST_CLIENT}`, { extensions: [] }));
  }

  ssrServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  ssrServer.get(AppRoute.LOCATION, async (_, response) => {
    // Temporary
    // TODO Cache request by some key
    // TODO Get request.ip and conditionally use it
    // Check if ip same as before, return cached data

    let currentLocation = MOCK_CURRENT_LOCATION.getLocation();

    if (currentLocation.id <= 0) {
      const geolocationResponse = await fetch('http://ip-api.com/json/');

      if (!geolocationResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await geolocationResponse.json();
      const { city = 'Yaroslavl' }: { city: MockCityToIdMapKey } = result;

      currentLocation = MOCK_LOCATIONS.find((location) => MOCK_CITY_TO_ID_MAP[city] === location.id)!;
    }

    MOCK_CURRENT_LOCATION.setLocation(currentLocation);

    response.status(StatusCodes.OK).json({
      data: {
        location: currentLocation,
      },
    });
  });

  ssrServer.post(AppRoute.LOCATION, async (request, response) => {
    const { id } = request.body;
    const newCurrentLocation = MOCK_LOCATIONS.find((location) => id === location.id)!;

    MOCK_CURRENT_LOCATION.setLocation(newCurrentLocation);

    response.status(StatusCodes.OK).json({
      data: {
        location: newCurrentLocation,
      },
    });
  });

  // Temporary move to separate route
  ssrServer.get(AppRoute.HALLPLAN, (_, response) => {
    console.info('real response hallplan');

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
