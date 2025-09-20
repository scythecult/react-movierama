import { render } from '@testing-library/react';
import { Hall } from '@/client/pages/order/hall/Hall';

describe('Hall', () => {
  test('should correspond default layout', () => {
    const result = render(<Hall />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    const result = render(<Hall>Children</Hall>);

    expect(result.container).toMatchSnapshot();
  });
});
