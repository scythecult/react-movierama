import { useQuery } from '@tanstack/react-query';
import { locationsQueries } from '../../../../entities/locations/api';
import { LocationsList } from '../../../../entities/locations/ui';
import { useRenderModal } from '../../../../shared/lib/modal';
import { CustomIconName } from '../../../../shared/ui/custom-icon/constants';
import { IconButton } from '../../../../shared/ui/icon-button/IconButton';

export const LocationsButton = () => {
  const renderModal = useRenderModal();
  const { data: geolocation } = useQuery(locationsQueries.getOne());

  if (!geolocation) {
    return null;
  }

  const { name = 'Choose City' } = geolocation;

  return (
    <IconButton
      name={CustomIconName.PIN}
      onClick={() => {
        renderModal({
          renderHeader: () => <h3>Location</h3>,
          renderBody: () => <LocationsList />,
        });
      }}
    >
      {name}
    </IconButton>
  );
};
