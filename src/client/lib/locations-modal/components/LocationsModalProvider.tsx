import { type PropsWithChildren } from 'react';
import { useModalState } from '../../hooks/useModalState';
import { LocationsModalContext } from './LocationsModalContext';

type LocationsModalProviderProps = PropsWithChildren;

export const LocationsModalProvider = (props: LocationsModalProviderProps) => {
  const { children } = props;
  const { isOpened, handleOpen, handleClose } = useModalState();

  return <LocationsModalContext value={{ isOpened, handleOpen, handleClose }}>{children}</LocationsModalContext>;
};
