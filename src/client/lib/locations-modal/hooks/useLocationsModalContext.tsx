import { useContext } from 'react';
import { LocationsModalContext } from '../components/LocationsModalContext';

export const useLocationsModalContext = () => {
  const context = useContext(LocationsModalContext);

  if (!context) {
    throw new Error('useLocationsModal must be used within a LocationsModalProvider');
  }

  return { ...context };
};
