import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchLocation, postLocation } from './requests';

export const useLocationQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.location(),
    queryFn: fetchLocation,
    staleTime: Infinity,
  });
};

export const useLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLocation,
    onSuccess: async () => {
      // Invalidate only necessary queries
      await queryClient.invalidateQueries({ queryKey: MainPageQueryKey.location() });
    },
  });
};
