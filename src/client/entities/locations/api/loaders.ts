import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { GeolocationData, GeolocationResponse, LocationsData, LocationsResponse } from '../model/types';

export const fetchGeolocation = async (): Promise<GeolocationData> => {
  const serverPayload = await fetcher.get<GeolocationResponse>(AppRoute.GEOLOCATION);
  const { data } = serverPayload;

  return data.location ?? {};
};

export const fetchLocations = async (): Promise<LocationsData[]> => {
  const serverPayload = await fetcher.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data.locations ?? [];
};
