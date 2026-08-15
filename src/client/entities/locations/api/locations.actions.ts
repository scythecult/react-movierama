import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client/api-client';
import type { GeolocationResponse } from '../model/locations.types';

export const postGeolocation = async (id: number) => {
  const serverPayload = await apiClient.post<GeolocationResponse>(AppRoute.GEOLOCATION, { id });
  const { data } = serverPayload;

  return data.location ?? {};
};
