import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { locationParamsSchema } from '../../../../common/entities/locations';
import { GetLocationUseCase } from '../../../lib/use-cases/locations/GetLocationUseCase';
import { ListLocationsUseCase } from '../../../lib/use-cases/locations/ListLocationsUseCase';
import { validationMiddlewareBuilder } from '../../../middleware/validation-middleware-builder/validationMiddlewareBuilder';
import { locationService } from '../../../services/locations';
import { LocationsController } from './LocationsController';

const locations = Router();

const locationsController = new LocationsController({
  listLocations: new ListLocationsUseCase(locationService),
  getLocation: new GetLocationUseCase(locationService),
});

locations.get(AppRoute.ROOT, locationsController.list);
// TODO Check for usage
locations.get('/:id', validationMiddlewareBuilder({ params: locationParamsSchema }), locationsController.get);

export { locations };
