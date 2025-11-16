import { AppRoute } from '../../../../common/constants/routes';
import type { NewsData } from '../../../../common/types/news';
import { fetcher } from '../client';

// For specific parameters use "queryKey"
export const fetchNews = async (): Promise<NewsData> => {
  const serverPayload = await fetcher.get<NewsData>(AppRoute.NEWS);
  const { data } = serverPayload;

  return data;
};
