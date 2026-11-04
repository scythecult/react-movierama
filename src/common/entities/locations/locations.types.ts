import type z from 'zod';
import type { locationSchema, setCurrentLocationSchema } from './locations.schema';

export type LocationData = z.infer<typeof locationSchema>;

export type LocationsResponse = {
  locations: LocationData[];
};

export type LocationResponse = {
  location: LocationData | null;
};

export type SetCurrentLocationRequest = z.infer<typeof setCurrentLocationSchema>;
