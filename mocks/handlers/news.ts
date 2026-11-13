import { http } from 'msw';
import { AppRoute } from '../../src/common/constants/routes';
import { MOCK_NEWS } from '../data/news';
import { apiUrl, jsonData } from '../helpers/http';

export const newsHandlers = [
  http.get(apiUrl(AppRoute.NEWS), () => {
    return jsonData({
      news: MOCK_NEWS,
    });
  }),
];
