import { Router } from 'express';
import { AppRoute } from '../../../../common/constants/routes';
import { userService } from '../../../services/user';
import { UsersController } from './UsersController';

const users = Router();

const usersController = new UsersController(userService);

users.get(AppRoute.ROOT, usersController.getUser);

export { users };
