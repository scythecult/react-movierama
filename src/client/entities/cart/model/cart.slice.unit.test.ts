import { MOCK_SEATS_DATA } from '../../../../../mocks/data/seats';
import { TEST_SEAT_ID } from '../../../../tests/constants';
import { AppStore } from '../../../app/store/AppStore';

describe('cartSlice', () => {
  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
  });

  test('should have expected initial values', () => {
    const state = AppStore.getState();

    expect(state.cartTotalPrice).toBe(0);
    expect(state.cart).toEqual([]);
  });

  test('should correctly update cart on "addToCart" action', () => {
    AppStore.getState().addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);

    const updatedCart = AppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;

    expect(AppStore.getState().cart.length).toBe(1);
    expect(updatedCart.id).toBe(TEST_SEAT_ID);
    expect(AppStore.getState().cartTotalPrice).toBe(updatedCart.price);
  });

  test('should correctly update cart on "removeFromCart" action', () => {
    AppStore.getState().addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);
    AppStore.getState().removeFromCart(TEST_SEAT_ID);

    expect(AppStore.getState().cart).toEqual([]);
    expect(AppStore.getState().cartTotalPrice).toBe(0);
  });

  test('should correctly update cart on "clearCart" action', () => {
    AppStore.getState().addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);
    AppStore.getState().clearCart();

    expect(AppStore.getState().cart).toEqual([]);
    expect(AppStore.getState().cartTotalPrice).toBe(0);
  });

  test('should correctly update cart ticket type', () => {
    const nextTicketTypeId = 2;

    AppStore.getState().addToCart(MOCK_SEATS_DATA, TEST_SEAT_ID);
    AppStore.getState().updateCartTicketType(TEST_SEAT_ID, nextTicketTypeId);

    const updatedCartItem = AppStore.getState().cart.find((cartItem) => cartItem.id === TEST_SEAT_ID)!;
    const nextTicket = updatedCartItem.seatType.ticketTypes.find((ticketType) => ticketType.id === nextTicketTypeId)!;

    expect(updatedCartItem.ticketTypeId).toBe(nextTicketTypeId);
    expect(updatedCartItem.price).toBe(nextTicket.price);
    expect(AppStore.getState().cartTotalPrice).toBe(nextTicket.price);
  });
});
