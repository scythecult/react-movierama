import { useQuery } from '@tanstack/react-query';
import { OrderPageQueryKey } from '../queryKeys';
import { fetchHallplan } from './requests';

export const useHallplanQuery = () => {
  return useQuery({
    queryKey: OrderPageQueryKey.all,
    queryFn: fetchHallplan,
    staleTime: Infinity,
  });
};
