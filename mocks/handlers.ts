import { http, HttpResponse } from 'msw';
import { AppRoute } from '../src/common/constants/routes';
import { Config } from '../src/common/env';
import { MOCK_FILMS } from './data/films';
import { MOCK_LOCATION } from './data/location';
import { MOCK_LOCATIONS } from './data/locations';
import { MOCK_NEWS } from './data/news';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from './data/seats';
import { MOCK_USER } from './data/user';

export const handlers = [
  http.get(AppRoute.ROOT, () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.HALLPLAN}`, () => {
    return HttpResponse.json({
      data: {
        seats: MOCK_SEATS_DATA,
        canvas: MOCK_CANVAS_SIZE,
        seatTypes: MOCK_SEAT_TYPES,
      },
    });
  }),

  // TODO Extend request to /films?limit=100&listing=today
  // TODO Extend request to /films?limit=100&listing=soon
  // TODO Extend request to /films?limit=100&listing=art
  // TODO Extend request to /films?limit=100&listing=kids
  // Sync with app route
  http.get(`${Config.ssrUrl}${AppRoute.FILMS}`, () => {
    return HttpResponse.json({
      data: {
        films: MOCK_FILMS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.FILMS}/:id/sessions`, () => {
    return HttpResponse.json({
      data: {
        sessions: 'sessions',
      },
    });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.NEWS}`, () => {
    return HttpResponse.json({
      data: {
        news: MOCK_NEWS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.USER}`, () => {
    return HttpResponse.json({
      data: {
        user: MOCK_USER,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.LOCATIONS}`, () => {
    return HttpResponse.json({
      data: {
        locations: MOCK_LOCATIONS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${AppRoute.LOCATION}`, () => {
    return HttpResponse.json({
      data: {
        location: MOCK_LOCATION,
      },
    });
  }),

  http.post(`${Config.ssrUrl}${AppRoute.LOCATION}`, async ({ request }) => {
    const result = await request.json();

    console.info({ result });
    // TODO Mutate MOCK_LOCATION by setting incoming data

    return HttpResponse.json({
      data: {
        location: 'check',
      },
    });
  }),
];
