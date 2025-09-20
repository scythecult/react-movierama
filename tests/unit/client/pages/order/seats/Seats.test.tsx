import { render } from '@testing-library/react';
import { Seats } from '@/client/pages/order/seats/Seats';

describe('Seats', () => {
  test('should correspond default layout', () => {
    const result = render(<Seats />);

    expect(result.container).toMatchSnapshot();
  });
});
