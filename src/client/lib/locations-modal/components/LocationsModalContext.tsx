import { createContext } from 'react';

type LocationsModalContext = {
  isOpened: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const LocationsModalContext = createContext<LocationsModalContext | null>(null);
