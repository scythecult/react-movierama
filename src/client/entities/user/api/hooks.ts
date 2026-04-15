import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './loaders';
import { UserQueryKey } from './queryKeys';

export const useUserQuery = () => {
  return useQuery({
    queryKey: UserQueryKey.user(),
    queryFn: fetchUser,
    staleTime: Infinity,
  });
};
