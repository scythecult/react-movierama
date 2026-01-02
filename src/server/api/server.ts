import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiVersion, AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { v1 } from '../routes/v1';

export const createApiServer = async () => {
  const apiServer = express();

  // Init common middlewares
  apiServer.disable('x-powered-by');
  apiServer.use(cors({ origin: Config.ssrUrl, credentials: true }));
  apiServer.use(compression());
  apiServer.use(json());
  apiServer.use(urlencoded({ extended: true }));

  apiServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  apiServer.use(ApiVersion.V1, v1);

  return apiServer;
};
