import { Router } from 'express';
import { ApiRoute } from '../../../../common/constants/routes';
import { signInSchema, signUpSchema } from '../../../../common/entities/auth';
import { GetCurrentUserUseCase } from '../../../lib/use-cases/auth/GetCurrentUserUseCase';
import { SignInUseCase } from '../../../lib/use-cases/auth/SignInUseCase';
import { SignUpUseCase } from '../../../lib/use-cases/auth/SignUpUseCase';
import { validationMiddlewareBuilder } from '../../../middleware/validation-middleware-builder/validationMiddlewareBuilder';
import { userService } from '../../../services/user';
import { AuthController } from './AuthController';

const auth = Router();

const authController = new AuthController({
  getCurrentUser: new GetCurrentUserUseCase(userService),
  signIn: new SignInUseCase(userService),
  signUp: new SignUpUseCase(userService),
});

auth.get(ApiRoute.ME, authController.get);
auth.post(ApiRoute.SIGN_IN, validationMiddlewareBuilder({ body: signInSchema }), authController.signIn);
auth.post(ApiRoute.SIGN_UP, validationMiddlewareBuilder({ body: signUpSchema }), authController.signUp);
auth.post(ApiRoute.SIGN_OUT, authController.signOut);

export { auth };
