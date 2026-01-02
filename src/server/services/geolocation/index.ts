import { mockGeolocationDb } from '../../db/mocks';
import { GeolocationService } from './GeolocationService';

export const geolocationService = new GeolocationService(mockGeolocationDb);
