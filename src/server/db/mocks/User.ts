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

  async findUnique(email: string, omitPassword = false) {
    const user = this.#users.find((item) => item.email === email);

    if (user && omitPassword) {
      // @ts-expect-error password is not returned to the client
      // use prisma omit in future
      delete user.password;
    }

    return user;
  }

  async findUniqueById(id: string, omitPassword = false) {
    const user = this.#users.find((item) => item.id === id);

    if (user && omitPassword) {
      // @ts-expect-error password is not returned to the client
      // use prisma omit in future
      delete user.password;
    }

    return user;
  }

  async create(user: User) {
    this.#users.push({ ...user, id: crypto.randomUUID() });

    const newUser = this.#users[this.#users.length - 1];

    // @ts-expect-error password is not returned to the client
    // use prisma omit in future
    delete newUser.password;

    return newUser;
  }

  async update() {
    return this.#users;
  }
}
