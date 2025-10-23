import { seatsData } from '../../../../../server/service/serverMockData';
import { TEST_CART_ITEMS, TEST_SEAT_ID } from '../../../../../tests/constants';
import { type AppStore, getAppStore } from '../../appStore';

describe('orderSlice', () => {
  test('should have expected initial values', () => {
    const state = getAppStore.getState();

    expect(state.cartTotalPrice).toBe(0);
    expect(state.cart).toEqual([]);
  });

  describe('common actions', () => {
    test('should correctly set the "cartTotalPrice" value', () => {
      let nextCartTotalPrice = 20;

      getAppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(getAppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);

      nextCartTotalPrice = 0;

      getAppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(getAppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);
    });

    test('should correctly set the "cart" value', () => {
      let nextCart = TEST_CART_ITEMS;

      getAppStore.getState().cart = nextCart;
      expect(getAppStore.getState().cart).toEqual(nextCart);

      nextCart = [];

      getAppStore.getState().cart = nextCart;
      expect(getAppStore.getState().cart).toEqual(nextCart);
    });
  });

  describe('page actions', () => {
    let state: AppStore;

    beforeEach(() => {
      state = getAppStore.getState();
    });

    test('should correctly update cart on "addToCart" action', () => {
      state.addToCart(seatsData, TEST_SEAT_ID);

      const updatedCart = getAppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;
      const updatedCartTotalPrice = getAppStore.getState().cartTotalPrice;

      expect(getAppStore.getState().cart.length).toBe(1);
      expect(updatedCart.id).toBe(TEST_SEAT_ID);
      expect(updatedCartTotalPrice).toBe(updatedCart.price);
    });

    test('should correctly update cart on "removeFromCart" action', () => {
      state.addToCart(seatsData, TEST_SEAT_ID);
      state.removeFromCart(TEST_SEAT_ID);

      const updatedCartTotalPrice = getAppStore.getState().cartTotalPrice;

      expect(getAppStore.getState().cart.length).toBe(0);
      expect(updatedCartTotalPrice).toBe(0);
    });

    test('should correctly update cart on "clearCart" action', () => {
      state.clearCart();

      const updatedCartTotalPrice = getAppStore.getState().cartTotalPrice;

      expect(getAppStore.getState().cart.length).toBe(0);
      expect(updatedCartTotalPrice).toBe(0);
    });

    test('should correctly update cart ticket type', () => {
      const NEXT_TICKET_TYPE_ID = 2;
      state.addToCart(seatsData, TEST_SEAT_ID);
      state.updateCartTicketType(TEST_SEAT_ID, NEXT_TICKET_TYPE_ID);

      const updatedCartItem = getAppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;

      expect(getAppStore.getState().cart.length).toBe(1);
      expect(updatedCartItem.ticketTypeId).toBe(NEXT_TICKET_TYPE_ID);
    });
  });
});
