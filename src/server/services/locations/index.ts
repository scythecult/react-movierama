import { mockLocationDb } from '../../db/mocks';
import { LocationService } from './LocationService';

export const locationService = new LocationService(mockLocationDb);
