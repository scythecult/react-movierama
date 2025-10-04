import { render } from '@testing-library/react';
import { AppStoreProvider } from '@/client/lib/providers/AppStoreProvider';
import { OrderPage, type OrderPageProps } from '@/client/pages/order/OrderPage';

const DEFAULT_PROPS: OrderPageProps = {
  totalPrice: 0,
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
    let result = render(buildWrappedComponent({ totalPrice: 10 }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ totalPrice: 5 }));

    expect(result.container).toMatchSnapshot();
  });
});
