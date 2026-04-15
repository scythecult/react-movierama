import clsx from 'clsx';
import type { LocationsData } from '../../../../../entities/locations/model';
import styles from './styles.module.css';

export type LocationsItemProps = {
  locationsItem: LocationsData;
  currentLocationId: number;
  onClick: (id: number) => void;
};

export const LocationsItem = (props: LocationsItemProps) => {
  const { locationsItem, currentLocationId, onClick } = props;
  const { id, name } = locationsItem;

  return (
    <div className={styles.locationsListItem} key={id} data-test-id="location-list-item">
      <button
        className={clsx(styles.locationsButton, {
          [styles.locationsButtonActive]: id === currentLocationId,
        })}
        onClick={() => onClick(id)}
      >
        {name}
      </button>
    </div>
  );
};
