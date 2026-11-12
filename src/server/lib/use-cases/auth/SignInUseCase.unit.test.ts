import { buildUser, createSession } from '../../../../tests/unit/helpers';
import type { UserService } from '../../../services/user/UserService';
import { AlreadyAuthenticatedError, InvalidCredentialsError } from '../../errors/auth/AuthError';
import { comparePasswords } from '../../helpers/auth';
import { SignInUseCase } from './SignInUseCase';

vi.mock('../../helpers/auth', () => ({
  comparePasswords: vi.fn(),
  hashPassword: vi.fn(),
}));

describe('SignInUseCase', () => {
  const findByEmail = vi.fn();
  const findByPhone = vi.fn();
  const users = { findByEmail, findByPhone } as unknown as UserService;
  const useCase = new SignInUseCase(users);
  let session: ReturnType<typeof createSession>;

  beforeEach(() => {
    session = createSession();
    findByEmail.mockReset();
    findByPhone.mockReset();
    vi.mocked(comparePasswords).mockReset();
    vi.mocked(comparePasswords).mockResolvedValue(true);
  });

  test('should throw AlreadyAuthenticatedError when currentUserId is set', async () => {
    await expect(
      useCase.execute(
        {
          email: 'test@asd.asd',
          password: 'Asd12345',
          isPersistent: false,
          currentUserId: 'user-1',
        },
        session,
      ),
    ).rejects.toBeInstanceOf(AlreadyAuthenticatedError);

    expect(findByEmail).not.toHaveBeenCalled();
    expect(findByPhone).not.toHaveBeenCalled();
    expect(session.regenerate).not.toHaveBeenCalled();
    expect(session.setUser).not.toHaveBeenCalled();
  });

  test('should throw InvalidCredentialsError when email and phone are missing', async () => {
    await expect(
      useCase.execute(
        {
          password: 'Asd12345',
          isPersistent: false,
        },
        session,
      ),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(findByEmail).not.toHaveBeenCalled();
    expect(findByPhone).not.toHaveBeenCalled();
    expect(session.regenerate).not.toHaveBeenCalled();
  });

  test('should sign in by email when both email and phone are provided', async () => {
    const user = buildUser();
    findByEmail.mockResolvedValue(user);

    const result = await useCase.execute(
      {
        email: user.email,
        phone: user.phone,
        password: 'Asd12345',
        isPersistent: false,
      },
      session,
    );

    expect(findByEmail).toHaveBeenCalledWith(user.email);
    expect(findByPhone).not.toHaveBeenCalled();
    expect(comparePasswords).toHaveBeenCalledWith('Asd12345', user.password);
    expect(session.setUser).toHaveBeenCalledWith(user.id, false);
    expect(result).not.toHaveProperty('password');
  });

  test('should sign in by email and open a persistent session', async () => {
    const user = buildUser();
    findByEmail.mockResolvedValue(user);

    const result = await useCase.execute(
      {
        email: user.email,
        password: 'Asd12345',
        isPersistent: true,
      },
      session,
    );

    expect(findByEmail).toHaveBeenCalledWith(user.email);
    expect(findByPhone).not.toHaveBeenCalled();
    expect(comparePasswords).toHaveBeenCalledWith('Asd12345', user.password);
    expect(vi.mocked(comparePasswords)).toHaveBeenCalledBefore(session.regenerate);
    expect(session.regenerate).toHaveBeenCalledBefore(session.setUser);
    expect(session.setUser).toHaveBeenCalledWith(user.id, true);
    expect(result).toEqual({
      id: user.id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isLegalChecked: user.isLegalChecked,
      isPromoChecked: user.isPromoChecked,
    });
    expect(result).not.toHaveProperty('password');
  });

  test('should sign in by phone and open a session', async () => {
    const user = buildUser();
    findByPhone.mockResolvedValue(user);

    const result = await useCase.execute(
      {
        phone: user.phone,
        password: 'Asd12345',
        isPersistent: false,
      },
      session,
    );

    expect(findByPhone).toHaveBeenCalledWith(user.phone);
    expect(findByEmail).not.toHaveBeenCalled();
    expect(comparePasswords).toHaveBeenCalledWith('Asd12345', user.password);
    expect(session.regenerate).toHaveBeenCalledBefore(session.setUser);
    expect(session.setUser).toHaveBeenCalledWith(user.id, false);
    expect(result).not.toHaveProperty('password');
  });

  test('should throw InvalidCredentialsError when the user is not found', async () => {
    findByEmail.mockResolvedValue(undefined);

    await expect(
      useCase.execute(
        {
          email: 'missing@asd.asd',
          password: 'Asd12345',
          isPersistent: false,
        },
        session,
      ),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(comparePasswords).not.toHaveBeenCalled();
    expect(session.regenerate).not.toHaveBeenCalled();
    expect(session.setUser).not.toHaveBeenCalled();
  });

  test('should throw InvalidCredentialsError when the password is invalid', async () => {
    const user = buildUser();
    findByEmail.mockResolvedValue(user);
    vi.mocked(comparePasswords).mockResolvedValue(false);

    await expect(
      useCase.execute(
        {
          email: user.email,
          password: 'Wrong123',
          isPersistent: true,
        },
        session,
      ),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(comparePasswords).toHaveBeenCalledWith('Wrong123', user.password);
    expect(session.regenerate).not.toHaveBeenCalled();
    expect(session.setUser).not.toHaveBeenCalled();
  });
});
