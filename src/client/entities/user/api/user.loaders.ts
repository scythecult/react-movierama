import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { UserData, UserResponse } from '../model/user.types';

// For specific parameters use "queryKey"
export const getUser = async (): Promise<UserData> => {
  const serverPayload = await apiClient.get<UserResponse>(AppRoute.USER);
  const { data } = serverPayload;

  return data.user ?? {};
};
