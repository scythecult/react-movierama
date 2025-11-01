import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { renderPage } from '../../client/renderPage';
import { AppRoute } from '../../common/constants/routes';

export const renderMiddlewareBuilder = (vite: ViteDevServer | undefined) => {
  const renderMiddleware = Router();

  renderMiddleware.use(AppRoute.ROOT, async (request, response) => {
    try {
      const html = await renderPage(request, vite);

      response.status(StatusCodes.OK).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.info(error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  });

  return renderMiddleware;
};
