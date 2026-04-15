import { LocationsList } from '../../../../entities/locations/ui';
import { useGetCommonModal } from '../../../../shared/lib/common-modal';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';
import { useAppStore } from '../../../../shared/zustand/useAppStore';

export const LocationsButton = () => {
  const getCommonModal = useGetCommonModal();
  const geolocation = useAppStore((state) => state.location);
  const locationTextFinal = geolocation?.name ? geolocation.name : 'Choose City';

  return (
    <IconButton
      name={CustomIconName.PIN}
      onClick={() => {
        getCommonModal({
          renderHeader: () => <h3>Location</h3>,
          renderBody: () => <LocationsList />,
        });
      }}
    >
      {locationTextFinal}
    </IconButton>
  );
};
