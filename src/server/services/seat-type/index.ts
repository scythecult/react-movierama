import { mockSeatTypeDb } from '../../db/mocks';
import { SeatTypeService } from './SeatTypeService';

export const seatTypeService = new SeatTypeService(mockSeatTypeDb);
