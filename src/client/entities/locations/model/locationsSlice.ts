import type { LocationsData } from './types';

type LocationsSliceState = {
  location: LocationsData;
  locations: LocationsData[];
};

type LocationsSliceActions = {
  setLocation: (location: LocationsData) => void;
};

export type LocationsSlice = LocationsSliceState & LocationsSliceActions;

export const createLocationsSlice: WithMiddlewareStateCreator<LocationsSlice> = (set) => ({
  location: {
    name: '',
    id: -1,
  },
  locations: [],

  setLocation: (location: LocationsData) => set(() => ({ location })),
});
