import { useQuery } from '@tanstack/react-query';
import { MainPageQueryKey } from '../queryKeys';
import { fetchFilms } from './requests';

export const useFilmsQuery = () => {
  return useQuery({
    queryKey: MainPageQueryKey.films(),
    queryFn: fetchFilms,
    staleTime: Infinity,
  });
};
