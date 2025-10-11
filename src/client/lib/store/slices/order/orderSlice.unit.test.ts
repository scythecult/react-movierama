import { CANVAS_SIZE, SEATS, STATIC_SEAT_TYPES } from '@/client/lib/utils/mocks';
import { TEST_CART_ITEMS, TEST_SEAT_ID } from '@/tests/constants';
import { type AppStore, createAppStore } from '../../appStore';

describe('orderSlice', () => {
  test('should have expected initial values', () => {
    const state = createAppStore.getState();

    expect(state.seats).toEqual(SEATS);
    expect(state.seatTypes).toEqual(STATIC_SEAT_TYPES);
    expect(state.canvas).toEqual(CANVAS_SIZE);
    expect(state.cartTotalPrice).toBe(0);
    expect(state.cart).toEqual([]);
  });

  describe('common actions', () => {
    test('should correctly set the "seats" value', () => {
      let nextSeats = SEATS;

      createAppStore.getState().setSeats(nextSeats);
      expect(createAppStore.getState().seats).toEqual(nextSeats);

      nextSeats = [];

      createAppStore.getState().setSeats(nextSeats);
      expect(createAppStore.getState().seats).toEqual(nextSeats);
    });

    test('should correctly set the "seatTypes" value', () => {
      let nextSeatTypes = STATIC_SEAT_TYPES;

      createAppStore.getState().setSeatTypes(nextSeatTypes);
      expect(createAppStore.getState().seatTypes).toEqual(nextSeatTypes);

      nextSeatTypes = [];

      createAppStore.getState().setSeatTypes(nextSeatTypes);
      expect(createAppStore.getState().seatTypes).toEqual(nextSeatTypes);
    });

    test('should correctly set the "canvas" value', () => {
      let nextCanvas = { width: 100, height: 20 };

      createAppStore.getState().setCanvas(nextCanvas);
      expect(createAppStore.getState().canvas).toEqual(nextCanvas);

      nextCanvas = { width: 0, height: 0 };

      createAppStore.getState().setCanvas(nextCanvas);
      expect(createAppStore.getState().canvas).toEqual(nextCanvas);
    });

    test('should correctly set the "cartTotalPrice" value', () => {
      let nextCartTotalPrice = 20;

      createAppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(createAppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);

      nextCartTotalPrice = 0;

      createAppStore.getState().cartTotalPrice = nextCartTotalPrice;
      expect(createAppStore.getState().cartTotalPrice).toEqual(nextCartTotalPrice);
    });

    test('should correctly set the "cart" value', () => {
      let nextCart = TEST_CART_ITEMS;

      createAppStore.getState().cart = nextCart;
      expect(createAppStore.getState().cart).toEqual(nextCart);

      nextCart = [];

      createAppStore.getState().cart = nextCart;
      expect(createAppStore.getState().cart).toEqual(nextCart);
    });
  });

  describe('page actions', () => {
    let state: AppStore;

    beforeEach(() => {
      state = createAppStore.getState();
      state.setSeats(SEATS);
      state.setSeatTypes(STATIC_SEAT_TYPES);
    });

    test('should correctly update seat "state" value', () => {
      state.setIsSelected(TEST_SEAT_ID);

      const updatedSeat = createAppStore.getState().seats.find((seat) => seat.id === TEST_SEAT_ID)!;

      expect(updatedSeat).toHaveProperty('state', 3);
    });

    test('should correctly update cart', () => {
      state.setIsSelected(TEST_SEAT_ID);
      state.updateCart();

      const addedCartItem = createAppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;

      expect(createAppStore.getState().cart.length).toBe(1);
      expect(addedCartItem.id).toBe(TEST_SEAT_ID);
    });

    test('should correctly update cart ticket type', () => {
      const NEXT_TICKET_TYPE_ID = 2;
      state.updateCartTicketType({ ...TEST_CART_ITEMS[0], ticketTypeId: NEXT_TICKET_TYPE_ID });

      const updatedCartItem = createAppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;

      expect(createAppStore.getState().cart.length).toBe(1);
      expect(updatedCartItem.ticketTypeId).toBe(NEXT_TICKET_TYPE_ID);
    });

    test('should correctly update cart total price', () => {
      state.setIsSelected(TEST_SEAT_ID);
      state.updateCart();
      state.updateCartTotalPrice();

      const nextCartTotalPrice = createAppStore.getState().cart.reduce((initial, current) => {
        initial += current.price;

        return initial;
      }, 0);

      expect(createAppStore.getState().cartTotalPrice).toBe(nextCartTotalPrice);
    });
  });
});
