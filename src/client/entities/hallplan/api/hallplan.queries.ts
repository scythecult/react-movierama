import { queryOptions } from '@tanstack/react-query';
import { getHallplan } from './hallplan.loaders';

export const hallplanQueries = {
  all: () => ['hallplan'],

  one: () => [...hallplanQueries.all(), 'one'],

  getOne: (locationId?: number) =>
    queryOptions({
      queryKey: [...hallplanQueries.one(), locationId ?? null],
      queryFn: () => getHallplan(locationId),
      enabled: typeof locationId === 'number' && locationId > 0,
    }),
};
