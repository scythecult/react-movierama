import { useQueryClient } from '@tanstack/react-query';
import { locationsQueries } from './locations.queries';

export const useInvalidateLocations = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: locationsQueries.one() });
};
