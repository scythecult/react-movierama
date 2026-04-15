import { useQuery } from '@tanstack/react-query';
import { fetchNews } from './loaders';
import { NewsQueryKey } from './queryKeys';

export const useNewsQuery = () => {
  return useQuery({
    queryKey: NewsQueryKey.news(),
    queryFn: fetchNews,
    staleTime: Infinity,
  });
};
