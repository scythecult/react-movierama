import { AppRoute } from '../../../../common/constants/routes';
import type { UserData } from '../../../../common/types/user';
import { fetcher } from '../client';

// For specific parameters use "queryKey"
export const fetchUser = async (): Promise<UserData> => {
  const serverPayload = await fetcher.get<UserData>(AppRoute.USER);
  const { data } = serverPayload;

  return data;
};
