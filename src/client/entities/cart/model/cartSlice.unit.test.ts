import { MOCK_SEATS_DATA } from '../../../../../mocks/data/seats';
import { TEST_CART_ITEMS, TEST_SEAT_ID } from '../../../../tests/constants';
import { AppStore } from '../../../app/store/AppStore';

describe('cartSlice', () => {
  test('should have expected initial values', () => {
    const state = AppStore.getState();

    expect(state.cartTotalPrice).toBe(0);
    expect(state.cart).toEqual([]);
  });

  describe('common actions', () => {
    test('should correctly set the "cartTotalPrice" value', () => {
      let nextCartTotalPrice = 20;

      AppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(AppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);

      nextCartTotalPrice = 0;

      AppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(AppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);
    });

    test('should correctly set the "cart" value', () => {
      let nextCart = TEST_CART_ITEMS;

      AppStore.getState().cart = nextCart;
      expect(AppStore.getState().cart).toEqual(nextCart);

      nextCart = [];

      AppStore.getState().cart = nextCart;
      expect(AppStore.getState().cart).toEqual(nextCart);
    });
  });

  describe('page actions', () => {
    let state: CombinedAppStore;

    beforeEach(() => {
      state = AppStore.getState();
    });

    test('should correctly update cart on "addToCart" action', () => {
      state.addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);

      const updatedCart = AppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;
      const updatedCartTotalPrice = AppStore.getState().cartTotalPrice;

      expect(AppStore.getState().cart.length).toBe(1);
      expect(updatedCart.id).toBe(TEST_SEAT_ID);
      expect(updatedCartTotalPrice).toBe(updatedCart.price);
    });

    test('should correctly update cart on "removeFromCart" action', () => {
      state.addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);
      state.removeFromCart(TEST_SEAT_ID);

      const updatedCartTotalPrice = AppStore.getState().cartTotalPrice;

      expect(AppStore.getState().cart.length).toBe(0);
      expect(updatedCartTotalPrice).toBe(0);
    });

    test('should correctly update cart on "clearCart" action', () => {
      state.clearCart();

      const updatedCartTotalPrice = AppStore.getState().cartTotalPrice;

      expect(AppStore.getState().cart.length).toBe(0);
      expect(updatedCartTotalPrice).toBe(0);
    });

    test('should correctly update cart ticket type', () => {
      const NEXT_TICKET_TYPE_ID = 2;
      state.addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);
      state.updateCartTicketType(TEST_SEAT_ID, NEXT_TICKET_TYPE_ID);

      const updatedCartItem = AppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;

      expect(AppStore.getState().cart.length).toBe(1);
      expect(updatedCartItem.ticketTypeId).toBe(NEXT_TICKET_TYPE_ID);
    });
  });
});
