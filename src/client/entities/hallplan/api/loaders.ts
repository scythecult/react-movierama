import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { HallplanResponse } from '../model/types';

export const fetchHallplan = async (): Promise<HallplanResponse> => {
  const serverPayload = await fetcher.get<HallplanResponse>(AppRoute.HALLPLAN);
  const { data } = serverPayload;

  return data;
};
