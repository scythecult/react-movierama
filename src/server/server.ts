import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../common/constants/routes';
import { ServerConfig } from './env';
export const createServer = () => {
  const server = express();

  server.disable('x-powered-by');
  server.use(cors({ origin: ServerConfig.appUrl, credentials: true }));
  server.use(json());
  server.use(urlencoded({ extended: true }));

  server.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  return server;
};
