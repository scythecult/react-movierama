import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import type { UserResponse } from '../../../../common/entities/auth';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const getMe = async () => {
  const serverPayload = await apiClient.get<UserResponse>(`${AppRoute.AUTH}${ApiRoute.ME}`);
  const { data } = serverPayload;

  return data.user ?? {};
};
