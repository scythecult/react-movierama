import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MOCK_USER } from '../../../../../../mocks/data/user';
import { UserButton, type UserButtonProps } from './UserButton';

const signOutMock = vi.hoisted(() => vi.fn());

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
  useSignOut: () => signOutMock,
}));

describe('UserButton', () => {
  let queryClient: QueryClient;
  let modalRoot: HTMLDivElement;

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

    modalRoot = document.createElement('div');
    modalRoot.id = 'modals';
    document.body.append(modalRoot);
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    modalRoot.remove();
    vi.restoreAllMocks();
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

  test('should support the "className" prop', async () => {
    let result = renderUserButton({ className: 'custom-class' });

    await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));

    expect(result.container).toMatchSnapshot();

    result = renderUserButton({ className: 'custom-class-2' });
    expect(result.container).toMatchSnapshot();
  });

  test('should call signOut without arguments', async () => {
    renderUserButton();

    await waitForElementToBeRemoved(() => screen.getByTestId('skeleton'));

    fireEvent.click(screen.getByRole('button', { name: /Алексей Иванов/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(signOutMock).toHaveBeenCalledWith();
  });
});
