import clsx from 'clsx';
import type { LocationData } from '../../../../common/types/location';
import type { LocationsData } from '../../../../common/types/locations';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export type LocationListProps = PropsWithClassName<{
  currentLocation: LocationData;
  locations: LocationsData[];
  onClick: (id: number) => void;
}>;

export const LocationList = (props: LocationListProps) => {
  const { className, locations, currentLocation, onClick } = props;
  const { id: currentLocationId } = currentLocation;
  const classNameFinal = clsx(styles.locationList, className);

  return (
    <ul className={classNameFinal}>
      {locations.map(({ id, name }) => (
        <li className={styles.locationListItem} key={id} data-test-id="location-list-item">
          <button
            className={clsx(styles.locationButton, { [styles.locationButtonActive]: id === currentLocationId })}
            onClick={() => onClick(id)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};
