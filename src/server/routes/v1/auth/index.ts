import { Router } from 'express';
import { ApiRoute } from '../../../../common/constants/routes';
import { signInSchema, signOutSchema, signUpSchema } from '../../../../common/entities/auth';
import { validationMiddlewareBuilder } from '../../../middleware/validation-middleware-builder/validationMiddlewareBuilder';
import { userService } from '../../../services/user';
import { AuthController } from './AuthController';

const auth = Router();

const authController = new AuthController(userService);

auth.get(ApiRoute.ME, authController.get);
auth.post(ApiRoute.SIGN_IN, validationMiddlewareBuilder({ body: signInSchema }), authController.signIn);
auth.post(ApiRoute.SIGN_UP, validationMiddlewareBuilder({ body: signUpSchema }), authController.signUp);
auth.post(ApiRoute.SIGN_OUT, validationMiddlewareBuilder({ body: signOutSchema }), authController.signOut);

export { auth };
