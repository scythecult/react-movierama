import { defaultShouldDehydrateQuery, dehydrate } from '@tanstack/react-query';
import type { Request } from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, type StaticHandlerContext } from 'react-router';
import { createQueryClient } from '../../shared/api/query-client';
import type { SsrRequestContext } from '../../shared/api/request-context';
import { runWithRequestContext, setRequestContextStorage, toSsrRequestContext } from '../../shared/api/request-context';
import { appRoutes } from '../routers/appRoutes';
import { createAppStore, toPersistedAppState } from '../store/AppStore';
import { createDocumentRequest } from './document-request';
import { ServerApp } from './ServerApp';

const requestContextStorage = new AsyncLocalStorage<SsrRequestContext>();

setRequestContextStorage(requestContextStorage);

const staticHandler = createStaticHandler(appRoutes);

export type RenderSsrTemplate = typeof renderSsrTemplate;

export type RouterHydrationState = {
  loaderData: StaticHandlerContext['loaderData'];
  actionData: StaticHandlerContext['actionData'];
  errors: StaticHandlerContext['errors'];
};

const readRouteError = (context: StaticHandlerContext) => {
  if (!context.errors) {
    return undefined;
  }

  return Object.values(context.errors)[0];
};

const emptyHydrationState = (): RouterHydrationState => ({
  loaderData: {},
  actionData: null,
  errors: null,
});

export const renderSsrTemplate = async (request: Request, signal?: AbortSignal) => {
  // Retries would hold the document open. The browser retries after hydration.
  const queryClient = createQueryClient({ retry: false });
  const store = createAppStore();

  return runWithRequestContext({ ...toSsrRequestContext(request), signal, queryClient }, async () => {
    const context = await staticHandler.query(createDocumentRequest(request, signal));

    if (context instanceof Response) {
      const location = context.headers.get('location');

      if (!location) {
        throw new Error('SSR redirect is missing a location');
      }

      return {
        html: '',
        dehydratedQueryState: dehydrate(queryClient),
        routerHydrationState: emptyHydrationState(),
        zustandState: toPersistedAppState(store.getState()),
        statusCode: context.status,
        location,
      };
    }

    const error = readRouteError(context);

    if (error) {
      throw error;
    }

    if (signal?.aborted) {
      throw signal.reason ?? new DOMException('The SSR render was aborted', 'AbortError');
    }

    const router = createStaticRouter(staticHandler.dataRoutes, context);
    const dehydratedQueryState = dehydrate(queryClient, {
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'error',
    });
    const html = renderToString(<ServerApp context={context} queryClient={queryClient} router={router} store={store} />);
    const routerHydrationState: RouterHydrationState = {
      loaderData: context.loaderData,
      actionData: context.actionData ?? null,
      errors: context.errors ?? null,
    };

    return {
      html,
      dehydratedQueryState,
      routerHydrationState,
      zustandState: toPersistedAppState(store.getState()),
      statusCode: context.statusCode,
    };
  });
};
