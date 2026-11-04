import { CustomError } from '../CustomError';

export class LocationError extends CustomError {}

export class LocationNotFoundError extends Error {
  constructor() {
    super('Location not found');
  }
}
