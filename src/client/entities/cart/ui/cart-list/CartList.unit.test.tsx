import { render } from '@testing-library/react';
import { describe } from 'vitest';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { CartList, type CartListProps } from './CartList';

const DEFAULT_PROPS: CartListProps = {
  renderRemoveFromCartButton: () => <p>Remove</p>,
  renderTicketTypeSelect: () => <div>Ticket type</div>,
};

const buildWrappedComponent = (props = DEFAULT_PROPS) => (
  <AppStoreProvider store={AppStore}>
    <CartList {...props} />
  </AppStoreProvider>
);

describe('Cart', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
