import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { locationsQueries } from '../../../../entities/locations/api';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { SkeletonVariant } from '../../../../shared/ui/skeleton/constants';
import { Skeleton } from '../../../../shared/ui/skeleton/Skeleton';
import { LocationsModal } from '../locations-modal/LocationsModal';
import styles from './styles.module.css';

export const LocationsButton = () => {
  const {
    data: { id, name },
    isFetching,
  } = useQuery(locationsQueries.getOne());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locationName = id === -1 ? 'Choose Location' : name;

  return (
    <>
      <div className={styles.locationsButton}>
        {!isFetching && (
          <IconButton name={CustomIconName.PIN} onClick={() => setIsModalOpen(true)}>
            {locationName}
          </IconButton>
        )}

        {isFetching && <Skeleton variant={SkeletonVariant.RECT} width="100%" height="100%" />}
      </div>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          <LocationsModal />
        </ModalPortal>
      )}
    </>
  );
};
