import { AppRoute } from '../../../../common/constants/routes';
import type { FilmsResponse } from '../../../../common/types/film';
import { fetcher } from '../client';

export const fetchFilms = async (): Promise<FilmsResponse> => {
  const serverPayload = await fetcher.get<FilmsResponse>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data;
};
