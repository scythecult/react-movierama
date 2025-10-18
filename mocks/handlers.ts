import { http, HttpResponse } from 'msw';
import { AppRoute } from '../src/common/routes';
import { SSR_URL } from '../src/common/url';

export const handlers = [
  http.get(`${SSR_URL}${AppRoute.HEALTH}`, () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get('/api/user', () => {
    return new HttpResponse('Hello world', { status: 201 });
  }),
];
