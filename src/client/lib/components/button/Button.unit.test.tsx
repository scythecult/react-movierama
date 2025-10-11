import { render } from '@testing-library/react';
import { Button } from '@/client/lib/components/button/Button';

describe('Button', () => {
  test('should correspond default layout', () => {
    const result = render(<Button />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    const result = render(<Button>Children</Button>);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    const result = render(<Button className="custom-class">Children</Button>);

    expect(result.container).toMatchSnapshot();
  });
});
