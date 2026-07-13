import { dehydrate } from '@tanstack/react-query';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { AppRoute } from '../../../common/constants/routes';
import { authQueries } from '../../entities/auth/api';
import { filmsQueries } from '../../entities/films/api';
import { hallplanQueries } from '../../entities/hallplan/api';
import { locationsQueries } from '../../entities/locations/api';
import { newsQueries } from '../../entities/news/api';
import { queryClient } from '../../shared/api/query-client';
import { ServerApp } from './ServerApp';

export type RenderSsrTemplate = typeof renderSsrTemplate;
// On the server, we need to prefetch data before we generate/render the markup,
// we need to dehydrate that data into a serializable format we can embed in the markup,
// and on the client we need to hydrate that data into a React Query cache
// so we can avoid doing a new fetch on the client.
export const renderSsrTemplate = async (request: Request) => {
  const { path } = request;
  const url = path === AppRoute.ROOT ? path : request.path.replace(/\/$/, '');

  // TODO Think about pass query params to prefetch
  // console.log(request.query);
  console.info({ url });

  // Add specific page queries
  switch (url) {
    case AppRoute.ROOT:
      await queryClient.prefetchQuery(filmsQueries.list());
      await queryClient.prefetchQuery(newsQueries.list());

      break;
    case AppRoute.ORDER:
      await queryClient.prefetchQuery(hallplanQueries.getOne());

      break;
  }

  await queryClient.prefetchQuery(authQueries.getOne());
  await queryClient.prefetchQuery(locationsQueries.getOne());
  await queryClient.prefetchQuery(locationsQueries.list());

  // Get current page data to pass to zustand
  const dehydratedQueryState = dehydrate(queryClient);

  const html = renderToString(<ServerApp queryClient={queryClient} url={url} />);

  const zustandState = {
    // ...(typeof locationsData === 'undefined' ? {} : { locations: locationsData }),
  };

  return { html, dehydratedQueryState, zustandState };
};
