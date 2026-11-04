import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { ServerValidationError } from '../../../../shared/api/error/error';
import { UserSignInForm } from './UserSignInForm';

const SERVER_ERROR_MESSAGE = 'Email, Phone or password is incorrect';

const signInMock = vi.hoisted(() => vi.fn());

vi.mock('../../model/auth.hooks', () => ({
  useSignIn: () => ({
    mutateAsync: signInMock,
  }),
}));

const buildWrappedComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserSignInForm />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('UserSignInForm', () => {
  beforeEach(() => {
    signInMock.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result).toMatchSnapshot();
  });

  test('should not show a server error by default', () => {
    render(buildWrappedComponent());

    expect(screen.queryByText(SERVER_ERROR_MESSAGE)).toBeNull();
  });

  test('should show a server error when sign in fails', async () => {
    signInMock.mockRejectedValueOnce(
      new ServerValidationError({
        'root.serverError': SERVER_ERROR_MESSAGE,
      }),
    );

    render(buildWrappedComponent());

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@asd.asd' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Asd12345' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Login' }).hasAttribute('disabled')).toBe(false);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText(SERVER_ERROR_MESSAGE)).toBeTruthy();
    });

    expect(signInMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@asd.asd',
        password: 'Asd12345',
        tab: 'Email',
      }),
    );
  });
});
