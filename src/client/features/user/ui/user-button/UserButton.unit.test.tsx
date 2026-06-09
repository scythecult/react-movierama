import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { MOCK_USER } from '../../../../../../mocks/data/user';
import { UserButton, type UserButtonProps } from './UserButton';

const getUserMock = vi.fn().mockResolvedValue(MOCK_USER);

vi.mock('../../../../entities/user/api', () => ({
  userQueries: {
    getOne: () => ({
      queryKey: ['user', 'one'],
      queryFn: getUserMock,
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

let queryClient: QueryClient;

const buildWrappedComponent = (props: UserButtonProps = {}) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserButton {...props} />
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
