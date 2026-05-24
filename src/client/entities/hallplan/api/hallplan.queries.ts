import { queryOptions } from '@tanstack/react-query';
import { getHallplan } from './hallplan.loaders';

export const hallplanQueries = {
  all: () => ['hallplan'],

  one: () => [...hallplanQueries.all(), 'one'],

  getOne: () =>
    queryOptions({
      queryKey: [...hallplanQueries.one()],
      queryFn: getHallplan,
    }),
};
