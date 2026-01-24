import { mockHallplanMatrixDb } from '../../db/mocks';
import { HallplanMatrixService } from './HallplanMatrixService';

export const hallplanMatrixService = new HallplanMatrixService(mockHallplanMatrixDb);
