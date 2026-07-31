import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { UserSignUpForm } from './UserSignUpForm';

vi.mock('../../model/auth.hooks', () => ({
  useSignUp: () => vi.fn(),
}));

const buildWrappedComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserSignUpForm />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('UserSignUpForm', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result).toMatchSnapshot();
  });
});
