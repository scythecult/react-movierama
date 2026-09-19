import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UserSignInRequest, UserSignOutRequest, UserSignUpRequest } from '../../../../common/entities/auth';
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
    const { session } = request;
    const { userId = '' } = session;

    const user = await this.#service.getOneById(userId);

    if (!user) {
      return response.status(StatusCodes.NO_CONTENT).end();
    }

    return response.status(StatusCodes.OK).json({ data: { user } });
  };

  signUp = async (request: TypedRequest<UserSignUpRequest>, response: Response) => {
    const { session, body } = request;
    const { userId = '' } = session;

    if (!userId) {
      const user = await this.#service.signUp(body);

      // TODO Possibly move?
      session.userId = user.id;

      return response.status(StatusCodes.CREATED).json({ data: { user } });
    }

    return response.status(StatusCodes.UNAUTHORIZED).json({ data: null });
  };

  signIn = async (request: TypedRequest<UserSignInRequest>, response: Response) => {
    const { session, body } = request;
    const { userId = '' } = session;
    const { email = '', password = '', isPersistent = false } = body;

    if (!userId) {
      const user = await this.#service.signIn(email, password);

      session.userId = user.id;
      session.isPersistent = isPersistent;

      return response.status(StatusCodes.OK).json({ data: user });
    }

    return response.status(StatusCodes.UNAUTHORIZED).json({ data: null });
  };

  signOut = async (request: TypedRequest<UserSignOutRequest>, response: Response) => {
    const { session } = request;
    const { userId = '' } = session;

    if (userId) {
      session.userId = '';
    }

    return response.status(StatusCodes.OK).json({ data: null });
  };
}
