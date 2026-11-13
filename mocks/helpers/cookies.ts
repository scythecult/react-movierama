const DAY_SECONDS = 24 * 60 * 60;

export const SESSION_MAX_AGE = DAY_SECONDS;

export const PERSISTENT_MAX_AGE = 30 * DAY_SECONDS;

export const readCookie = (request: Request, name: string) => {
  const header = request.headers.get('cookie');

  if (!header) {
    return;
  }

  for (const part of header.split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=');

    if (rawName === name) {
      return decodeURIComponent(rawValue.join('='));
    }
  }
};

export const serializeCookie = (name: string, value: string, maxAge: number) =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;

export const clearCookie = (name: string) => `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;

export const withCookies = (response: Response, cookies: string[]) => {
  for (const cookie of cookies) {
    response.headers.append('Set-Cookie', cookie);
  }

  return response;
};
