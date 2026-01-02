import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { locationService } from '../../../services/locations';
import { LocationsController } from './LocationsController';

const locations = Router();

const locationsController = new LocationsController(locationService);

locations.get(AppRoute.ROOT, locationsController.listLocations);

export { locations };
