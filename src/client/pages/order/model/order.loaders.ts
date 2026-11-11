import type { QueryClient } from '@tanstack/react-query';
import type { HallplanResponse } from '../../../../common/entities/hallplan';
import { hallplanQueries } from '../../../entities/hallplan/api';
import { ensureResolvedLocation } from '../../../features/locations/model/locations.resolvers';
import { loadQuery } from '../../../shared/api/load-query';
import { getRouteQueryClient } from '../../../shared/api/query-client';

export const prefetchOrder = async (queryClient: QueryClient) => {
  const location = await ensureResolvedLocation(queryClient);
  const hallplan = location
    ? await loadQuery<HallplanResponse>(queryClient, hallplanQueries.getOne(location.id))
    : null;

  return {
    location,
    hallplan: hallplan ?? null,
  };
};

export const orderLoader = () => prefetchOrder(getRouteQueryClient());
