import type { User } from '../../../common/types/user';

export class MockUserDb {
  #users: User[] = [];
  constructor(users: User[]) {
    this.#users = users;
  }

  async findMany() {
    return this.#users;
  }

  async findUnique(id: number) {
    return this.#users.find((item) => item.id === id);
  }

  async create(user: User) {
    return this.#users.push(user);
  }

  async update() {
    return this.#users;
  }
}
