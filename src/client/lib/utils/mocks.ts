import type { SeatData, SeatType, SeatTypeName } from '@/client/lib/types/OrderData';

export const getRandomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const MOCK_SEAT_TYPES: SeatTypeName[] = ['vip', 'regular', 'comfort'];
const MOCK_SEAT_TYPE_IDS = [342, 2542, 3422];

export const generateMockSeatData = (rowCount = 5, seatCount = 20): SeatData[][] => {
  const rows = [];
  let id = 0;
  let seatNumber = 1;

  for (let i = 0; i < rowCount; i++) {
    rows.push(
      Array.from({ length: seatCount }, () => ({
        id: `${id++}`,
        isSelected: false,
        isOccupied: false,
        place: seatNumber++,
        type: MOCK_SEAT_TYPES[getRandomInteger(0, MOCK_SEAT_TYPES.length - 1)],
        typeId: MOCK_SEAT_TYPE_IDS[getRandomInteger(0, MOCK_SEAT_TYPE_IDS.length - 1)],
      })),
    );
  }

  return rows;
};

export const STATIC_SEATS = generateMockSeatData(5, 10);

export const generateMockSeatTypes = (): SeatType[] => {
  return [
    {
      id: 342,
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
      id: 2542,
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
      id: 3422,
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
  ];
};

export const STATIC_SEAT_TYPES = generateMockSeatTypes();