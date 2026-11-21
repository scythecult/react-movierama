import { MOCK_FILMS } from '../../../../mocks/data/films';
import { MOCK_LOCATIONS } from '../../../../mocks/data/locations';
import { MOCK_NEWS } from '../../../../mocks/data/news';
import { MOCK_HALL_PLAN_MATRIX, MOCK_SEAT_TYPES } from '../../../../mocks/data/seats';
import { MOCK_USER, MOCK_USER_2 } from '../../../../mocks/data/user';
import { withDbLogging } from '../withDbLogging';
import { MockCurrentLocationDb } from './CurrentLocation';
import { MockFilmDb } from './Film';
import { MockHallplanMatrixDb } from './HallplanMatrix';
import { MockLocationDb } from './Location';
import { MockNewsDb } from './News';
import { MockSeatTypeDb } from './SeatType';
import { MockUserDb } from './User';

export const mockFilmDb = withDbLogging('film', new MockFilmDb(MOCK_FILMS));
export const mockNewsDb = withDbLogging('news', new MockNewsDb(MOCK_NEWS));
export const mockUserDb = withDbLogging('user', new MockUserDb([MOCK_USER, MOCK_USER_2]));
export const mockLocationDb = withDbLogging('location', new MockLocationDb(MOCK_LOCATIONS));
export const mockCurrentLocationDb = withDbLogging('current-location', new MockCurrentLocationDb(null));
export const mockHallplanMatrixDb = withDbLogging(
  'hallplan-matrix',
  new MockHallplanMatrixDb(
    MOCK_LOCATIONS.map((location) => ({
      id: location.id,
      matrix: MOCK_HALL_PLAN_MATRIX,
    })),
  ),
);
export const mockSeatTypeDb = withDbLogging('seat-type', new MockSeatTypeDb(MOCK_SEAT_TYPES));
