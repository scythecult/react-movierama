import type { UserData } from '../../../common/entities/auth';
import type { User } from '../../lib/entities/user/User';

export class MockUserDb {
  #users: UserData[] = [];
  constructor(users: UserData[]) {
    this.#users = users;
  }

  async findMany() {
    return this.#users;
  }

  async findUnique(email: string) {
    return this.#users.find((item) => item.email === email);
  }

  async findUniqueByPhone(phone: string) {
    return this.#users.find((item) => item.phone === phone);
  }

  async findUniqueById(id: string) {
    return this.#users.find((item) => item.id === id);
  }

  async create(user: User) {
    this.#users.push({ ...user, id: crypto.randomUUID() });

    return this.#users[this.#users.length - 1];
  }

  async update() {
    return this.#users;
  }
}
