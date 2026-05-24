import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { GeolocationData, GeolocationResponse, LocationsData, LocationsResponse } from '../model/locations.types';

export const getGeolocation = async (): Promise<GeolocationData> => {
  const serverPayload = await apiClient.get<GeolocationResponse>(AppRoute.GEOLOCATION);
  const { data } = serverPayload;

  return data.location ?? {};
};

export const getLocations = async (): Promise<LocationsData[]> => {
  const serverPayload = await apiClient.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data.locations ?? [];
};
