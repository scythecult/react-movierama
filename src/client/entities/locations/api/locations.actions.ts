import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { GeolocationData, GeolocationResponse } from '../model/locations.types';

export const postGeolocation = async (id: number): Promise<GeolocationData> => {
  const serverPayload = await apiClient.post<GeolocationResponse>(AppRoute.GEOLOCATION, { id });
  const { data } = serverPayload;

  return data.location ?? {};
};
