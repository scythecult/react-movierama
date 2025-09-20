import { render } from '@testing-library/react';
import { Legend } from '@/client/pages/order/legend/Legend';

describe('Legend', () => {
  test('should correspond default layout', () => {
    const result = render(<Legend />);

    expect(result.container).toMatchSnapshot();
  });
});
