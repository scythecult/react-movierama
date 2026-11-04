import type { UserService } from '../../../services/user/UserService';
import { User } from '../../entities/user/User';
import { AlreadyAuthenticatedError, InvalidCredentialsError } from '../../errors/auth/AuthError';
import type { SessionStore } from '../../helpers/session';

type SignInCommand = {
  email?: string;
  phone?: string;
  password: string;
  isPersistent: boolean;
  currentUserId?: string;
};

export class SignInUseCase {
  #users: UserService;

  constructor(users: UserService) {
    this.#users = users;
  }

  async execute(command: SignInCommand, session: SessionStore) {
    if (command.currentUserId) {
      throw new AlreadyAuthenticatedError();
    }

    if (!command.email && !command.phone) {
      throw new InvalidCredentialsError();
    }

    let user;

    if (command.email) {
      user = await this.#users.findByEmail(command.email);
    } else if (command.phone) {
      user = await this.#users.findByPhone(command.phone);
    }

    const isPasswordValid = user ? await User.comparePasswords(command.password, user.password) : false;

    if (!user || !isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    await session.regenerate();
    session.setUser(user.id, command.isPersistent);

    return User.toPublicUser(user);
  }
}
