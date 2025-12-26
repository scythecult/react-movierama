import { AppRoute } from '../../../../common/constants/routes';
import type { LocationsResponse } from '../../../../common/types/locations';
import { fetcher } from '../client';

export const fetchLocations = async (): Promise<LocationsResponse> => {
  const serverPayload = await fetcher.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data;
};
