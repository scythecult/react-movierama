import type { UserService } from '../../../services/user/UserService';
import { User } from '../../entities/user/User';

export class GetCurrentUserUseCase {
  #users: UserService;

  constructor(users: UserService) {
    this.#users = users;
  }

  async execute(currentUserId?: string) {
    if (!currentUserId) {
      return null;
    }

    const user = await this.#users.getOneById(currentUserId);

    if (!user) {
      return null;
    }

    return User.toPublicUser(user);
  }
}
