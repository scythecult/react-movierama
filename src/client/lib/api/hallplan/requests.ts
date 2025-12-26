import { AppRoute } from '../../../../common/constants/routes';
import type { HallplanResponse } from '../../../../common/types/hallplan';
import { fetcher } from '../client';

export const fetchHallplan = async (): Promise<HallplanResponse> => {
  const serverPayload = await fetcher.get<HallplanResponse>(AppRoute.HALLPLAN);
  const { data } = serverPayload;

  return data;
};
