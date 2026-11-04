import type { UserData } from '../../../../common/entities/auth';
import type { User } from '../../entities/user/User';

export type UserRepository = {
  findByEmail: (email: string) => Promise<UserData | undefined>;
  findByPhone: (phone: string) => Promise<UserData | undefined>;
  getOneById: (id: string) => Promise<UserData | undefined>;
  create: (user: User) => Promise<UserData>;
};
