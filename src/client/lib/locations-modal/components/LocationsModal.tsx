import { LocationList } from '../../components/location/LocationList';
import { Modal } from '../../components/modal/Modal';
import { useLocationsModalContext } from '../hooks/useLocationsModalContext';

export const LocationsModal = () => {
  const { isOpened, handleClose } = useLocationsModalContext();

  if (!isOpened) {
    return null;
  }

  return <Modal renderHeader={() => <h3>Location</h3>} renderBody={() => <LocationList />} onClose={handleClose} />;
};
