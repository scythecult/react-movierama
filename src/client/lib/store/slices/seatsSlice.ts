import type { StateCreator } from 'zustand';
import type { SeatData, SeatType } from '../../types/OrderData';

// TODO Convert seat data to object with coords and w/h,
// TODO Make Seats component container relative, and seats absolute;
const generateMockSeatData = (rowCount = 5, seatCount = 20): SeatData[][] => {
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
      })),
    );
  }

  return rows;
};

const generateMockSeatTypes = (): SeatType[] => {
  return [
    {
      id: 342,
      name: 'Regular',
      ticketTypes: [
        {
          id: 1,
          name: 'Adult',
          price: 330,
        },
        {
          id: 2,
          name: 'Child',
          price: 165,
        },
      ],
    },
    {
      id: 2542,
      name: 'Comfort',
      ticketTypes: [
        {
          id: 1,
          name: 'Adult',
          price: 380,
        },
        {
          id: 2,
          name: 'Child',
          price: 190,
        },
      ],
    },
  ];
};

type OrderSliceState = {
  seats: SeatData[][];
  seatTypes: SeatType[];
  totalPrice: number;
};

type OrderSliceActions = {
  setIsSelected: (seatId: string, isSelected: boolean) => void;
};

export type OrderSlice = OrderSliceState & OrderSliceActions;

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  seats: generateMockSeatData(5, 10),
  seatTypes: generateMockSeatTypes(),
  totalPrice: 0,
  setIsSelected: (seatId, isSelected) =>
    set(({ seats, totalPrice }) => ({
      seats: seats.map((seatRows) => {
        const targetSeatIndex = seatRows.findIndex((seat) => seat.id === seatId);

        if (targetSeatIndex !== -1) {
          const targetSeat = seatRows[targetSeatIndex];
          const newSeat = { ...targetSeat, isSelected: !isSelected };

          return [...seatRows.slice(0, targetSeatIndex), newSeat, ...seatRows.slice(targetSeatIndex + 1)];
        }

        return seatRows;
      }),
      totalPrice: !isSelected ? totalPrice + 10 : totalPrice - 10,
    })),
});
