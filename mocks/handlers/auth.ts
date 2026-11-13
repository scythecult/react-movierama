import { StatusCodes } from 'http-status-codes';
import { http } from 'msw';
import { ApiRoute, AppRoute } from '../../src/common/constants/routes';
import type { UserData, UserSignUpRequest } from '../../src/common/entities/auth';
import { signInSchema, signUpSchema } from '../../src/common/entities/auth';
import { User } from '../../src/server/lib/entities/user/User';
import { ErrorCode } from '../../src/server/lib/errors/CustomError';
import { withCookies } from '../helpers/cookies';
import { apiUrl, domainError, jsonData, readJsonBody } from '../helpers/http';
import { clearSessionCookie, currentUser, readSession, withSession } from '../helpers/session';
import { parseWithSchema } from '../helpers/validation';
import { mockApiStore } from '../state/store';

const invalidCredentials = () =>
  domainError(
    StatusCodes.UNAUTHORIZED,
    'Email, Phone or password is incorrect',
    ErrorCode.ERR_AUTH,
    'root.serverError',
  );

const alreadySignedIn = () =>
  domainError(StatusCodes.CONFLICT, 'Already signed in', ErrorCode.ERR_AUTH, 'root.serverError');

const toStoredUser = async (input: UserSignUpRequest): Promise<UserData> => {
  const entity = new User(input);

  await entity.hashPassword();

  return {
    id: crypto.randomUUID(),
    phone: entity.phone,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    password: entity.password,
    isLegalChecked: entity.isLegalChecked,
    isPromoChecked: entity.isPromoChecked,
  };
};

export const authHandlers = [
  http.get(apiUrl(`${AppRoute.AUTH}${ApiRoute.ME}`), ({ request }) => {
    return jsonData({
      user: currentUser(request),
    });
  }),

  http.post(apiUrl(`${AppRoute.AUTH}${ApiRoute.SIGN_IN}`), async ({ request }) => {
    const body = await readJsonBody(request);

    if (body instanceof Response) {
      return body;
    }

    const credentials = parseWithSchema(signInSchema, body);

    if (credentials instanceof Response) {
      return credentials;
    }

    if (readSession(request)?.userId) {
      return alreadySignedIn();
    }

    const user = credentials.email
      ? mockApiStore.findUserByEmail(credentials.email)
      : credentials.phone
        ? mockApiStore.findUserByPhone(credentials.phone)
        : undefined;
    const isPasswordValid = user ? await User.comparePasswords(credentials.password, user.password) : false;

    if (!user || !isPasswordValid) {
      return invalidCredentials();
    }

    return withSession(jsonData({ user: mockApiStore.toPublicUser(user) }), user, credentials.isPersistent ?? false);
  }),

  http.post(apiUrl(`${AppRoute.AUTH}${ApiRoute.SIGN_UP}`), async ({ request }) => {
    const body = await readJsonBody(request);

    if (body instanceof Response) {
      return body;
    }

    const registration = parseWithSchema(signUpSchema, body);

    if (registration instanceof Response) {
      return registration;
    }

    if (readSession(request)?.userId) {
      return alreadySignedIn();
    }

    if (mockApiStore.findUserByEmail(registration.email)) {
      return domainError(StatusCodes.CONFLICT, 'Already exists', ErrorCode.ERR_EXISTS, 'email');
    }

    const user = mockApiStore.addUser(await toStoredUser(registration));

    return withSession(jsonData({ user: mockApiStore.toPublicUser(user) }, StatusCodes.CREATED), user);
  }),

  http.post(apiUrl(`${AppRoute.AUTH}${ApiRoute.SIGN_OUT}`), () => {
    return withCookies(jsonData({ user: null }), [clearSessionCookie()]);
  }),
];
