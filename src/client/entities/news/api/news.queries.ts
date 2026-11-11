import { queryOptions } from '@tanstack/react-query';
import { STALE_INITIAL_DATA_UPDATED_AT } from '../../../shared/api/query-client';
import { getNews } from './news.loaders';

export const newsQueries = {
  all: () => ['news'],

  lists: () => [...newsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...newsQueries.lists()],
      queryFn: getNews,
      initialData: [],
      initialDataUpdatedAt: STALE_INITIAL_DATA_UPDATED_AT,
    }),
};
