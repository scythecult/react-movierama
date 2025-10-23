import type { SeatData, SeatType } from '../../common/types/hallplan';
import { HALL_PLAN_MATRIX, SEAT_HEIGHT, SEAT_OFFSET, SEAT_WIDTH } from './constants';
import { Hall } from './Hall';
import { SeatNode } from './SeatNode';

// Temporary file
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

export const staticSeatTypes = getMockSeatTypes();

const hall = new Hall({
  Seat: SeatNode,
  hallPlanMatrix: HALL_PLAN_MATRIX,
  seatWidth: SEAT_WIDTH,
  seatHeight: SEAT_HEIGHT,
  seatOffset: SEAT_OFFSET,
});

const seats = hall.createSeats();
export const canvasSize = hall.getCanvasSize();

export const seatsData: SeatData[] = seats.map((seat) => {
  const { type } = seat;
  const seatType = staticSeatTypes.find((seatType) => seatType.id === type);
  let initialPrice = null;
  let initialTicketTypeId = null;

  if (seatType) {
    const [defaultTicketType] = seatType.ticketTypes;
    const { price, id: ticketTypeId } = defaultTicketType;

    initialPrice = price;
    initialTicketTypeId = ticketTypeId;
  }

  return { ...seat, seatType, ticketTypeId: initialTicketTypeId, price: initialPrice };
});
