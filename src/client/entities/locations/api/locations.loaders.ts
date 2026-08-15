import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client/api-client';
import type { GeolocationResponse, LocationsResponse } from '../model/locations.types';

export const getGeolocation = async () => {
  const serverPayload = await apiClient.get<GeolocationResponse>(AppRoute.GEOLOCATION);
  const { data } = serverPayload;

  return data.location ?? {};
};

export const getLocations = async () => {
  const serverPayload = await apiClient.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data.locations ?? [];
};
