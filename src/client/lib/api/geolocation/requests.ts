import { AppRoute } from '../../../../common/constants/routes';
import type { GeolocationResponse } from '../../../../common/types/geolocation';
import { fetcher } from '../client';

export const fetchGeolocation = async (): Promise<GeolocationResponse> => {
  const serverPayload = await fetcher.get<GeolocationResponse>(AppRoute.GEOLOCATION);
  const { data } = serverPayload;

  return data;
};

export const postGeolocation = async (id: number): Promise<GeolocationResponse> => {
  const serverPayload = await fetcher.post<GeolocationResponse>(AppRoute.GEOLOCATION, { id });
  const { data } = serverPayload;

  return data;
};
