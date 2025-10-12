import type { SeatData, SeatType } from '@/client/lib/types/OrderPageData';
import { HALL_PLAN_MATRIX, SEAT_HEIGHT, SEAT_OFFSET, SEAT_WIDTH } from '@/client/lib/utils/mocks/constants';
import { Hall } from '@/client/lib/utils/mocks/Hall';
import { SeatNode } from '@/client/lib/utils/mocks/SeatNode';

export const getMockSeatTypes = (): SeatType[] => {
  return [
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
};

export const STATIC_SEAT_TYPES = getMockSeatTypes();

const hall = new Hall({
  Seat: SeatNode,
  hallPlanMatrix: HALL_PLAN_MATRIX,
  seatWidth: SEAT_WIDTH,
  seatHeight: SEAT_HEIGHT,
  seatOffset: SEAT_OFFSET,
});

export const SEATS = hall.createSeats();
export const CANVAS_SIZE = hall.getCanvasSize();

export const SEATS_DATA: SeatData[] = SEATS.map((seat) => {
  const { type } = seat;
  const seatType = STATIC_SEAT_TYPES.find((seatType) => seatType.id === type)!;
  const [defaultTicketType] = seatType.ticketTypes;
  const { price, id: ticketTypeId } = defaultTicketType;

  return { ...seat, seatType, ticketTypeId, price };
});
