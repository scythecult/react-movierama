import type { CartItemData } from './types';

const calculateCartTotalPrice = (cart: CartItemData[]) =>
  cart.reduce((initial, current) => {
    if (current.price) {
      initial += current.price;
    }

    return initial;
  }, 0);

type CartSliceState = {
  cart: CartItemData[];
  cartTotalPrice: number;
};

type CartSliceActions = {
  addToCart: (seats: CartItemData[], seatId: number) => void;
  removeFromCart: (seatId: number) => void;
  clearCart: () => void;
  updateCartTicketType: (seatId: number, ticketTypeId: number) => void;
};

export type CartSlice = CartSliceState & CartSliceActions;

export const createCartSlice: WithMiddlewareStateCreator<CartSlice> = (set) => ({
  cart: [],
  cartTotalPrice: 0,

  addToCart: (seats, seatId) =>
    set(
      (state) => {
        const isAlreadyInCart = state.cart.some((cartItem) => cartItem.id === seatId);
        const newCartItem = seats.find((seat) => seat.id === seatId);

        if (!isAlreadyInCart && newCartItem) {
          state.cart.push(newCartItem);
        } else {
          state.cart = state.cart.filter((cartItem) => cartItem.id !== seatId);
        }

        state.cartTotalPrice = calculateCartTotalPrice(state.cart);
      },
      undefined,
      'order:addToCart',
    ),

  removeFromCart: (seatId) =>
    set(
      (state) => {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== seatId);
        state.cartTotalPrice = calculateCartTotalPrice(state.cart);
      },
      undefined,
      'order:removeFromCart',
    ),

  clearCart: () =>
    set(
      (state) => {
        state.cart = [];
        state.cartTotalPrice = 0;
      },
      undefined,
      'order:clearCart',
    ),

  updateCartTicketType: (seatId, ticketTypeId) =>
    set(
      (state) => {
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
      },
      undefined,
      'order:updateCartTicketType',
    ),
});
