import type { QueryClient } from '@tanstack/react-query';
import { hallplanQueries } from '../../../entities/hallplan/api';
import { ensureResolvedLocation } from '../../../features/locations/model/locations.resolvers';

export const prefetchOrder = async (queryClient: QueryClient) => {
  const location = await ensureResolvedLocation(queryClient);

  if (location) {
    await queryClient.query(hallplanQueries.getOne(location.id));
  }
};
