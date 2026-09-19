import session from 'express-session';

export const sessionMiddleware = () =>
  session({
    secret: 'ваш_секретный_ключ',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  });
