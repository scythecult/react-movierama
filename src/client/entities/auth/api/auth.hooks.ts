import { useQueryClient } from '@tanstack/react-query';
import { authQueries } from './auth.queries';

export const useInvalidateAuth = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: authQueries.one() });
};
