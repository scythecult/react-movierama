import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client/api-client';
import type { HallplanResponse } from '../model/hallplan.types';

export const getHallplan = async () => {
  const serverPayload = await apiClient.get<HallplanResponse>(AppRoute.HALLPLAN);
  const { data } = serverPayload;

  return data;
};
