import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  test('should correspond default layout', () => {
    const result = render(<Badge />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    let result = render(<Badge>Children</Badge>);

    expect(result.container).toMatchSnapshot();

    result = render(<Badge>Children v2</Badge>);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(<Badge className="custom-class">Children</Badge>);

    expect(result.container).toMatchSnapshot();

    result = render(<Badge className="custom-class-v2">Children</Badge>);

    expect(result.container).toMatchSnapshot();
  });
});
