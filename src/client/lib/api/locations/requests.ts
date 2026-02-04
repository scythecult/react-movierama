import { AppRoute } from '../../../../common/constants/routes';
import type { LocationsData, LocationsResponse } from '../../../../common/types/locations';
import { fetcher } from '../client';

export const fetchLocations = async (): Promise<LocationsData[]> => {
  const serverPayload = await fetcher.get<LocationsResponse>(AppRoute.LOCATIONS);
  const { data } = serverPayload;

  return data.locations ?? [];
};
