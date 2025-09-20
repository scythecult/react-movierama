import { render } from '@testing-library/react';
import { Layout } from '@/client/lib/components/layout/Layout';

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
    const result = render(<Layout className="custom-class">Children</Layout>);

    expect(result.container).toMatchSnapshot();
  });
});
