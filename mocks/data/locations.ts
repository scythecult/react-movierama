import type { LocationData } from '../../src/common/types/location';

export const MOCK_CITY_TO_ID_MAP = {
  Yaroslavl: 20,
  Moscow: 1,
  Astrakhan: 23,
  Vladivostok: 30,
  Vladimir: 3,
  Volgograd: 5,
  Ekaterinburg: 6,
  Izhevsk: 21,
  Irkutsk: 29,
  Kazan: 7,
  Krasnodar: 8,
  Krasnoyarsk: 9,
  Perm: 10,
} as const;

export type MockCityToIdMapKey = keyof typeof MOCK_CITY_TO_ID_MAP;

export const MOCK_CURRENT_LOCATION = {
  location: {
    id: -1,
    name: '',
  },
  setLocation(location: LocationData) {
    this.location = location;
  },

  getLocation() {
    return this.location;
  },
};

export const MOCK_LOCATIONS = [
  {
    id: 1,
    name: 'Москва и МО',
  },
  {
    id: 23,
    name: 'Астрахань',
  },
  {
    id: 30,
    name: 'Владивосток',
  },
  {
    id: 3,
    name: 'Владимир',
  },
  {
    id: 5,
    name: 'Волгоград',
  },
  {
    id: 25,
    name: 'Волжский',
  },
  {
    id: 6,
    name: 'Екатеринбург',
  },
  {
    id: 21,
    name: 'Ижевск',
  },
  {
    id: 29,
    name: 'Иркутск',
  },
  {
    id: 7,
    name: 'Казань',
  },
  {
    id: 18,
    name: 'Красноярск',
  },
  {
    id: 28,
    name: 'Липецк',
  },
  {
    id: 9,
    name: 'Пермь',
  },
  {
    id: 10,
    name: 'Ростов-на-Дону',
  },
  {
    id: 24,
    name: 'Рязань',
  },
  {
    id: 27,
    name: 'Самара',
  },
  {
    id: 13,
    name: 'Тамбов',
  },
  {
    id: 16,
    name: 'Томск',
  },
  {
    id: 11,
    name: 'Тюмень',
  },
  {
    id: 26,
    name: 'Уфа',
  },
  {
    id: 12,
    name: 'Челябинск',
  },
  {
    id: 20,
    name: 'Ярославль',
  },
];
