import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiVersion, AppRoute } from '../../common/constants/routes';
import { Config } from '../../common/env';
import { errorMiddleware } from '../middleware/error-middleware/errorMiddleware';
import { sessionMiddleware } from '../middleware/session-middleware/sessionMiddleware';
import { v1 } from '../routes/v1';

export const createApiServer = async () => {
  const apiServer = express();

  apiServer.disable('x-powered-by');
  // SSR forwards the viewer address in X-Forwarded-For. Browsers cannot set that header.
  apiServer.set('trust proxy', true);
  apiServer.use(cors({ origin: Config.ssrUrl, credentials: true }));
  apiServer.use(compression());
  apiServer.use(cookieParser());
  apiServer.use(json());
  apiServer.use(urlencoded({ extended: true }));
  apiServer.use(sessionMiddleware());

  apiServer.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  apiServer.use(ApiVersion.V1, v1);

  apiServer.use(errorMiddleware);

  return apiServer;
};
