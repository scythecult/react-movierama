import { render } from '@testing-library/react';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { OrderPage, type OrderPageProps } from './OrderPage';

const DEFAULT_PROPS: OrderPageProps = {
  totalPrice: 0,
  onClearCart: () => {},
};
const buildWrappedComponent = (props = DEFAULT_PROPS) => (
  <AppStoreProvider>
    <OrderPage {...props} />
  </AppStoreProvider>
);

describe('OrderPage', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "totalPrice" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, totalPrice: 10 }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, totalPrice: 5 }));

    expect(result.container).toMatchSnapshot();
  });
});
