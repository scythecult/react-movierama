import { render } from '@testing-library/react';
import { UserLoginModal } from './UserLoginModal';

describe('UserLoginModal', () => {
  test('should correspond default layout', () => {
    const result = render(<UserLoginModal />);

    expect(result.container).toMatchSnapshot();
  });
});
