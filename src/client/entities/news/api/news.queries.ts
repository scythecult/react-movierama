import { queryOptions } from '@tanstack/react-query';
import { getNews } from './news.loaders';

export const newsQueries = {
  all: () => ['news'],

  lists: () => [...newsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...newsQueries.lists()],
      queryFn: getNews,
    }),
};
