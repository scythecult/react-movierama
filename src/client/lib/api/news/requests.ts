import { AppRoute } from '../../../../common/constants/routes';
import type { NewsItem, NewsResponse } from '../../../../common/types/news';
import { fetcher } from '../client';

// For specific parameters use "queryKey"
export const fetchNews = async (): Promise<NewsItem[]> => {
  const serverPayload = await fetcher.get<NewsResponse>(AppRoute.NEWS);
  const { data } = serverPayload;

  return data.news ?? [];
};
