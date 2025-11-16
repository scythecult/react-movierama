import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { fetchNews } from './requests';

export const useNewsQuery = () => {
  return useQuery({
    queryKey: QueryKey.news.all,
    queryFn: fetchNews,
    staleTime: Infinity,
  });
};
