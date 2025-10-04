import type { StateCreator } from 'zustand';
import { CANVAS_SIZE, SEATS, STATIC_SEAT_TYPES } from '@/client/lib/utils/mocks';
import { DEFAULT_TICKET_TYPE_ID, SeatStateMap } from '../../constants/common';
import type { Canvas, CartItem, SeatData, SeatType } from '../../types/OrderPageData';

type OrderSliceState = {
  seats: SeatData[];
  seatTypes: SeatType[];
  canvas: Canvas;
  cart: CartItem[];
  cartTotalPrice: number;
};

type OrderSliceActions = {
  setIsSelected: (id: number) => void;
  updateCart: () => void;
  updateCartTotalPrice: () => void;
  updateCartTicketType: (payload: CartItem) => void;
};

export type OrderSlice = OrderSliceState & OrderSliceActions;

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  canvas: CANVAS_SIZE,
  seats: SEATS,
  seatTypes: STATIC_SEAT_TYPES,
  cartTotalPrice: 0,
  cart: [],

  setIsSelected: (id) =>
    set(({ seats }) => {
      const nextSeats = seats.map((seat) => {
        if (seat.id === id) {
          const isSelected = seat.state === SeatStateMap.SELECTED;
          const nextState = isSelected ? SeatStateMap.FREE : SeatStateMap.SELECTED;

          return {
            ...seat,
            state: nextState,
          };
        }

        return seat;
      });

      return {
        seats: nextSeats,
      };
    }),

  updateCart: () =>
    set(({ seats, seatTypes }) => {
      const selectedSeats = seats.filter((seat) => seat.state === SeatStateMap.SELECTED);
      const nextCartItems = selectedSeats
        .map((seat) => {
          const { id, row, place, type } = seat;
          const seatType = seatTypes.find((seatType) => seatType.id === type);

          if (seatType) {
            const [defaultTicketType] = seatType.ticketTypes;
            const { price } = defaultTicketType;

            return {
              id,
              place,
              row,
              type,
              seatType,
              ticketTypeId: DEFAULT_TICKET_TYPE_ID,
              price,
            };
          }
        })
        .filter((cartItem) => cartItem !== undefined);

      return {
        cart: nextCartItems,
      };
    }),

  updateCartTicketType: ({ id, ticketTypeId }: CartItem) =>
    set(({ cart, seatTypes }) => {
      const nextCartItems = cart.map((cartItem) => {
        if (cartItem.id === id) {
          const seatType = seatTypes.find((seatType) => seatType.id === cartItem.type);

          if (seatType) {
            const { price, id } = seatType.ticketTypes.find((ticketType) => ticketType.id === ticketTypeId)!;

            return {
              ...cartItem,
              ticketTypeId: id,
              price,
            };
          }

          return cartItem;
        }

        return cartItem;
      });

      return { cart: nextCartItems };
    }),

  updateCartTotalPrice: () =>
    set(({ cart }) => {
      const nextCartTotalPrice = cart.reduce((initial, current) => {
        initial += current.price;

        return initial;
      }, 0);

      return {
        cartTotalPrice: nextCartTotalPrice,
      };
    }),
});
