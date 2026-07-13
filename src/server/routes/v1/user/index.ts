import { Router } from 'express';
import { ApiRoute, AppRoute } from '../../../../common/constants/routes';
import { userService } from '../../../services/user';
import { UsersController } from './UsersController';

const users = Router();

const usersController = new UsersController(userService);

users.get(AppRoute.ROOT, usersController.getUser);
users.post(AppRoute.ROOT, usersController.createUser);
users.post(ApiRoute.SIGN_IN, usersController.signInUser);

export { users };
