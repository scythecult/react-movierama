import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { UserData, UserResponse } from '../model/user.types';

export const getMe = async (): Promise<UserData> => {
  const serverPayload = await apiClient.get<UserResponse>(`${AppRoute.AUTH}${ApiRoute.ME}`);
  const { data } = serverPayload;

  return data.user ?? {};
};
