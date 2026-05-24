import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { FilmData, FilmsResponse } from '../model/films.types';

export const getFilms = async (): Promise<FilmData[]> => {
  const serverPayload = await apiClient.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data.films ?? [];
};
