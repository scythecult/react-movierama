import { Router } from 'express';
import { ApiRoute } from '../../../../common/constants/routes';
import { userService } from '../../../services/user';
import { AuthController } from './AuthController';

const auth = Router();

const authController = new AuthController(userService);

auth.get(ApiRoute.ME, authController.get);
auth.post(ApiRoute.SIGN_IN, authController.signIn);
auth.post(ApiRoute.SIGN_UP, authController.signUp);
auth.post(ApiRoute.SIGN_OUT, authController.signOut);

export { auth };
