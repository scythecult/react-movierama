import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserSignInRequest, UserSignOutRequest, UserSignUpRequest } from '../../../../common/entities/auth';
import { CookieName } from '../../../lib/constants/cookies';
import type { TypedRequest } from '../../../lib/types/request';
import type { UserService } from '../../../services/user/UserService';

// Авторизация по входу (sign in) обычно ищет пользователя по уникальному идентификатору вроде email или имени пользователя.
// Система сверяет хэш введенного пароля с сохраненным в базе. Если они равны, создается сессия или токен для доступа.
// Основной алгоритм
// Пользователь вводит логин (email) и пароль.
// Клиент отправляет POST-запрос на сервер.
// Сервер ищет запись в базе данных.
// Сервер проверяет правильность пароля.
// Сервер возвращает токен или ставит куку.
// По какому признаку ищут в базе
// Email (почта): Самый частый вариант, так как он уникален у каждого человека и его легко вспомнить.
// Username (никнейм): Используется на форумах, в играх или соцсетях, где реальная почта скрыта.
// Телефон: Популярен в мобильных приложениях и сервисах быстрой доставки, где вход идет по SMS или номеру.
// Проверка пароля
// База хранит не сам пароль, а его хэш (например, через алгоритм bcrypt или Argon2).
// Сервер берет введенный пароль, превращает его в хэш по тому же правилу.
// Сервер сравнивает новый хэш с тем, что лежал в базе.
// Что происходит после успеха
// Сервер создает сессию на бэкенде.
// Или сервер выдает клиенту JWT (JSON Web Token).
// Клиент сохраняет токен и передает его в заголовках для следующих запросов.

export class AuthController {
  #service;

  constructor(service: UserService) {
    this.#service = service;
  }

  get = async (request: Request, response: Response) => {
    const { cookies } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];

    // if (request.session.userId (email)) {
    // ищем в базе данных по email
    // вот этой хуйни с проверкой сессии и пользователя в разных ifах не должно быть

    if (!sessionId) {
      return response.status(StatusCodes.NO_CONTENT).json({ data: {} });
    }

    const user = await this.#service.getOne(sessionId);

    if (!user) {
      return response.status(StatusCodes.NO_CONTENT).json({ data: {} });
    }

    return response.status(StatusCodes.OK).json({ data: { user } });
  };

  signUp = async (request: TypedRequest<UserSignUpRequest>, response: Response) => {
    const { cookies, body } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];

    if (!sessionId) {
      const user = await this.#service.create(body);

      response.cookie(CookieName.AUTH_SESSION_ID, user.id, { httpOnly: true, path: '/' });
      return response.status(StatusCodes.CREATED).json({ data: { user } });
    }

    const existingUser = await this.#service.getOne(sessionId);
    const statusCode = existingUser ? StatusCodes.BAD_REQUEST : StatusCodes.UNAUTHORIZED;

    return response.status(statusCode).json({ data: null });
  };

  signIn = async (request: TypedRequest<UserSignInRequest>, response: Response) => {
    const { body, cookies } = request;

    // TODO Try find user by email and password??
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];
    const user = await this.#service.getOne(sessionId);
    const responseData = { user: user ? { ...user } : null };

    console.info({ body, responseData });
    return response.status(StatusCodes.OK).json({ data: responseData });
  };

  signOut = async (request: TypedRequest<UserSignOutRequest>, response: Response) => {
    const { body, cookies } = request;
    const sessionId = cookies[CookieName.AUTH_SESSION_ID];

    console.info({ body });
    if (sessionId) {
      // await this.#service.delete(sessionId);
    }

    response.clearCookie(CookieName.AUTH_SESSION_ID, { httpOnly: true, path: '/' });

    console.info(response.getHeaders());
    return response.status(StatusCodes.OK).json({ data: null });
  };
}
