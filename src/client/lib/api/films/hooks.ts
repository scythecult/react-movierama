import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../queryKeys';
import { fetchFilms } from './requests';

export const useFilmsQuery = () => {
  return useQuery({
    queryKey: QueryKey.films.all,
    queryFn: fetchFilms,
    staleTime: Infinity,
  });
};
