import { dehydrate } from '@tanstack/react-query';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { AppRoute } from '../../../common/constants/routes';
import { fetchFilms, FilmsQueryKey } from '../../entities/films/api';
import { fetchHallplan, HallplanQueryKey } from '../../entities/hallplan/api';
import { fetchGeolocation, fetchLocations, LocationsQueryKey } from '../../entities/locations/api';
import { fetchNews, NewsQueryKey } from '../../entities/news/api';
import { fetchUser, UserQueryKey } from '../../entities/user/api';
import { queryClient } from '../../shared/api/queryClient';
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
      await queryClient.prefetchQuery({
        queryKey: FilmsQueryKey.films(),
        queryFn: fetchFilms,
      });

      await queryClient.prefetchQuery({
        queryKey: NewsQueryKey.news(),
        queryFn: fetchNews,
      });

      break;
    case AppRoute.ORDER:
      await queryClient.prefetchQuery({
        queryKey: HallplanQueryKey.all,
        queryFn: fetchHallplan,
      });

      break;
  }

  await queryClient.prefetchQuery({
    queryKey: UserQueryKey.user(),
    queryFn: fetchUser,
  });

  await queryClient.prefetchQuery({
    queryKey: LocationsQueryKey.geolocation(),
    queryFn: fetchGeolocation,
  });

  await queryClient.prefetchQuery({
    queryKey: LocationsQueryKey.locations(),
    queryFn: fetchLocations,
  });

  // Get current page data to pass to zustand
  const hallplanData = queryClient.getQueryData(HallplanQueryKey.all);
  const userData = queryClient.getQueryData(UserQueryKey.user());
  const filmsData = queryClient.getQueryData(FilmsQueryKey.films());
  const newsData = queryClient.getQueryData(NewsQueryKey.news());
  const geolocationData = queryClient.getQueryData(LocationsQueryKey.geolocation());
  const locationsData = queryClient.getQueryData(LocationsQueryKey.locations());
  const dehydratedQueryState = dehydrate(queryClient);

  const html = renderToString(<ServerApp queryClient={queryClient} url={url} />);

  const zustandState = {
    ...(typeof hallplanData === 'undefined' ? {} : hallplanData),
    ...(typeof userData === 'undefined' ? {} : { user: userData }),
    ...(typeof filmsData === 'undefined' ? {} : { films: filmsData }),
    ...(typeof newsData === 'undefined' ? {} : { news: newsData }),
    ...(typeof geolocationData === 'undefined' ? {} : { location: geolocationData }),
    ...(typeof locationsData === 'undefined' ? {} : { locations: locationsData }),
  };

  return { html, dehydratedQueryState, zustandState };
};
