import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchGeolocation, postGeolocation } from './requests';

export const useGeolocationQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.geolocation(),
    queryFn: fetchGeolocation,
    staleTime: Infinity,
  });
};

export const useGeolocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGeolocation,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await queryClient.invalidateQueries({ queryKey: MainPageQueryKey.geolocation() });
    },
  });
};
