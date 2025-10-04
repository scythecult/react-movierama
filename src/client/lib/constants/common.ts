export const STORED_MOVIE_KEY = 'movierama_saved_movie';

export const STORED_SEATS_KEY = 'movierama_saved_seats';

export const DEFAULT_CANVAS_WIDTH = 400;

export const DEFAULT_CANVAS_HEIGHT = 400;

export const DEFAULT_TICKET_TYPE_ID = 1;

export const SeatTypeMap = {
  REGULAR: 1,
  COMFORT: 2,
  VIP: 3,
  WHEELCHAIR: 4,
} as const;

export const SeatStateMap = {
  FREE: 1,
  OCCUPIED: 2,
  SELECTED: 3,
} as const;

export const SEAT_TYPE: Record<string, string> = {
  [SeatTypeMap.REGULAR]: 'regular',
  [SeatTypeMap.COMFORT]: 'comfort',
  [SeatTypeMap.VIP]: 'vip',
  [SeatTypeMap.WHEELCHAIR]: 'wheelchair',
} as const;

export const SEAT_STATE: Record<string, string> = {
  [SeatStateMap.FREE]: 'free',
  [SeatStateMap.OCCUPIED]: 'occupied',
  [SeatStateMap.SELECTED]: 'selected',
} as const;
