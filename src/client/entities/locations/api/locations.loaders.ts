import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import type { LocationResponse, LocationsResponse } from '../../../../common/entities/locations';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const getCurrentLocation = async () => {
  const serverPayload = await apiClient.get<LocationResponse>(AppRoute.LOCATION);
  const { data } = serverPayload;

  return data.location ?? null;
};

export const getLocations = async () => {
  const serverPayload = await apiClient.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data.locations ?? [];
};

export const detectCurrentLocation = async () => {
  const serverPayload = await apiClient.get<LocationResponse>(`${AppRoute.LOCATION}${ApiRoute.DETECT}`);
  const { data } = serverPayload;

  return data.location ?? null;
};
