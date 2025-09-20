import { render } from '@testing-library/react';
import { Info } from '@/client/pages/order/info/Info';

describe('Info', () => {
  test('should correspond default layout', () => {
    const result = render(<Info />);

    expect(result.container).toMatchSnapshot();
  });
});
