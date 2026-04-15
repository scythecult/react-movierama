import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../../shared/zustand/useAppStore';
import { postGeolocation } from './actions';
import { fetchGeolocation, fetchLocations } from './loaders';
import { LocationsQueryKey } from './queryKeys';

export const useGeolocationQuery = () => {
  return useQuery({
    queryKey: LocationsQueryKey.geolocation(),
    queryFn: fetchGeolocation,
    staleTime: Infinity,
  });
};

export const useGeolocationMutation = () => {
  // const queryClient = useQueryClient();
  const setLocation = useAppStore((state) => state.setLocation);

  return useMutation({
    mutationFn: postGeolocation,
    onSuccess: async (data) => {
      // Invalidate only necessary queries
      // await queryClient.invalidateQueries({ queryKey: LocationsQueryKey.geolocation() });

      setLocation(data);
    },
  });
};

export const useLocationsQuery = () => {
  return useQuery({
    queryKey: LocationsQueryKey.locations(),
    queryFn: fetchLocations,
    staleTime: Infinity,
  });
};
