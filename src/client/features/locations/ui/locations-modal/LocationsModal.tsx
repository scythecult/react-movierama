import { ModalContent } from '../../../../shared/ui/modal-content/ModalContent';
import { LocationsList } from '../locations-list/LocationsList';

export const LocationsModal = () => {
  return <ModalContent header={<h3>Location</h3>} content={<LocationsList />} />;
};
