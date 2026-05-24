import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postGeolocation } from './locations.actions';
import { locationsQueries } from './locations.queries';

// TODO Possibly move to usage place
export const useGeolocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGeolocation,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await queryClient.invalidateQueries({ queryKey: locationsQueries.one() });
      // await queryClient.invalidateQueries({ queryKey: filmsQueries.films() });
    },
  });
};
