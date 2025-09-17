import { render } from '@testing-library/react';
import { Seats } from '@/client/lib/components/seats/Seats';

describe('Seats', () => {
  test('should correspond default layout', () => {
    const result = render(<Seats />);

    expect(result.container).toMatchSnapshot();
  });
});
