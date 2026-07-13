import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { UserData, UserSignInRequest } from '../model/user.types';

export const signUp = async (data: UserData): Promise<UserData> => {
  const serverPayload = await apiClient.post<UserData>(AppRoute.USER, data);
  const { data: userData } = serverPayload;

  return userData;
};

export const signIn = async (data: UserSignInRequest): Promise<UserData> => {
  const serverPayload = await apiClient.post<UserData>(`${AppRoute.AUTH}${ApiRoute.SIGN_IN}`, data);
  const { data: userData } = serverPayload;

  return userData;
};
