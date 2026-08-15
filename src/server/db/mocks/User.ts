import type { UserData, UserSignUpRequest } from '../../../common/entities/auth';

export class MockUserDb {
  #users: UserData[] = [];
  constructor(users: UserData[]) {
    this.#users = users;
  }

  async findMany() {
    return this.#users;
  }

  async findUnique(id: string) {
    return this.#users.find((item) => item.id === id);
  }

  async create(user: UserSignUpRequest) {
    this.#users.push({ ...user, id: crypto.randomUUID() });

    return this.#users[this.#users.length - 1];
  }

  async update() {
    return this.#users;
  }
}
