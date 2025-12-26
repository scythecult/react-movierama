import { useQuery } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchNews } from './requests';

export const useNewsQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.news(),
    queryFn: fetchNews,
    staleTime: Infinity,
  });
};
