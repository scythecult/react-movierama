import { mockUserDb } from '../../db/mocks';
import { UserService } from './UserService';

export const userService = new UserService(mockUserDb);
