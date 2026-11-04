import { mockCurrentLocationDb } from '../../db/mocks';
import { CurrentLocationService } from './CurrentLocationService';

export const currentLocationService = new CurrentLocationService(mockCurrentLocationDb);
