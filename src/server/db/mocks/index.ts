import { MOCK_FILMS } from '../../../../mocks/data/films';
import { MOCK_LOCATIONS } from '../../../../mocks/data/locations';
import { MOCK_NEWS } from '../../../../mocks/data/news';
import { MOCK_HALL_PLAN_MATRIX, MOCK_SEAT_TYPES } from '../../../../mocks/data/seats';
import { MOCK_USER, MOCK_USER_2 } from '../../../../mocks/data/user';
import { MockCurrentLocationDb } from './CurrentLocation';
import { MockFilmDb } from './Film';
import { MockHallplanMatrixDb } from './HallplanMatrix';
import { MockLocationDb } from './Location';
import { MockNewsDb } from './News';
import { MockSeatTypeDb } from './SeatType';
import { MockUserDb } from './User';

export const mockFilmDb = new MockFilmDb(MOCK_FILMS);
export const mockNewsDb = new MockNewsDb(MOCK_NEWS);
export const mockUserDb = new MockUserDb([MOCK_USER, MOCK_USER_2]);
export const mockLocationDb = new MockLocationDb(MOCK_LOCATIONS);
export const mockCurrentLocationDb = new MockCurrentLocationDb(null);
export const mockHallplanMatrixDb = new MockHallplanMatrixDb(
  MOCK_LOCATIONS.map((location) => ({
    id: location.id,
    matrix: MOCK_HALL_PLAN_MATRIX,
  })),
);
export const mockSeatTypeDb = new MockSeatTypeDb(MOCK_SEAT_TYPES);
