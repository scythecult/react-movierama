import type { StateCreator } from 'zustand';
import { STATIC_SEAT_TYPES, STATIC_SEATS } from '@/client/lib/utils/mocks';
import type { SeatData, SeatType, SelectedSeat } from '../../types/OrderData';

// TODO Move to flat seats data-structure
type OrderSliceState = {
  seats: SeatData[][];
  seatTypes: SeatType[];
  totalPrice: number;
  selectedSeats: SelectedSeat[];
};

type OrderSliceActions = {
  setIsSelected: (payload: SeatData) => void;
  calculateTotalPrice: () => void;
  updateSelectedSeats: (payload: SeatData) => void;
  updateSelectedSeatPrice: (payload: SelectedSeat) => void;
};

export type OrderSlice = OrderSliceState & OrderSliceActions;

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  seats: STATIC_SEATS,
  seatTypes: STATIC_SEAT_TYPES,
  totalPrice: 0,
  selectedSeats: [],

  setIsSelected: ({ isSelected, id }: SeatData) =>
    set(({ seats }) => {
      const nextSeats = seats.map((seatRows) => {
        const targetSeatIndex = seatRows.findIndex((seat) => seat.id === id);

        if (targetSeatIndex !== -1) {
          const targetSeat = seatRows[targetSeatIndex];
          const newSeat = { ...targetSeat, isSelected };

          return [...seatRows.slice(0, targetSeatIndex), newSeat, ...seatRows.slice(targetSeatIndex + 1)];
        }

        return seatRows;
      });


      return {
        seats: nextSeats,
      };
    }),

  updateSelectedSeats: (payload: SeatData) =>
    set(({ selectedSeats, seatTypes }) => {
      const currentSelectedSeatIndex = selectedSeats.findIndex((selectedSeat) => selectedSeat.id === payload.id);
      const currentSeatType = seatTypes.find((seatType) => seatType.name === payload.type);
      let nextSelectedSeats = selectedSeats;

      if (currentSeatType) {
        if (currentSelectedSeatIndex === -1) {
          const [defaultTicketType] = currentSeatType.ticketTypes;

          nextSelectedSeats = [...nextSelectedSeats, {
            ...payload,
            price: defaultTicketType.price,
            seatType: currentSeatType,
            ticketTypeId: 1,
          }];
        } else {
          nextSelectedSeats = nextSelectedSeats.filter((_, index) => index !== currentSelectedSeatIndex);
        }
      }

      return { selectedSeats: nextSelectedSeats };
    }),

  updateSelectedSeatPrice: (payload: SelectedSeat) => set(({ selectedSeats }) => {
    const currentSelectedSeatIndex = selectedSeats.findIndex((selectedSeat) => selectedSeat.id === payload.id);
    let nextSelectedSeats = selectedSeats;

    if (currentSelectedSeatIndex !== -1) {
      const { seatType: { ticketTypes } } = payload;
      const currentTicketType = ticketTypes.find((ticketType) => ticketType.id === payload.ticketTypeId);

      if (currentTicketType) {
        const newSelectedSeat = {
          ...payload,
          price: currentTicketType.price,
        };

        nextSelectedSeats = [...nextSelectedSeats.slice(0, currentSelectedSeatIndex), newSelectedSeat, ...nextSelectedSeats.slice(currentSelectedSeatIndex + 1)];
      }
    }

    return { selectedSeats: nextSelectedSeats };
  }),

  calculateTotalPrice: () =>
    set(({ selectedSeats }) => {
      const nextTotalPrice = selectedSeats.reduce((initial, current) => {
        initial += current.price;

        return initial;
      }, 0);

      return {
        totalPrice: nextTotalPrice,
      };
    }),
});
