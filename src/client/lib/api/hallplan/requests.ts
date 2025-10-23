import { AppRoute } from '../../../../common/constants/routes';
import type { HallplanData } from '../../../../common/types/hallplan';
import { fetcher } from '../client';

export const fetchHallplan = async (): Promise<HallplanData> => {
  const serverPayload = await fetcher.get<HallplanData>(AppRoute.HALLPLAN);
  const { data } = serverPayload;

  return data;
};
