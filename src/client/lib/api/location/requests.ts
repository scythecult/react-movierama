import { AppRoute } from '../../../../common/constants/routes';
import type { LocationData } from '../../../../common/types/location';
import { fetcher } from '../client';

export const fetchLocation = async (): Promise<LocationData> => {
  const serverPayload = await fetcher.get<LocationData>(AppRoute.LOCATION);
  const { data } = serverPayload;

  return data;
};
