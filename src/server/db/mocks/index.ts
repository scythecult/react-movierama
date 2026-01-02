import { MOCK_FILMS } from '../../../../mocks/data/films';
import { MOCK_GEOLOCATION } from '../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../mocks/data/locations';
import { MOCK_NEWS } from '../../../../mocks/data/news';
import { MOCK_USER } from '../../../../mocks/data/user';
import { MockFilmDb } from './Film';
import { MockGeolocationDb } from './Geolocation';
import { MockLocationDb } from './Location';
import { MockNewsDb } from './News';
import { MockUserDb } from './User';

export const mockFilmDb = new MockFilmDb(MOCK_FILMS);
export const mockNewsDb = new MockNewsDb(MOCK_NEWS);
export const mockUserDb = new MockUserDb([MOCK_USER]);
export const mockLocationDb = new MockLocationDb(MOCK_LOCATIONS);
export const mockGeolocationDb = new MockGeolocationDb(MOCK_GEOLOCATION);
