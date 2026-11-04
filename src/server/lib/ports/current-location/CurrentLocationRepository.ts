import type { LocationData } from '../../../../common/entities/locations';

export type CurrentLocationRepository = {
  getOne: () => Promise<LocationData | null>;
  update: (location: LocationData) => Promise<LocationData>;
};
