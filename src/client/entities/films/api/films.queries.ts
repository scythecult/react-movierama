import { queryOptions } from '@tanstack/react-query';
import { STALE_INITIAL_DATA_UPDATED_AT } from '../../../shared/api/query-client';
import { getFilms } from './films.loaders';

export const filmsQueries = {
  all: () => ['films'],

  lists: () => [...filmsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...filmsQueries.lists()],
      queryFn: getFilms,
      initialData: [],
      initialDataUpdatedAt: STALE_INITIAL_DATA_UPDATED_AT,
    }),
};
