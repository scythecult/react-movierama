import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

describe('UserButton', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a clean client before each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Disable retries to speed up tests
          retry: false,
        },
      },
    });
  });

  const renderUserButton = (props: UserButtonProps = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <UserButton {...props} />
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', async () => {
    const result = renderUserButton();

    // Ждем, пока исчезнет лоадер. Это гарантирует, что данные загрузились и разметка обновилась
    await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));

    expect(result.container).toMatchSnapshot();
  });

  // test('should support the "className" prop', async () => {
  //   const result = renderUserButton({ className: 'custom-class' });

  //   await waitForElementToBeRemoved(() => screen.getByTestId('Loading...'));

  //   expect(result.container).toMatchSnapshot();
  // });

  // test('should support another "className" prop variant', async () => {
  //   const result = renderUserButton({ className: 'custom-class-v2' });

  //   await waitForElementToBeRemoved(() => screen.getByTestId('Loading...'));

  //   expect(result.container).toMatchSnapshot();
  // });
});
