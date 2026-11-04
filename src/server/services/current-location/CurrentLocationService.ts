import type { LocationData } from '../../../common/entities/locations';
import type { MockCurrentLocationDb } from '../../db/mocks/CurrentLocation';
import type { CurrentLocationRepository } from '../../lib/ports/current-location/CurrentLocationRepository';

export class CurrentLocationService implements CurrentLocationRepository {
  #db;

  constructor(db: MockCurrentLocationDb) {
    this.#db = db;
  }

  getOne = async () => {
    return await this.#db.findUnique();
  };

  update = async (location: LocationData) => {
    return await this.#db.update(location);
  };
}
