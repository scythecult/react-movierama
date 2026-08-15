import { useMutation } from '@tanstack/react-query';
import { postGeolocation } from '../../../entities/locations/api/locations.actions';
import { useInvalidateLocations } from '../../../entities/locations/api/locations.hooks';

export const useChangeLocation = () => {
  const invalidateLocations = useInvalidateLocations();

  const locationMutation = useMutation({
    mutationFn: postGeolocation,
    onSuccess: () => invalidateLocations(),
  });

  return (locationId: number) => locationMutation.mutate(locationId);
};
