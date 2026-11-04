import type { LocationData } from '../../../../common/entities/locations';

export type LocationRepository = {
  getAll: () => Promise<LocationData[]>;
  getOne: (id: number) => Promise<LocationData | undefined>;
  findByCityName: (cityName: string) => Promise<LocationData | undefined>;
};
