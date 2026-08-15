import type { UserSignUpRequest } from '../../../common/entities/auth';
import type { MockUserDb } from '../../db/mocks/User';

export class UserService {
  #db;

  constructor(db: MockUserDb) {
    this.#db = db;
  }

  getOne = async (sessionId: string) => {
    return await this.#db.findUnique(sessionId);
  };

  create = async (user: UserSignUpRequest) => {
    return await this.#db.create(user);
  };
}
