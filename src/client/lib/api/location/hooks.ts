import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { fetchLocation } from './requests';

export const useLocationQuery = () => {
  return useQuery({
    queryKey: QueryKey.location.all,
    queryFn: fetchLocation,
    staleTime: Infinity,
  });
};
