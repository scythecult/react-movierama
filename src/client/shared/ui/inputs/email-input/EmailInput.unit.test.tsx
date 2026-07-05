import { render } from '@testing-library/react';
import { EmailInput } from './EmailInput';

describe('EmailInput', () => {
  test('should correspond default layout', () => {
    const result = render(<EmailInput />);

    expect(result.container).toMatchSnapshot();
  });
});
