import { authHandlers } from './auth';
import { filmsHandlers } from './films';
import { hallplanHandlers } from './hallplan';
import { healthHandlers } from './health';
import { locationHandlers } from './location';
import { locationsHandlers } from './locations';
import { newsHandlers } from './news';

export const handlers = [
  ...healthHandlers,
  ...authHandlers,
  ...filmsHandlers,
  ...newsHandlers,
  ...locationsHandlers,
  ...locationHandlers,
  ...hallplanHandlers,
];
