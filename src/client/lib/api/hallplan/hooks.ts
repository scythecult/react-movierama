import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { fetchHallplan } from './requests';

export const useHallplanQuery = () => {
  return useQuery({
    queryKey: QueryKey.hallplan.all,
    queryFn: fetchHallplan,
    staleTime: Infinity,
  });
};
