import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { UserLoginModal } from './UserLoginModal';

vi.mock('../../model/auth.hooks', () => ({
  useSignIn: () => vi.fn(),
}));

const buildWrappedComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserLoginModal />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('UserLoginModal', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
