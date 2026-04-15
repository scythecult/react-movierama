import type { UserData } from '../../../client/entities/user';

export class MockUserDb {
  #users: UserData[] = [];
  constructor(users: UserData[]) {
    this.#users = users;
  }

  async findMany() {
    return this.#users;
  }

  async findUnique(id: number) {
    return this.#users.find((item) => item.id === id);
  }

  async create(user: UserData) {
    return this.#users.push(user);
  }

  async update() {
    return this.#users;
  }
}
