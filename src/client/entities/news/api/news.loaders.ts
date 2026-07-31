import { AppRoute } from '../../../../common/constants/routes';
import { apiClient } from '../../../shared/api/api-client';
import type { NewsResponse } from '../model/news.types';

export const getNews = async () => {
  const serverPayload = await apiClient.get<NewsResponse>(AppRoute.NEWS);
  const { data } = serverPayload;

  return data.news ?? [];
};
