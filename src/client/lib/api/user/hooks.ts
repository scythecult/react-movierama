import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { fetchUser } from './requests';

export const useUserQuery = () => {
  return useQuery({
    queryKey: QueryKey.user.all,
    queryFn: fetchUser,
    staleTime: Infinity,
  });
};
