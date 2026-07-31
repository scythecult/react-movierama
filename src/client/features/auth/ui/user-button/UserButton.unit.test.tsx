import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_USER } from '../../../../../../mocks/data/user';
import { UserButton, type UserButtonProps } from './UserButton';

const getMeMock = vi.fn().mockResolvedValue(MOCK_USER);

vi.mock('../../../../entities/auth/api', () => ({
  authQueries: {
    getOne: () => ({
      queryKey: ['auth', 'one'],
      queryFn: getMeMock,
      initialData: {
        id: 0,
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        wantsPromotions: false,
      },
    }),
  },
}));

vi.mock('../../model/auth.hooks', () => ({
  useSignIn: () => vi.fn(),
  useSignOut: () => vi.fn(),
}));

let queryClient: QueryClient;

const buildWrappedComponent = (props: UserButtonProps = {}) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserButton {...props} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('UserButton', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = render(buildWrappedComponent({ className: 'custom-class' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    result = render(buildWrappedComponent({ className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
