import { AppRoute } from '../../../../common/constants/routes';
import type { LocationResponse } from '../../../../common/types/location';
import { fetcher } from '../client';

export const fetchLocation = async (): Promise<LocationResponse> => {
  const serverPayload = await fetcher.get<LocationResponse>(AppRoute.LOCATION);
  const { data } = serverPayload;

  return data;
};

export const postLocation = async (id: number): Promise<LocationResponse> => {
  const serverPayload = await fetcher.post<LocationResponse>(AppRoute.LOCATION, { id });
  const { data } = serverPayload;

  return data;
};
