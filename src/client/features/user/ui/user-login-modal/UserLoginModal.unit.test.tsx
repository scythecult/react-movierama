import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { UserLoginModal } from './UserLoginModal';

const buildWrappedComponent = () => (
  <BrowserRouter>
    <UserLoginModal />;
  </BrowserRouter>
);

describe('UserLoginModal', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
