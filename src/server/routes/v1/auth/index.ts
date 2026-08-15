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

// TODO Add tests for newly created modules

// TODO Start to use session
// const express = require('express');
// const session = require('express-session');

// const app = express();

// app.use(session({
//   secret: 'ваш_секретный_ключ',
//   resave: false,             // Не сохранять сессию, если она не менялась
//   saveUninitialized: false,  // Не создавать сессию для гостей без данных
//   rolling: true,             // ВАЖНО: обновляет куку при каждом запросе
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000, // Время жизни — 1 день в миллисекундах
//     httpOnly: true,              // Защита от XSS-атак
//     secure: false                // Поставьте true, если используете HTTPS
//   }
// }));

// // Имитация базы данных пользователей
// const users = [{ email: 'test@mail.com', passwordHash: '...' }];

// // 1. Маршрут для логина
// app.post('/login', (req, res) => {
//   // Тут должна быть проверка email и пароля из базы
//   const user = users[0];

//   // Записываем данные в сессию (создаем её)
//   req.session.userId = user.email;

//   res.send('Вы успешно вошли!');
// });

// // 2. Защищенный маршрут (проверка при повторном визите)
// app.get('/dashboard', (req, res) => {
//   // Если session-id валиден, Express сам наполнит объект req.session
//   if (req.session.userId) {
//     // Благодаря rolling: true, срок действия куки автоматически продлился на 1 день
//     res.send(`Добро пожаловать в личный кабинет, ${req.session.userId}!`);
//   } else {
//     res.status(401).send('Доступ запрещен. Войдите заново.');
//   }
// });

// app.listen(3000, () => console.log('Сервер запущен'));
