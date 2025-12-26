type Timeline = {
  hours: number;
  minutes: number;
};

type Format = {
  name: string;
  color: string;
};

type Sticker = {
  stickerType: 'text' | string;
  text: string;
  bgColor: string;
  outlineColor: string;
  textColor: string;
};

export type Film = {
  id: number;
  name: string;
  kind: 'film' | 'series' | string;
  genres: string[];
  rating: string;
  timeline: Timeline;
  plot: string;
  since: string;
  formats: Format[];
  pushkinCardEnabled: boolean;
  sticker: null | string;
  stickers: Sticker[];
  nameFiscal: string;
  ageCategory: string;
  poster: string;
};

export type FilmsResponse = {
  films: Film[];
};
