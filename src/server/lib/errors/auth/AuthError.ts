import { CustomError } from '../CustomError';

export class AuthenticationError extends CustomError {}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email, Phone or password is incorrect');
  }
}

export class AlreadyAuthenticatedError extends Error {
  constructor() {
    super('Already signed in');
  }
}

export class AlreadyExistsError extends Error {
  constructor() {
    super('Already exists');
  }
}
