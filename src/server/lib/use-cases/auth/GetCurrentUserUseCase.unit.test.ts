import type { UserData } from '../../../../common/entities/auth';
import type { UserService } from '../../../services/user/UserService';
import { GetCurrentUserUseCase } from './GetCurrentUserUseCase';

const buildUser = (): UserData => ({
  id: 'user-1',
  phone: '123123123123',
  firstName: 'Alex',
  lastName: 'Ivanov',
  email: 'test@asd.asd',
  password: 'hashed-password',
  isLegalChecked: true,
  isPromoChecked: false,
});

describe('GetCurrentUserUseCase', () => {
  const getOneById = vi.fn();
  const users = { getOneById } as unknown as UserService;
  const useCase = new GetCurrentUserUseCase(users);

  beforeEach(() => {
    getOneById.mockReset();
  });

  test('should return null without reading storage when user id is missing', async () => {
    await expect(useCase.execute()).resolves.toBeNull();
    await expect(useCase.execute('')).resolves.toBeNull();

    expect(getOneById).not.toHaveBeenCalled();
  });

  test('should return null when the user is not found', async () => {
    getOneById.mockResolvedValue(undefined);

    await expect(useCase.execute('missing')).resolves.toBeNull();

    expect(getOneById).toHaveBeenCalledWith('missing');
  });

  test('should return the user without a password', async () => {
    const user = buildUser();
    getOneById.mockResolvedValue(user);

    await expect(useCase.execute(user.id)).resolves.toEqual({
      id: user.id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isLegalChecked: user.isLegalChecked,
      isPromoChecked: user.isPromoChecked,
    });

    expect(getOneById).toHaveBeenCalledWith(user.id);
  });
});
