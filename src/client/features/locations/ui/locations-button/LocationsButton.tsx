import { useState } from 'react';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { ModalPortal } from '../../../../shared/ui/modal/Modal.portal';
import { SkeletonVariant } from '../../../../shared/ui/skeleton/constants';
import { Skeleton } from '../../../../shared/ui/skeleton/Skeleton';
import { useLocationCheck } from '../../model/locations.hooks';
import { LocationsModal } from '../locations-modal/LocationsModal';
import styles from './styles.module.css';

export const LocationsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { location, isResolving } = useLocationCheck();
  const locationName = !location || location.id <= 0 ? 'Choose Location' : location.name;

  return (
    <>
      <div className={styles.locationsButton}>
        {!isResolving && (
          <IconButton name={CustomIconName.PIN} onClick={() => setIsModalOpen(true)}>
            {locationName}
          </IconButton>
        )}

        {isResolving && <Skeleton variant={SkeletonVariant.RECT} width="100%" height="100%" />}
      </div>

      {isModalOpen && (
        <ModalPortal onClose={() => setIsModalOpen(false)}>
          <LocationsModal />
        </ModalPortal>
      )}
    </>
  );
};
