import type { Request, Response } from 'express';

export type SessionStore = {
  regenerate(): Promise<void>;
  setUser(userId: string, isPersistent?: boolean): void;
  destroy(): Promise<void>;
};

const SESSION_COOKIE_NAME = 'connect.sid';
const PERSISTENT_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export class ExpressSessionStore implements SessionStore {
  #request;
  #response;

  constructor(request: Request, response: Response) {
    this.#request = request;
    this.#response = response;
  }

  regenerate() {
    return new Promise<void>((resolve, reject) => {
      this.#request.session.regenerate((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  setUser(userId: string, isPersistent = false) {
    const { session } = this.#request;

    session.userId = userId;
    session.isPersistent = isPersistent;

    if (isPersistent) {
      session.cookie.maxAge = PERSISTENT_MAX_AGE;
    }
  }

  destroy() {
    return new Promise<void>((resolve, reject) => {
      this.#request.session.destroy((error) => {
        if (error) {
          reject(error);
          return;
        }

        this.#response.clearCookie(SESSION_COOKIE_NAME, { path: '/', httpOnly: true });
        resolve();
      });
    });
  }
}
