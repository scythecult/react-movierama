import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppStore } from '../../contexts/app-store/useAppStore';
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
  // const queryClient = useQueryClient();
  const setLocation = useAppStore((state) => state.setLocation);

  return useMutation({
    mutationFn: postGeolocation,
    onSuccess: async (data) => {
      // Invalidate only necessary queries
      // await queryClient.invalidateQueries({ queryKey: MainPageQueryKey.geolocation() });

      setLocation(data);
    },
  });
};
