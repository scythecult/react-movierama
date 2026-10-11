import { Router } from 'express';
import { AppRoute } from '../../../common/constants/routes';
import { auth } from './auth';
import { films } from './films';
import { geolocation } from './geolocation';
import { hallplan } from './hallplan';
import { locations } from './locations';
import { news } from './news';

const v1 = Router();

v1.use(AppRoute.AUTH, auth);
v1.use(AppRoute.FILMS, films);
v1.use(AppRoute.NEWS, news);
v1.use(AppRoute.LOCATIONS, locations);
v1.use(AppRoute.GEOLOCATION, geolocation);
v1.use(AppRoute.HALLPLAN, hallplan);

export { v1 };
