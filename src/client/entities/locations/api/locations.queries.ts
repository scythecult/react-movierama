import { queryOptions } from '@tanstack/react-query';
import { detectCurrentLocation, getCurrentLocation, getLocations } from './locations.loaders';

export const locationsQueries = {
  all: () => ['locations'],

  lists: () => [...locationsQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...locationsQueries.lists()],
      queryFn: getLocations,
      initialData: [],
    }),

  current: () => ['location', 'current'],
  getCurrent: () =>
    queryOptions({
      queryKey: locationsQueries.current(),
      queryFn: getCurrentLocation,
    }),

  detect: () => ['location', 'detect'],
  detectCurrent: () =>
    queryOptions({
      queryKey: locationsQueries.detect(),
      queryFn: detectCurrentLocation,
    }),
};
