import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { ClearCartButton } from './ClearCartButton';

const seat = MOCK_SEATS_DATA[0];

const renderButton = () => {
  render(
    <AppStoreProvider store={AppStore}>
      <ClearCartButton />
    </AppStoreProvider>,
  );
};

describe('ClearCartButton', () => {
  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
  });

  test('should stay hidden while the cart is empty', () => {
    renderButton();

    expect(screen.queryByRole('button', { name: 'Clear cart' })).toBeNull();
  });

  test('should clear the cart and hide itself', () => {
    AppStore.setState({ cart: [seat], cartTotalPrice: seat.price });
    renderButton();

    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));

    expect(AppStore.getState().cart).toEqual([]);
    expect(AppStore.getState().cartTotalPrice).toBe(0);
    expect(screen.queryByRole('button', { name: 'Clear cart' })).toBeNull();
  });
});
