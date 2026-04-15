import { useQuery } from '@tanstack/react-query';
import { fetchHallplan } from './loaders';
import { HallplanQueryKey } from './queryKeys';

export const useHallplanQuery = () => {
  return useQuery({
    queryKey: HallplanQueryKey.all,
    queryFn: fetchHallplan,
    staleTime: Infinity,
  });
};
