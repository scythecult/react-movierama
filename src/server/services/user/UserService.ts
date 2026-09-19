import { StatusCodes } from 'http-status-codes';
import type { UserSignUpRequest } from '../../../common/entities/auth';
import type { MockUserDb } from '../../db/mocks/User';
import { ErrorCode } from '../../lib/constants/error';
import { User } from '../../lib/entities/user/User';
import { AuthenticationError } from '../../lib/errors/AuthError';

export class UserService {
  #db;

  constructor(db: MockUserDb) {
    this.#db = db;
  }

  getOneById = async (id: string) => {
    return await this.#db.findUniqueById(id, true);
  };

  signIn = async (email: string, password: string) => {
    const user = await this.#db.findUnique(email);

    if (!user) {
      throw new AuthenticationError({
        statusCode: StatusCodes.UNAUTHORIZED,
        // We are intentionally responding with the general message
        message: 'Email or password is incorrect',
        code: ErrorCode.ERR_AUTH,
        cause: 'email',
      });
    }

    const isPasswordValid = await User.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError({
        statusCode: StatusCodes.UNAUTHORIZED,
        // We are intentionally responding with the general message
        message: 'Email or password is incorrect',
        code: ErrorCode.ERR_AUTH,
        cause: 'email',
      });
    }

    return user;
  };

  signUp = async (user: UserSignUpRequest) => {
    const userEntity = new User(user);

    await userEntity.hashPassword();

    return await this.#db.create(userEntity.getAsDto());
  };

  getAll = async () => {
    return await this.#db.findMany();
  };
}
