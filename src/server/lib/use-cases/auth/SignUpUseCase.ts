import type { UserSignUpRequest } from '../../../../common/entities/auth';
import type { UserService } from '../../../services/user/UserService';
import { User } from '../../entities/user/User';
import { AlreadyAuthenticatedError, AlreadyExistsError } from '../../errors/auth/AuthError';
import type { SessionStore } from '../../helpers/session';

type SignUpCommand = {
  user: UserSignUpRequest;
  currentUserId?: string;
};

export class SignUpUseCase {
  #users: UserService;

  constructor(users: UserService) {
    this.#users = users;
  }

  async execute(command: SignUpCommand, session: SessionStore) {
    if (command.currentUserId) {
      throw new AlreadyAuthenticatedError();
    }

    // TODO Logic below is DB responsibility
    const isUserExists = await this.#users.findByEmail(command.user.email);

    if (isUserExists) {
      throw new AlreadyExistsError();
    }

    const userEntity = new User(command.user);
    await userEntity.hashPassword();

    const user = await this.#users.create(userEntity.getAsDto());

    await session.regenerate();
    session.setUser(user.id);

    return User.toPublicUser(user);
  }
}
