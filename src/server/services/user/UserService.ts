import type { MockUserDb } from '../../db/mocks/User';
import type { User } from '../../lib/entities/user/User';
import type { UserRepository } from '../../lib/ports/user/UserRepository';

export class UserService implements UserRepository {
  #db;

  constructor(db: MockUserDb) {
    this.#db = db;
  }

  findByEmail = async (email: string) => {
    return await this.#db.findUnique(email);
  };

  findByPhone = async (phone: string) => {
    return await this.#db.findUniqueByPhone(phone);
  };

  getOneById = async (id: string) => {
    return await this.#db.findUniqueById(id);
  };

  create = async (user: User) => {
    return await this.#db.create(user);
  };
}
