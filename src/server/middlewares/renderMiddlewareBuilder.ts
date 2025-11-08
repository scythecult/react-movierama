import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { renderPage } from '../../client/renderPage';
import { AppRoute } from '../../common/constants/routes';

export const renderMiddlewareBuilder = (vite: ViteDevServer | undefined) => {
  const renderMiddleware = Router();

  renderMiddleware.use(AppRoute.ROOT, async (request, response, next) => {
    try {
      const url = request.originalUrl;

      if (
        url.includes('/static/') ||
        url.includes('/src/') ||
        url.endsWith('.css') ||
        url.endsWith('.js') ||
        url.endsWith('.svg') ||
        url.endsWith('.ico') ||
        url.endsWith('.map')
      ) {
        return next();
      }

      const html = await renderPage(request, vite);

      response.status(StatusCodes.OK).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.info(error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  });

  return renderMiddleware;
};
