import type { Canvas, SeatData } from '../../../../../common/types/hallplan';
import type { WithMiddlewareStateCreator } from '../../appStore';

const calculateCartTotalPrice = (cart: SeatData[]) =>
  cart.reduce((initial, current) => {
    if (current.price) {
      initial += current.price;
    }

    return initial;
  }, 0);

type OrderSliceState = {
  cart: SeatData[];
  cartTotalPrice: number;
};

type OrderSliceActions = {
  addToCart: (seats: SeatData[], seatId: number) => void;
  removeFromCart: (seatId: number) => void;
  clearCart: () => void;
  updateCartTicketType: (seatId: number, ticketTypeId: number) => void;
};

export type OrderSlice = OrderSliceState & OrderSliceActions;

export const createOrderSlice: WithMiddlewareStateCreator<OrderSlice> = (set) => ({
  cart: [],
  cartTotalPrice: 0,

  setCanvas: (canvas: Canvas) => set(() => ({ canvas })),

  addToCart: (seats, seatId) =>
    set((state) => {
      const isAlreadyInCart = state.cart.some((cartItem) => cartItem.id === seatId);
      const newCartItem = seats.find((seat) => seat.id === seatId);

      if (!isAlreadyInCart && newCartItem) {
        state.cart.push(newCartItem);
      } else {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== seatId);
      }

      state.cartTotalPrice = calculateCartTotalPrice(state.cart);
    }),

  removeFromCart: (seatId) =>
    set((state) => {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== seatId);
      state.cartTotalPrice = calculateCartTotalPrice(state.cart);
    }),

  clearCart: () =>
    set((state) => {
      state.cart = [];
      state.cartTotalPrice = 0;
    }),

  updateCartTicketType: (seatId, ticketTypeId) =>
    set((state) => {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id === seatId && cartItem.seatType) {
          const { price, id } = cartItem.seatType.ticketTypes.find((ticketType) => ticketType.id === ticketTypeId)!;

          return {
            ...cartItem,
            ticketTypeId: id,
            price,
          };
        }

        return cartItem;
      });
      state.cartTotalPrice = calculateCartTotalPrice(state.cart);
    }),
});
