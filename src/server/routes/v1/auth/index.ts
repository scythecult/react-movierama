import { Router } from 'express';
import { ApiRoute } from '../../../../common/constants/routes';
import { CookieName } from '../../../lib/constants/cookies';
import { userService } from '../../../services/user';
import { AuthController } from './AuthController';

const auth = Router();

const authController = new AuthController(userService);

// TODO Temporary
auth.use((request, response, next) => {
  response.cookie(CookieName.AUTH_SESSION_ID, '19d7a0ba-ccb2-44a0-a03d-fb7b07666b08', { httpOnly: true, path: '/' });

  next();
});
auth.get(ApiRoute.ME, authController.get);
auth.post(ApiRoute.SIGN_IN, authController.signIn);
auth.post(ApiRoute.SIGN_UP, authController.signUp);

export { auth };
