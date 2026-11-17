import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ServerValidationError } from '../../../../shared/api/error/error';
import { UserSignUpForm } from './UserSignUpForm';

const SERVER_ERROR_MESSAGE = 'Email is already registered';

const signUpMock = vi.hoisted(() => vi.fn());

vi.mock('../../model/auth.hooks', () => ({
  useSignUp: () => ({
    mutateAsync: signUpMock,
  }),
}));

const fillValidDetails = () => {
  fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '1231231231' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@asd.asd' } });
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Alex' } });
  fireEvent.change(screen.getByPlaceholderText('Surname'), { target: { value: 'Ivanov' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Asd12345' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Asd12345' } });
};

describe('UserSignUpForm', () => {
  beforeEach(() => {
    signUpMock.mockReset();
  });

  test('should keep Register disabled until the form is valid', async () => {
    render(<UserSignUpForm />);

    const submitButton = screen.getByRole('button', { name: 'Register' });

    expect(submitButton.hasAttribute('disabled')).toBe(true);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });

    expect(await screen.findByText('Password must be at least 8 characters')).toBeTruthy();
    expect(submitButton.hasAttribute('disabled')).toBe(true);

    fillValidDetails();
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Asd12346' } });

    expect(await screen.findByText("Passwords don't match")).toBeTruthy();
    expect(submitButton.hasAttribute('disabled')).toBe(true);

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Asd12345' } });

    expect(submitButton.hasAttribute('disabled')).toBe(true);

    fireEvent.click(screen.getByRole('checkbox', { name: /terms and conditions/i }));

    await waitFor(() => {
      expect(submitButton.hasAttribute('disabled')).toBe(false);
    });
  });

  test('should register and notify the parent', async () => {
    const onSubmit = vi.fn();

    signUpMock.mockResolvedValue({});
    render(<UserSignUpForm onSubmit={onSubmit} />);

    fillValidDetails();
    fireEvent.click(screen.getByRole('checkbox', { name: /terms and conditions/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Register' }).hasAttribute('disabled')).toBe(false);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce();
    });

    expect(signUpMock).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '1231231231',
        email: 'test@asd.asd',
        firstName: 'Alex',
        lastName: 'Ivanov',
        password: 'Asd12345',
        confirmPassword: 'Asd12345',
        isLegalChecked: true,
      }),
    );
  });

  test('should show a server field error and stay on the form', async () => {
    const onSubmit = vi.fn();

    signUpMock.mockRejectedValueOnce(
      new ServerValidationError({
        email: SERVER_ERROR_MESSAGE,
      }),
    );

    render(<UserSignUpForm onSubmit={onSubmit} />);

    fillValidDetails();
    fireEvent.click(screen.getByRole('checkbox', { name: /terms and conditions/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Register' }).hasAttribute('disabled')).toBe(false);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(await screen.findByText(SERVER_ERROR_MESSAGE)).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
