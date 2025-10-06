import { render } from '@testing-library/react';
import { describe } from 'vitest';
import { AppStoreProvider } from '@/client/lib/providers/AppStoreProvider';
import { CART_ITEMS } from '../../../../tests/constants';
import { PreCheck, type PreCheckProps } from './PreCheck';

const DEFAULT_PROPS: PreCheckProps = {
  cart: [],
  onRemoveSeatClick: () => {},
  onTicketTypeChange: () => {},
};

const buildWrappedComponent = (props = DEFAULT_PROPS) => (
  <AppStoreProvider>
    <PreCheck {...props} />
  </AppStoreProvider>
);

describe('PreCheck', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "cart" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, cart: CART_ITEMS }));

    expect(result.container).toMatchSnapshot();
  });
});
