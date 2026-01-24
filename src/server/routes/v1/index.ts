import { Router } from 'express';
import { AppRoute } from '../../../common/constants/routes';
import { films } from './films';
import { geolocation } from './geolocation';
import { hallplan } from './hallplan';
import { locations } from './locations';
import { news } from './news';
import { users } from './user';

const v1 = Router();

v1.use(AppRoute.FILMS, films);
v1.use(AppRoute.NEWS, news);
// TODO Temporary
// get user by id and use route below
// v1.use(AppRoute.USERS, users);
v1.use(AppRoute.USER, users);
v1.use(AppRoute.LOCATIONS, locations);
v1.use(AppRoute.GEOLOCATION, geolocation);
v1.use(AppRoute.HALLPLAN, hallplan);

export { v1 };
