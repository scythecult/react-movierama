import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, type PathParams } from 'msw';
import { ApiRoute, ApiVersion, AppRoute } from '../src/common/constants/routes';
import type { LocationData } from '../src/common/entities/locations';
import { Config } from '../src/common/env';
import { MOCK_FILMS } from './data/films';
import { MOCK_LOCATIONS } from './data/locations';
import { MOCK_NEWS } from './data/news';
import { MOCK_CANVAS_SIZE, MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from './data/seats';
import { MOCK_USER } from './data/user';

let currentLocation: LocationData | null = null;

export const handlers = [
  http.get(AppRoute.ROOT, () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.HALLPLAN}`, () => {
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
  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.FILMS}`, () => {
    return HttpResponse.json({
      data: {
        films: MOCK_FILMS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.FILMS}/:id/sessions`, () => {
    return HttpResponse.json({
      data: {
        sessions: 'sessions',
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.NEWS}`, () => {
    return HttpResponse.json({
      data: {
        news: MOCK_NEWS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.AUTH}${ApiRoute.ME}`, () => {
    return HttpResponse.json({
      data: {
        user: MOCK_USER,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.LOCATIONS}`, () => {
    return HttpResponse.json({
      data: {
        locations: MOCK_LOCATIONS,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.LOCATIONS}/:id`, ({ params }) => {
    const location = MOCK_LOCATIONS.find((item) => item.id === Number(params.id));

    if (!location) {
      return HttpResponse.json(
        {
          error: {
            message: 'Location not found',
            errors: { locationId: ['Location not found'] },
            code: 'ERR_NF',
          },
        },
        { status: StatusCodes.NOT_FOUND },
      );
    }

    return HttpResponse.json({
      data: {
        location,
      },
    });
  }),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.LOCATION}`, () => {
    return HttpResponse.json({
      data: {
        location: currentLocation,
      },
    });
  }),

  http.put<PathParams<never>, { locationId: number }>(
    `${Config.ssrUrl}${ApiVersion.V1}${AppRoute.LOCATION}`,
    async ({ request }) => {
      const result = await request.json();
      const location = MOCK_LOCATIONS.find((item) => item.id === result.locationId);

      if (!location) {
        return HttpResponse.json(
          {
            error: {
              message: 'Location not found',
              errors: { locationId: ['Location not found'] },
              code: 'ERR_NF',
            },
          },
          { status: StatusCodes.NOT_FOUND },
        );
      }

      currentLocation = location;

      return HttpResponse.json({
        data: {
          location,
        },
      });
    },
  ),

  http.get(`${Config.ssrUrl}${ApiVersion.V1}${AppRoute.LOCATION}${ApiRoute.DETECT}`, () => {
    currentLocation = MOCK_LOCATIONS.find((item) => item.id === 23) ?? null;

    return HttpResponse.json({
      data: {
        location: currentLocation,
      },
    });
  }),
];
