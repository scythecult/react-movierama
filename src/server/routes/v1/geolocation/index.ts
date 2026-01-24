import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { ipApiGeolocation } from '../../../lib/infra/geolocation';
import { GetLocationUseCase } from '../../../lib/use-cases/geolocation/GetLocationUseCase';
import { geolocationService } from '../../../services/geolocation';
import { locationService } from '../../../services/locations';
import { GeolocationController } from './GeolocationController';

const geolocation = Router();

const getLocationUseCase = new GetLocationUseCase(geolocationService, locationService, ipApiGeolocation);
const geolocationController = new GeolocationController(geolocationService, locationService, { getLocationUseCase });

geolocation.get(AppRoute.ROOT, geolocationController.getGeolocation);
geolocation.post(AppRoute.ROOT, geolocationController.postGeolocation);

export { geolocation };
