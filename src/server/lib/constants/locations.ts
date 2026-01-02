export const CityToIdMap = {
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

export type CityToIdMapKey = keyof typeof CityToIdMap;
