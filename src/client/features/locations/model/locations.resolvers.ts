import type { QueryClient } from '@tanstack/react-query';
import { locationsQueries } from '../../../entities/locations/api';
import { loadQuery } from '../../../shared/api/load-query';

export const isSelectedLocation = <T extends { id: number }>(location: T | null | undefined): location is T =>
  Boolean(location && location.id > 0);

// The shell and a page prefetch can both ask for the location in one render.
// Infinity keeps the later call on the cached result.
export const ensureResolvedLocation = async (queryClient: QueryClient) => {
  const current = await loadQuery<{ id: number } | null>(queryClient, {
    ...locationsQueries.getCurrent(),
    staleTime: Infinity,
  });

  if (isSelectedLocation(current)) {
    return current;
  }

  const detected = await loadQuery<{ id: number } | null>(queryClient, {
    ...locationsQueries.detectCurrent(),
  });

  return isSelectedLocation(detected) ? detected : null;
};
