import { http } from 'msw';
import { AppRoute } from '../../src/common/constants/routes';
import { MOCK_FILMS } from '../data/films';
import { apiUrl, jsonData } from '../helpers/http';

export const filmsHandlers = [
  http.get(apiUrl(AppRoute.FILMS), () => {
    return jsonData({
      films: MOCK_FILMS,
    });
  }),
];
