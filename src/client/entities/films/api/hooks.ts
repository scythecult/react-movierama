import { useQuery } from '@tanstack/react-query';
import { fetchFilms } from './loaders';
import { FilmsQueryKey } from './queryKeys';

export const useFilmsQuery = () => {
  return useQuery({
    queryKey: FilmsQueryKey.films(),
    queryFn: fetchFilms,
    staleTime: Infinity,
  });
};
