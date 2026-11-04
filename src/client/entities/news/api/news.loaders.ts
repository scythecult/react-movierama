import { AppRoute } from '../../../../common/constants/routes';
import type { NewsResponse } from '../../../../common/entities/news';
import { apiClient } from '../../../shared/api/api-client/api-client';

export const getNews = async () => {
  const serverPayload = await apiClient.get<NewsResponse>(AppRoute.NEWS);
  const { data } = serverPayload;

  return data.news ?? [];
};
