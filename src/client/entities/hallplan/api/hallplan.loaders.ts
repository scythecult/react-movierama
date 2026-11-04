import { AppRoute } from '../../../../common/constants/routes';
import type { HallplanResponse } from '../../../../common/entities/hallplan';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const getHallplan = async (locationId?: number) => {
  const serverPayload = await apiClient.get<HallplanResponse>(
    AppRoute.HALLPLAN,
    locationId === undefined ? undefined : { locationId },
  );
  const { data } = serverPayload;

  return data;
};
