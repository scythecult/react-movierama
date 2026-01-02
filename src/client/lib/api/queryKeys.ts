// TODO Read about query keys semantic-naming
// TODO Use AppRoute.key as query key

export const MainPageQueryKey = {
  all: ['mainPage'] as const,

  films: () => [MainPageQueryKey.all, 'films'] as const,

  user: () => [MainPageQueryKey.all, 'user'] as const,

  news: () => [MainPageQueryKey.all, 'news'] as const,

  location: () => [MainPageQueryKey.all, 'location'] as const,

  geolocation: () => [MainPageQueryKey.all, 'geolocation'] as const,

  locations: () => [MainPageQueryKey.all, 'locations'] as const,
};

export const OrderPageQueryKey = {
  all: ['orderPage'] as const,

  canvas: () => [OrderPageQueryKey.all, 'canvas'] as const,

  seats: () => [OrderPageQueryKey.all, 'seats'] as const,

  seatTypes: () => [OrderPageQueryKey.all, 'seatTypes'] as const,
};
