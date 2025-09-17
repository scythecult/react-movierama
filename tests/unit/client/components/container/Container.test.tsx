import { render } from '@testing-library/react';
import { Container } from '@/client/lib/components/container/Container';

describe('Container', () => {
  test('should correspond default layout', () => {
    const result = render(<Container />);

    expect(result.container).toMatchSnapshot();
  });

  test('should support children', () => {
    const result = render(<Container>TEST</Container>);

    expect(result.container).toMatchSnapshot();
  });
});
