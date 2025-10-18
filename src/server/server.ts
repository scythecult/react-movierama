import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../common/routes';
import { APP_URL } from '../common/url';
export const createServer = () => {
  const server = express();

  server.disable('x-powered-by');
  server.use(cors({ origin: APP_URL }));
  server.use(json());
  server.use(urlencoded({ extended: true }));

  server.get(AppRoute.HEALTH, (_, response) => {
    response.status(StatusCodes.OK).json({ ok: true });
  });

  return server;
};
