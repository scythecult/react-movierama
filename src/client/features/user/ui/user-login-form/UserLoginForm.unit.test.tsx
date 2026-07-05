import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { UserLoginForm } from './UserLoginForm';

const buildWrappedComponent = () => (
  <BrowserRouter>
    <UserLoginForm />;
  </BrowserRouter>
);

describe('UserLoginForm', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result).toMatchSnapshot();
  });
});
