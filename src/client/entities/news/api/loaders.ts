import { AppRoute } from '../../../../common/constants/routes';
import { fetcher } from '../../../shared/api/fetcher';
import type { NewsData, NewsResponse } from '../model/types';

export const fetchNews = async (): Promise<NewsData[]> => {
  const serverPayload = await fetcher.get<NewsResponse>(AppRoute.NEWS);
  const { data } = serverPayload;

  return data.news ?? [];
};
