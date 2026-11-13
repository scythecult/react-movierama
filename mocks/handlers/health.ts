import { http, HttpResponse } from 'msw';
import { AppRoute } from '../../src/common/constants/routes';

export const healthHandlers = [
  http.get(`*${AppRoute.HEALTH}`, () => {
    return HttpResponse.json({ ok: true });
  }),
];
