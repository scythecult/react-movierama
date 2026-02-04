import { AppRoute } from '../../../../common/constants/routes';
import type { GeolocationData, GeolocationResponse } from '../../../../common/types/geolocation';
import { fetcher } from '../client';

export const fetchGeolocation = async (): Promise<GeolocationData> => {
  const serverPayload = await fetcher.get<GeolocationResponse>(AppRoute.GEOLOCATION);
  const { data } = serverPayload;

  return data.location ?? {};
};

export const postGeolocation = async (id: number): Promise<GeolocationData> => {
  const serverPayload = await fetcher.post<GeolocationResponse>(AppRoute.GEOLOCATION, { id });
  const { data } = serverPayload;

  return data.location ?? {};
};
