import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client/api-client';
import type { FilmsResponse } from '../model/films.types';

export const getFilms = async () => {
  const serverPayload = await apiClient.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data.films ?? [];
};
