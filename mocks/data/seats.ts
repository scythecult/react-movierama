import type { SeatData, SeatType } from '../../src/common/types/hallplan';
import { Hall } from '../../src/server/services/Hall';
import { SeatNode } from '../../src/server/services/SeatNode';

export const MOCK_SEAT_WIDTH = 40;

export const MOCK_SEAT_HEIGHT = 34;

export const MOCK_SEAT_OFFSET = 10;

export const MOCK_HALL_PLAN_MATRIX =
  // HALL
  [
    // ROW  1 - regular, 2 - comfort, 3 - vip, 4 - wheelchair, 5 - occupied
    [1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 1, 1, 1],
    // ROW
    [2, 2, 0, 1, 1, 1, 1, 0, 1],
    // ROW
    [1, 1, 0, 4, 4, 4, 2, 0, 5],
    // ROW
    [1, 1, 0, 3, 3, 3, 3, 0, 1],
  ];
// TODO MOVE HALL
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
  Seat: SeatNode,
  hallPlanMatrix: MOCK_HALL_PLAN_MATRIX,
  seatWidth: MOCK_SEAT_WIDTH,
  seatHeight: MOCK_SEAT_HEIGHT,
  seatOffset: MOCK_SEAT_OFFSET,
});

const mockSeats = mockHall.createSeats();

export const MOCK_CANVAS_SIZE = mockHall.getCanvasSize();

export const MOCK_SEATS_DATA: SeatData[] = mockSeats.map((mockSeat) => {
  const { type } = mockSeat;
  const seatType = MOCK_SEAT_TYPES.find((seatType) => seatType.id === type);
  let initialPrice = null;
  let initialTicketTypeId = null;

  if (seatType) {
    const [defaultTicketType] = seatType.ticketTypes;
    const { price, id: ticketTypeId } = defaultTicketType;

    initialPrice = price;
    initialTicketTypeId = ticketTypeId;
  }

  return { ...mockSeat, seatType, ticketTypeId: initialTicketTypeId, price: initialPrice };
});
