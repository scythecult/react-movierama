import { render, screen } from '@testing-library/react';
import { TEST_CART_ITEMS } from '../../../../../tests/constants';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { CartListUi } from './CartList.ui';

const renderCart = () => {
  return render(
    <AppStoreProvider store={AppStore}>
      <CartListUi
        renderRemoveFromCartButton={(itemId) => <button type="button">Remove {itemId}</button>}
        renderTicketTypeSelect={() => <span>Adult</span>}
      />
    </AppStoreProvider>,
  );
};

describe('CartListUi', () => {
  beforeEach(() => {
    AppStore.setState({ cart: [], cartTotalPrice: 0 });
  });

  test('should render nothing when the cart is empty', () => {
    const { container } = renderCart();

    expect(container.firstChild).toBeNull();
  });

  test('should render the chosen place, price, and actions', () => {
    const [cartItem] = TEST_CART_ITEMS;

    AppStore.setState({ cart: TEST_CART_ITEMS, cartTotalPrice: cartItem.price });
    renderCart();

    expect(screen.getByRole('heading', { name: 'Chosen places' })).toBeTruthy();
    expect(screen.getByText(`${cartItem.row} row, ${cartItem.place} place`)).toBeTruthy();
    expect(screen.getByText('regular')).toBeTruthy();
    expect(screen.getByText(`${cartItem.price} RUB`)).toBeTruthy();
    expect(screen.getByText('Adult')).toBeTruthy();
    expect(screen.getByRole('button', { name: `Remove ${cartItem.id}` })).toBeTruthy();
  });
});
