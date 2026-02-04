import clsx from 'clsx';
import type { LocationsData } from '../../../../../common/types/locations';
import styles from './styles.module.css';

export type LocationItemProps = {
  locationItem: LocationsData;
  currentLocationId: number;
  onClick: (id: number) => void;
};

export const LocationItem = (props: LocationItemProps) => {
  const { locationItem, currentLocationId, onClick } = props;
  const { id, name } = locationItem;

  return (
    <div className={styles.locationListItem} key={id} data-test-id="location-list-item">
      <button
        className={clsx(styles.locationButton, {
          [styles.locationButtonActive]: id === currentLocationId,
        })}
        onClick={() => onClick(id)}
      >
        {name}
      </button>
    </div>
  );
};
