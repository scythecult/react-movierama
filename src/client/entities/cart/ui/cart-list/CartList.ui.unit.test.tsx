import { render } from '@testing-library/react';
import { describe } from 'vitest';
import { AppStore } from '../../../../app/store/AppStore';
import { AppStoreProvider } from '../../../../shared/lib/store';
import { CartListUi, type CartListUiProps } from './CartList.ui';

const DEFAULT_PROPS: CartListUiProps = {
  renderRemoveFromCartButton: () => <p>Remove</p>,
  renderTicketTypeSelect: () => <div>Ticket type</div>,
};

const buildWrappedComponent = (props = DEFAULT_PROPS) => (
  <AppStoreProvider store={AppStore}>
    <CartListUi {...props} />
  </AppStoreProvider>
);

describe('CartListUi', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
