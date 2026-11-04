import type { SeatData, SeatType } from '../../src/common/entities/hallplan';
import { Hall } from '../../src/server/lib/entities/hallplan/Hall';
import { mapSeatsToSeatData } from '../../src/server/lib/entities/hallplan/helpers';
import { SEAT_SIZE } from '../../src/server/lib/entities/hallplan/Seat';

export const MOCK_SEAT_WIDTH = SEAT_SIZE.WIDTH;

export const MOCK_SEAT_HEIGHT = SEAT_SIZE.HEIGHT;

export const MOCK_SEAT_OFFSET = SEAT_SIZE.OFFSET;

export const MOCK_HALL_PLAN_MATRIX =
  // HALL
  [
    // ROW  1 - regular, 2 - comfort, 3 - vip, 4 - wheelchair, 5 - occupied
    [1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 1, 1, 1],
    // ROW
    [2, 2, 0, 1, 1, 1, 1, 0, 1],
    // ROW
    [1, 1, 0, 4, 4, 4, 2, 0, 4],
    // ROW
    [1, 1, 0, 3, 3, 3, 3, 0, 1],
  ];

export const MOCK_SEAT_TYPES: SeatType[] = [
  {
    id: 1,
    name: 'regular',
    ticketTypes: [
      {
        id: 1,
        name: 'adult',
        price: 330,
      },
      {
        id: 2,
        name: 'child',
        price: 165,
      },
    ],
  },
  {
    id: 2,
    name: 'comfort',
    ticketTypes: [
      {
        id: 1,
        name: 'adult',
        price: 380,
      },
      {
        id: 2,
        name: 'child',
        price: 190,
      },
    ],
  },
  {
    id: 3,
    name: 'vip',
    ticketTypes: [
      {
        id: 1,
        name: 'adult',
        price: 430,
      },
      {
        id: 2,
        name: 'child',
        price: 165,
      },
    ],
  },
  {
    id: 4,
    name: 'wheelchair',
    ticketTypes: [
      {
        id: 1,
        name: 'adult',
        price: 230,
      },
      {
        id: 2,
        name: 'child',
        price: 65,
      },
    ],
  },
];

const mockHall = new Hall({
  hallPlanMatrix: MOCK_HALL_PLAN_MATRIX,
});
const mockSeats = mockHall.createSeats();

export const MOCK_CANVAS_SIZE = mockHall.getCanvasSize();

export const MOCK_SEATS_DATA: SeatData[] = mapSeatsToSeatData(mockSeats, MOCK_SEAT_TYPES);
