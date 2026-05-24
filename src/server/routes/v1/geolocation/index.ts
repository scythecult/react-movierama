import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { geolocationApi } from '../../../lib/infra/geolocation';
import { GeolocationUseCase } from '../../../lib/use-cases/geolocation/GeolocationUseCase';
import { geolocationService } from '../../../services/geolocation';
import { locationService } from '../../../services/locations';
import { GeolocationController } from './GeolocationController';

const geolocation = Router();

const geolocationUseCase = new GeolocationUseCase(geolocationService, locationService, geolocationApi);
const geolocationController = new GeolocationController(geolocationService, locationService, { geolocationUseCase });

geolocation.get(AppRoute.ROOT, geolocationController.getGeolocation);
geolocation.post(AppRoute.ROOT, geolocationController.postGeolocation);

export { geolocation };
