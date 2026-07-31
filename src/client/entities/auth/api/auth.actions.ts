import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { UserResponse, UserSignInRequest, UserSignOutRequest, UserSignUpRequest } from '../model/user.types';

export const signUp = async (clientPayload: UserSignUpRequest) => {
  const serverPayload = await apiClient.post<UserResponse>(`${AppRoute.AUTH}${ApiRoute.SIGN_UP}`, clientPayload);
  const { data } = serverPayload;

  return data.user ?? {};
};

export const signIn = async (clientPayload: UserSignInRequest) => {
  const serverPayload = await apiClient.post<UserResponse>(`${AppRoute.AUTH}${ApiRoute.SIGN_IN}`, clientPayload);
  const { data } = serverPayload;

  return data.user ?? {};
};

export const signOut = async (clientPayload: UserSignOutRequest) => {
  await apiClient.post(`${AppRoute.AUTH}${ApiRoute.SIGN_OUT}`, clientPayload);
};
