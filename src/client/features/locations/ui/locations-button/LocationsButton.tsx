import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { locationsQueries } from '../../../../entities/locations/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { LocationsModal } from '../locations-modal/LocationsModal';

export const LocationsButton = () => {
  const { data: geolocation } = useQuery(locationsQueries.getOne());
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!geolocation?.name) {
    return null;
  }

  const { name = 'Choose City' } = geolocation;

  return (
    <>
      <IconButton name={CustomIconName.PIN} onClick={() => setIsModalOpen(true)}>
        {name}
      </IconButton>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          <LocationsModal />
        </ModalPortal>
      )}
    </>
  );
};
