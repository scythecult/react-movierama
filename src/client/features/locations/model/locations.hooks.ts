import { useMutation } from '@tanstack/react-query';
import { postGeolocation } from '../../../entities/locations/api/locations.actions';
import { useInvalidateLocations } from '../../../entities/locations/api/locations.hooks';

export const useChangeLocation = () => {
  const invalidateLocations = useInvalidateLocations();

  const locationMutation = useMutation({
    mutationFn: postGeolocation,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await invalidateLocations();
    },
  });

  return (locationId: number) => locationMutation.mutate(locationId);
};
