import type { Response } from 'express';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ViteDevServer } from 'vite';
import { isRequestAborted, isTimeoutError } from '../../../client/shared/api/request-abort';
import { AppRoute } from '../../../common/constants/routes';
import { beginRenderAbort } from './renderAbort';
import { renderPage } from './renderPage';

const PERSONALIZED_DOCUMENT_CACHE_CONTROL = 'private, no-store';

type RenderMiddlewareOptions = {
  timeoutMs?: number;
};

const renderErrorDocument = (status: number) => {
  const message =
    status === StatusCodes.GATEWAY_TIMEOUT
      ? 'The page took too long to render.'
      : 'The page could not be rendered.';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${status}</title></head><body><p>${message}</p></body></html>`;
};

const sendDocument = (response: Response, status: number, html: string) => {
  response
    .status(status)
    .set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': PERSONALIZED_DOCUMENT_CACHE_CONTROL,
    })
    .send(html);
};

export const renderMiddlewareBuilder = (vite: ViteDevServer | undefined, options: RenderMiddlewareOptions = {}) => {
  const renderMiddleware = Router();

  renderMiddleware.use(AppRoute.ROOT, async (request, response, next) => {
    const abort = beginRenderAbort(response, options.timeoutMs);

    try {
      const url = request.originalUrl;

      if (
        url.includes('/static/') ||
        url.includes('/src/') ||
        url.includes('/v1') ||
        url.endsWith('.css') ||
        url.endsWith('.js') ||
        url.endsWith('.svg') ||
        url.endsWith('.ico') ||
        url.endsWith('.map')
      ) {
        return next();
      }

      const page = await renderPage(request, vite, abort.signal);

      if (response.writableEnded) {
        return;
      }

      if (page.location) {
        response
          .status(page.statusCode)
          .set({
            Location: page.location,
            'Cache-Control': PERSONALIZED_DOCUMENT_CACHE_CONTROL,
          })
          .end();

        return;
      }

      sendDocument(response, page.statusCode, page.html);
    } catch (error) {
      if (vite && error instanceof Error) {
        vite.ssrFixStacktrace(error);
      }

      console.error(error);

      if (response.headersSent) {
        next(error);
        return;
      }

      if (isTimeoutError(abort.signal.reason)) {
        sendDocument(response, StatusCodes.GATEWAY_TIMEOUT, renderErrorDocument(StatusCodes.GATEWAY_TIMEOUT));
        return;
      }

      if (response.writableEnded || response.destroyed || isRequestAborted(abort.signal.reason)) {
        return;
      }

      sendDocument(response, StatusCodes.INTERNAL_SERVER_ERROR, renderErrorDocument(StatusCodes.INTERNAL_SERVER_ERROR));
    } finally {
      abort.finish();
    }
  });

  return renderMiddleware;
};
