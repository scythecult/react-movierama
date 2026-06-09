import { queryOptions } from '@tanstack/react-query';
import { getGeolocation, getLocations } from './locations.loaders';

export const locationsQueries = {
  all: () => ['locations'],

  lists: () => [...locationsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...locationsQueries.lists()],
      queryFn: getLocations,
      initialData: [],
    }),

  one: () => [...locationsQueries.all(), 'one'],
  getOne: () =>
    queryOptions({
      queryKey: [...locationsQueries.one()],
      queryFn: getGeolocation,
      initialData: {
        id: 0,
        name: '',
      },
    }),
};
