import type { UserSignUpRequest } from '../../../../common/entities/auth';
import type { UserService } from '../../../services/user/UserService';
import type { User } from '../../entities/user/User';
import { AlreadyAuthenticatedError, AlreadyExistsError } from '../../errors/auth/AuthError';
import { hashPassword } from '../../helpers/auth';
import type { SessionStore } from '../../helpers/session';
import { SignUpUseCase } from './SignUpUseCase';

vi.mock('../../helpers/auth', () => ({
  comparePasswords: vi.fn(),
  hashPassword: vi.fn(),
}));

const signUpRequest: UserSignUpRequest = {
  phone: '123123123123',
  firstName: 'Alex',
  lastName: 'Ivanov',
  email: 'new@asd.asd',
  password: 'Asd12345',
  confirmPassword: 'Asd12345',
  isLegalChecked: true,
  isPromoChecked: false,
};

const createSession = () => {
  const session = {
    regenerate: vi.fn().mockResolvedValue(undefined),
    setUser: vi.fn(),
    destroy: vi.fn().mockResolvedValue(undefined),
  };

  return session satisfies SessionStore;
};

describe('SignUpUseCase', () => {
  const findByEmail = vi.fn();
  const create = vi.fn();
  const users = { findByEmail, create } as unknown as UserService;
  const useCase = new SignUpUseCase(users);
  let session: ReturnType<typeof createSession>;

  beforeEach(() => {
    session = createSession();
    findByEmail.mockReset();
    create.mockReset();
    vi.mocked(hashPassword).mockReset();
    vi.mocked(hashPassword).mockResolvedValue('hashed-password');
  });

  test('should throw AlreadyAuthenticatedError when currentUserId is set', async () => {
    await expect(
      useCase.execute(
        {
          user: signUpRequest,
          currentUserId: 'user-1',
        },
        session,
      ),
    ).rejects.toBeInstanceOf(AlreadyAuthenticatedError);

    expect(findByEmail).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
    expect(hashPassword).not.toHaveBeenCalled();
    expect(session.regenerate).not.toHaveBeenCalled();
    expect(session.setUser).not.toHaveBeenCalled();
  });

  test('should throw AlreadyExistsError when the email is already registered', async () => {
    findByEmail.mockResolvedValue({ id: 'user-1', email: signUpRequest.email });

    await expect(
      useCase.execute(
        {
          user: signUpRequest,
        },
        session,
      ),
    ).rejects.toBeInstanceOf(AlreadyExistsError);

    expect(findByEmail).toHaveBeenCalledWith(signUpRequest.email);
    expect(hashPassword).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
    expect(session.regenerate).not.toHaveBeenCalled();
    expect(session.setUser).not.toHaveBeenCalled();
  });

  test('should create a user, hash the password, and start a session', async () => {
    findByEmail.mockResolvedValue(undefined);
    create.mockImplementation(async (user: User) => ({
      ...user,
      id: 'user-1',
    }));

    const result = await useCase.execute(
      {
        user: signUpRequest,
      },
      session,
    );

    expect(findByEmail).toHaveBeenCalledWith(signUpRequest.email);
    expect(hashPassword).toHaveBeenCalledWith(signUpRequest.password);
    expect(vi.mocked(hashPassword)).toHaveBeenCalledBefore(create);
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: signUpRequest.email,
        password: 'hashed-password',
        phone: signUpRequest.phone,
        firstName: signUpRequest.firstName,
        lastName: signUpRequest.lastName,
        isLegalChecked: true,
        isPromoChecked: false,
      }),
    );
    expect(session.regenerate).toHaveBeenCalledBefore(session.setUser);
    expect(session.setUser).toHaveBeenCalledWith('user-1');
    expect(result).toEqual({
      id: 'user-1',
      phone: signUpRequest.phone,
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      email: signUpRequest.email,
      isLegalChecked: true,
      isPromoChecked: false,
    });
    expect(result).not.toHaveProperty('password');
  });
});
