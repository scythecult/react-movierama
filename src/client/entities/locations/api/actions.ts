import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { GeolocationData, GeolocationResponse } from '../model/types';

export const postGeolocation = async (id: number): Promise<GeolocationData> => {
  const serverPayload = await fetcher.post<GeolocationResponse>(AppRoute.GEOLOCATION, { id });
  const { data } = serverPayload;

  return data.location ?? {};
};
