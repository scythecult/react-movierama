import { render } from '@testing-library/react';
import { Screen } from '@/client/lib/components/screen/Screen';

describe('Screen', () => {
  test('should correspond default layout', () => {
    const result = render(<Screen />);

    expect(result.container).toMatchSnapshot();
  });
});
