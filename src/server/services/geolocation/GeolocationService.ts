import type { GeolocationData } from '../../../common/types/geolocation';
import type { MockGeolocationDb } from '../../db/mocks/Geolocation';

export class GeolocationService {
  #db;

  constructor(db: MockGeolocationDb) {
    this.#db = db;
  }

  getOne = async () => {
    return await this.#db.findUnique();
  };

  update = async (geolocation: GeolocationData) => {
    return await this.#db.update(geolocation);
  };
}
