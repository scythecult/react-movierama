import { useQueryClient } from '@tanstack/react-query';
import { locationsQueries } from './locations.queries';

export const useInvalidateCurrentLocation = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: locationsQueries.current() });
};
