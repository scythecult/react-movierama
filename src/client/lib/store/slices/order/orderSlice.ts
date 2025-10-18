import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, SeatStateMap } from '../../../constants/common';
import type { Canvas, SeatData, SeatType } from '../../../types/OrderPageData';
import type { WithMiddlewareStateCreator } from '../../appStore';

const toggleSeatStateById = (seats: SeatData[], seatId: number) =>
  seats.map((seat) => {
    if (seat.id === seatId) {
      const isSelected = seat.state === SeatStateMap.SELECTED;
      const nextState = isSelected ? SeatStateMap.FREE : SeatStateMap.SELECTED;

      return {
        ...seat,
        state: nextState,
      };
    }

    return seat;
  });

const calculateCartTotalPrice = (cart: SeatData[]) =>
  cart.reduce((initial, current) => {
    initial += current.price;

    return initial;
  }, 0);

type OrderSliceState = {
  seats: SeatData[] | [];
  canvas: Canvas;
  seatTypes: SeatType[];

  cart: SeatData[];
  cartTotalPrice: number;
};

type OrderSliceActions = {
  setSeats: (seats: SeatData[]) => void;
  setSeatTypes: (seatTypes: SeatType[]) => void;
  setCanvas: (canvas: Canvas) => void;

  addToCart: (seatId: number) => void;
  removeFromCart: (seatId: number) => void;
  clearCart: () => void;
  updateCartTicketType: (seatId: number, ticketTypeId: number) => void;
};

export type OrderSlice = OrderSliceState & OrderSliceActions;

export const createOrderSlice: WithMiddlewareStateCreator<OrderSlice> = (set) => ({
  seats: [],
  canvas: { width: DEFAULT_CANVAS_WIDTH, height: DEFAULT_CANVAS_HEIGHT },
  seatTypes: [],

  cart: [],
  cartTotalPrice: 0,

  setSeats: (seats: SeatData[]) =>
    set(() => ({
      seats,
    })),

  setSeatTypes: (seatTypes: SeatType[]) =>
    set(() => ({
      seatTypes,
    })),

  setCanvas: (canvas: Canvas) => set(() => ({ canvas })),

  addToCart: (seatId) =>
    set(({ seats }) => {
      const nextSeats = toggleSeatStateById(seats, seatId);
      const nextCart = nextSeats.filter((seat) => seat.state === SeatStateMap.SELECTED);
      const nextCartTotalPrice = calculateCartTotalPrice(nextCart);

      return {
        seats: nextSeats,
        cart: nextCart,
        cartTotalPrice: nextCartTotalPrice,
      };
    }),

  removeFromCart: (seatId) =>
    set(({ seats, cart }) => {
      const nextSeats = toggleSeatStateById(seats, seatId);
      const nextCart = cart.filter((cartItem) => cartItem.id !== seatId);
      const nextCartTotalPrice = calculateCartTotalPrice(nextCart);

      return {
        seats: nextSeats,
        cart: nextCart,
        cartTotalPrice: nextCartTotalPrice,
      };
    }),

  clearCart: () =>
    set(({ seats }) => {
      const nextSeats = seats.map((seat) => ({ ...seat, state: SeatStateMap.FREE }));

      return {
        seats: nextSeats,
        cart: [],
        cartTotalPrice: 0,
      };
    }),

  updateCartTicketType: (seatId, ticketTypeId) =>
    set(({ cart }) => {
      const nextCart = cart.map((cartItem) => {
        if (cartItem.id === seatId) {
          const { price, id } = cartItem.seatType.ticketTypes.find((ticketType) => ticketType.id === ticketTypeId)!;

          return {
            ...cartItem,
            ticketTypeId: id,
            price,
          };
        }

        return cartItem;
      });
      const nextCartTotalPrice = calculateCartTotalPrice(nextCart);

      return {
        cart: nextCart,
        cartTotalPrice: nextCartTotalPrice,
      };
    }),
});
