import { type QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MOCK_USER } from '../../../../../../mocks/data/user';
import { createTestQueryClient,TEST_EMPTY_USER } from '../../../../../tests/unit/helpers';
import { UserButton, type UserButtonProps } from './UserButton';

const signOutMock = vi.hoisted(() => vi.fn());

const getMeMock = vi.fn().mockResolvedValue(MOCK_USER);

vi.mock('../../../../entities/auth/api', () => ({
  authQueries: {
    getOne: () => ({
      queryKey: ['auth', 'one'],
      queryFn: getMeMock,
      initialData: TEST_EMPTY_USER,
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
    queryClient = createTestQueryClient();

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

    await within(result.container).findByRole('button', { name: /Алексей Иванов/ });

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = renderUserButton({ className: 'custom-class' });

    await within(result.container).findByRole('button', { name: /Алексей Иванов/ });

    expect(result.container).toMatchSnapshot();

    result = renderUserButton({ className: 'custom-class-2' });

    await within(result.container).findByRole('button', { name: /Алексей Иванов/ });

    expect(result.container).toMatchSnapshot();
  });

  test('should call signOut without arguments', async () => {
    const result = renderUserButton();

    await within(result.container).findByRole('button', { name: /Алексей Иванов/ });

    fireEvent.click(screen.getByRole('button', { name: /Алексей Иванов/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(signOutMock).toHaveBeenCalledWith();
  });
});
