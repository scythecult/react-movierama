import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { FilmData, FilmsResponse } from '../model/types';

export const fetchFilms = async (): Promise<FilmData[]> => {
  const serverPayload = await fetcher.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data.films ?? [];
};
