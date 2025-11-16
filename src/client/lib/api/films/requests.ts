import { AppRoute } from '../../../../common/constants/routes';
import type { FilmsData } from '../../../../common/types/film';
import { fetcher } from '../client';

export const fetchFilms = async (): Promise<FilmsData> => {
  const serverPayload = await fetcher.get<FilmsData>(AppRoute.FILMS);
  const { data } = serverPayload;

  return data;
};
