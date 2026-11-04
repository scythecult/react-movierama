import { Router } from 'express';
import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import { setCurrentLocationSchema } from '../../../../common/entities/locations';
import { ipGeocoder } from '../../../lib/infra/geolocation';
import { DetectCurrentLocationUseCase } from '../../../lib/use-cases/locations/DetectCurrentLocationUseCase';
import { GetCurrentLocationUseCase } from '../../../lib/use-cases/locations/GetCurrentLocationUseCase';
import { SetCurrentLocationUseCase } from '../../../lib/use-cases/locations/SetCurrentLocationUseCase';
import { validationMiddlewareBuilder } from '../../../middleware/validation-middleware-builder/validationMiddlewareBuilder';
import { currentLocationService } from '../../../services/current-location';
import { locationService } from '../../../services/locations';
import { CurrentLocationController } from './CurrentLocationController';

const location = Router();

const currentLocationController = new CurrentLocationController({
  getCurrentLocation: new GetCurrentLocationUseCase(currentLocationService),
  setCurrentLocation: new SetCurrentLocationUseCase(locationService, currentLocationService),
  detectCurrentLocation: new DetectCurrentLocationUseCase(locationService, currentLocationService, ipGeocoder),
});

location.get(AppRoute.ROOT, currentLocationController.get);
location.put(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ body: setCurrentLocationSchema }),
  currentLocationController.set,
);
location.get(ApiRoute.DETECT, currentLocationController.detect);

export { location };
