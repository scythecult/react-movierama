import { AppRoute } from '../../../../common/constants/routes';
import type { FilmsResponse } from '../../../../common/entities/films';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const getFilms = async () => {
  const serverPayload = await apiClient.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data.films ?? [];
};
