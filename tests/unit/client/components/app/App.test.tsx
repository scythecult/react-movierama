import { render } from '@testing-library/react';
import { App } from '@/client/lib/components/app/App';

describe('App', () => {
  test('should correspond default layout', () => {
    const result = render(<App />);

    expect(result.container).toMatchSnapshot();
  });
});
