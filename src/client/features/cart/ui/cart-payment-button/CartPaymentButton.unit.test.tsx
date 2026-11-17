import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MOCK_SEATS_DATA } from '../../../../../../mocks/data/seats';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { CartPaymentButton } from './CartPaymentButton';

const seat = MOCK_SEATS_DATA[0];

const renderButton = () => {
  render(
    <MemoryRouter>
      <AppStoreProvider store={AppStore}>
        <CartPaymentButton />
      </AppStoreProvider>
    </MemoryRouter>,
  );
};

describe('CartPaymentButton', () => {
  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
  });

  test('should ask to select seats while the cart is empty', () => {
    renderButton();

    const link = screen.getByRole('link', { name: 'Select seats' });

    expect(link.getAttribute('data-test-disabled')).toBe('true');
    expect(link.getAttribute('href')).toBe('/checkout');
  });

  test('should show the payment total when the cart has a price', () => {
    AppStore.setState({ cart: [seat], cartTotalPrice: seat.price });
    renderButton();

    const link = screen.getByRole('link', { name: `Proceed to payment: ${seat.price} RUB` });

    expect(link.getAttribute('data-test-disabled')).toBe('false');
    expect(link.getAttribute('href')).toBe('/checkout');
  });
});
