import { render } from '@testing-library/react';
import { Order } from '@/client/pages/order/Order';

describe('Order', () => {
  test('should correspond default layout', () => {
    const result = render(<Order />);

    expect(result.container).toMatchSnapshot();
  });
});
