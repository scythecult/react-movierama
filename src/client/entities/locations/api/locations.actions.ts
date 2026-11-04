import { AppRoute } from '../../../../common/constants/routes';
import type { LocationResponse } from '../../../../common/entities/locations';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const setCurrentLocation = async (locationId: number) => {
  const serverPayload = await apiClient.put<LocationResponse>(AppRoute.LOCATION, { locationId });
  const { data } = serverPayload;

  return data.location ?? null;
};
