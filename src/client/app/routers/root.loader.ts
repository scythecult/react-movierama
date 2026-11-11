import { authQueries } from '../../entities/auth/api';
import { locationsQueries } from '../../entities/locations/api';
import { ensureResolvedLocation } from '../../features/locations/model/locations.resolvers';
import { loadQuery } from '../../shared/api/load-query';
import { getRouteQueryClient } from '../../shared/api/query-client';

// The header reads the user, the city list, and the resolved city on every page.
export const rootLoader = async () => {
  const queryClient = getRouteQueryClient();
  const [user, locations, location] = await Promise.all([
    loadQuery(queryClient, authQueries.getOne()),
    loadQuery(queryClient, locationsQueries.list()),
    ensureResolvedLocation(queryClient),
  ]);

  return {
    user: user ?? null,
    locations: locations ?? null,
    location,
  };
};
