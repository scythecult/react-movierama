import { useQuery } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchUser } from './requests';

export const useUserQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.user(),
    queryFn: fetchUser,
    staleTime: Infinity,
  });
};
