import { render } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  test('should correspond default layout', () => {
    const result = render(<Layout />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    const result = render(<Layout>Children</Layout>);

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(<Layout className="custom-class">Children</Layout>);

    expect(result.container).toMatchSnapshot();

    result = render(<Layout className="custom-class-v2">Children</Layout>);

    expect(result.container).toMatchSnapshot();
  });
});
