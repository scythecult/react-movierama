export type GeolocationData = {
  id: number;
  name: string;
};

export type GeolocationResponse = {
  location: GeolocationData;
};

export type LocationsData = {
  id: number;
  name: string;
};

export type LocationsResponse = {
  locations: LocationsData[];
};
