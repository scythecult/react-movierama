import { useQuery } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchLocations } from './requests';

export const useLocationsQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.locations(),
    queryFn: fetchLocations,
    staleTime: Infinity,
  });
};
