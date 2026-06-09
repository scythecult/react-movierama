import { useQueryClient } from '@tanstack/react-query';
import { userQueries } from './user.queries';

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: userQueries.one() });
};
