import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { UserData, UserResponse } from '../model/types';

// For specific parameters use "queryKey"
export const fetchUser = async (): Promise<UserData> => {
  const serverPayload = await fetcher.get<UserResponse>(AppRoute.USER);
  const { data } = serverPayload;

  return data.user ?? {};
};
