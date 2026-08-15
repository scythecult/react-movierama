import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import type {
  UserResponse,
  UserSignInRequest,
  UserSignOutRequest,
  UserSignUpRequest,
} from '../../../../common/entities/auth';
import { apiClient } from '../../../shared/api/api-client/api-client';
import { ServerValidationError } from '../../../shared/api/error/error';

export const signUp = async (clientPayload: UserSignUpRequest) => {
  const serverPayload = await apiClient.post<UserResponse>(`${AppRoute.AUTH}${ApiRoute.SIGN_UP}`, clientPayload);
  const { data, errorMap } = serverPayload;

  if (errorMap) {
    throw new ServerValidationError(errorMap);
  }

  return data.user ?? {};
};

export const signIn = async (clientPayload: UserSignInRequest) => {
  const serverPayload = await apiClient.post<UserResponse>(`${AppRoute.AUTH}${ApiRoute.SIGN_IN}`, clientPayload);
  const { data, errorMap } = serverPayload;

  if (errorMap) {
    throw new ServerValidationError(errorMap);
  }

  return data.user ?? {};
};

export const signOut = async (clientPayload: UserSignOutRequest) => {
  await apiClient.post(`${AppRoute.AUTH}${ApiRoute.SIGN_OUT}`, clientPayload);
};
