import { queryOptions } from '@tanstack/react-query';
import { getFilms } from './films.loaders';

export const filmsQueries = {
  all: () => ['films'],

  lists: () => [...filmsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...filmsQueries.lists()],
      queryFn: getFilms,
    }),
};
