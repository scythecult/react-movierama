import { CustomError } from '../CustomError';

export class HallplanError extends CustomError {}

export class HallplanNotFoundError extends Error {
  constructor(message = 'Hallplan not found') {
    super(message);
  }
}
