import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { AppRoute } from '../common/constants/routes';
import { fetchFilms } from './lib/api/films/requests';
import { fetchHallplan } from './lib/api/hallplan/requests';
import { fetchLocation } from './lib/api/location/requests';
import { fetchLocations } from './lib/api/locations/requests';
import { fetchNews } from './lib/api/news/requests';
import { MainPageQueryKey, OrderPageQueryKey } from './lib/api/queryKeys';
import { fetchUser } from './lib/api/user/requests';
import { ServerApp } from './ServerApp';

export type RenderSsrTemplate = typeof renderSsrTemplate;
// On the server, we need to prefetch data before we generate/render the markup,
// we need to dehydrate that data into a serializable format we can embed in the markup,
// and on the client we need to hydrate that data into a React Query cache
// so we can avoid doing a new fetch on the client.
export const renderSsrTemplate = async (request: Request) => {
  const url = request.originalUrl;

  const queryClient = new QueryClient();

  // TODO Think about pass query params to prefetch
  // console.log(request.query);
  console.info({ url });

  // Add specific page queries
  switch (url) {
    case AppRoute.ROOT:
      await queryClient.prefetchQuery({
        queryKey: MainPageQueryKey.films(),
        queryFn: fetchFilms,
      });

      await queryClient.prefetchQuery({
        queryKey: MainPageQueryKey.news(),
        queryFn: fetchNews,
      });

      break;
    case AppRoute.ORDER_PAGE:
      await queryClient.prefetchQuery({
        queryKey: OrderPageQueryKey.all,
        queryFn: fetchHallplan,
      });

      break;
  }

  await queryClient.prefetchQuery({
    queryKey: MainPageQueryKey.user(),
    queryFn: fetchUser,
  });

  await queryClient.prefetchQuery({
    queryKey: MainPageQueryKey.location(),
    queryFn: fetchLocation,
  });

  await queryClient.prefetchQuery({
    queryKey: MainPageQueryKey.locations(),
    queryFn: fetchLocations,
  });

  // Get current page data to pass to zustand
  const hallplanData = queryClient.getQueryData(OrderPageQueryKey.all);
  const userData = queryClient.getQueryData(MainPageQueryKey.user());
  const locationData = queryClient.getQueryData(MainPageQueryKey.location());
  const dehydratedQueryState = dehydrate(queryClient);

  const html = renderToString(<ServerApp queryClient={queryClient} url={url} />);

  const zustandState = {
    ...(typeof hallplanData === 'undefined' ? {} : hallplanData),
    ...(typeof userData === 'undefined' ? {} : userData),
    ...(typeof locationData === 'undefined' ? {} : locationData),
  };

  return { html, dehydratedQueryState, zustandState };
};
