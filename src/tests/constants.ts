import { MOCK_SEAT_TYPES, MOCK_SEATS_DATA } from '../../mocks/data/seats';
import type { SeatData, TicketType } from '../common/types/hallplan';

export const TEST_SEAT_ID = 532;

export const TEST_TICKET_TYPES: TicketType[] = [
  {
    id: 1,
    name: 'student',
    price: 200,
  },
  {
    id: 2,
    name: 'adult',
    price: 250,
  },
];

export const TEST_CART_ITEMS: SeatData[] = [
  {
    ...MOCK_SEATS_DATA[0],
    id: TEST_SEAT_ID,
    place: 1,
    type: 1,
    row: 1,
    seatType: MOCK_SEAT_TYPES[0],
    price: 100,
    ticketTypeId: 1,
  },
];
