import { http, HttpResponse } from 'msw';
import { AppRoute } from '../src/common/constants/routes';
import { SSR_URL } from '../src/common/constants/url';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from './data/seats';

export const handlers = [
  http.get(AppRoute.ROOT, () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${SSR_URL}${AppRoute.HALLPLAN}`, () => {
    return HttpResponse.json({
      data: {
        seats: MOCK_SEATS_DATA,
        canvas: MOCK_CANVAS_SIZE,
        seatTypes: MOCK_SEAT_TYPES,
      },
    });
  }),
];
