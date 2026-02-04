import { AppRoute } from '../../../../common/constants/routes';
import type { Film, FilmsResponse } from '../../../../common/types/film';
import { fetcher } from '../client';

export const fetchFilms = async (): Promise<Film[]> => {
  const serverPayload = await fetcher.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data.films ?? [];
};
