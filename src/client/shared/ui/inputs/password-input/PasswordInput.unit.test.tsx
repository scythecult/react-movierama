import { render } from '@testing-library/react';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  test('should correspond default layout', () => {
    const result = render(<PasswordInput />);

    expect(result.container).toMatchSnapshot();
  });
});
