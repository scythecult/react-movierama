import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { AddToCartButton } from './AddToCartButton';

const seat = MOCK_SEATS_DATA[0];

const renderButton = () => {
  render(
    <AppStoreProvider store={AppStore}>
      <AddToCartButton seatId={seat.id} seats={MOCK_SEATS_DATA} />
    </AppStoreProvider>,
  );
};

describe('AddToCartButton', () => {
  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
  });

  test('should add a seat and remove it on the second click', () => {
    renderButton();

    fireEvent.click(screen.getByRole('button'));

    expect(AppStore.getState().cart.map((item) => item.id)).toEqual([seat.id]);
    expect(AppStore.getState().cartTotalPrice).toBe(seat.price);

    fireEvent.click(screen.getByRole('button'));

    expect(AppStore.getState().cart).toEqual([]);
    expect(AppStore.getState().cartTotalPrice).toBe(0);
  });
});
