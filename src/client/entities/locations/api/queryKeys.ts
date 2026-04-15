export const LocationsQueryKey = {
  all: ['locations'] as const,

  locations: () => [LocationsQueryKey.all] as const,

  location: () => [LocationsQueryKey.all, 'location'] as const,

  geolocation: () => [LocationsQueryKey.all, 'geolocation'] as const,
};
