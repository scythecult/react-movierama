import { AppRoute } from '../../../../common/constants/routes';
import type { UserResponse } from '../../../../common/types/user';
import { fetcher } from '../client';

// For specific parameters use "queryKey"
export const fetchUser = async (): Promise<UserResponse> => {
  const serverPayload = await fetcher.get<UserResponse>(AppRoute.USER);
  const { data } = serverPayload;

  return data;
};
