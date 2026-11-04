import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { locationsQueries } from '../../../../entities/locations/api';
import { List } from '../../../../shared/ui/list/List';
import { useChangeLocation } from '../../model/locations.hooks';
import { LocationsItem } from './locations-item/LocationsItem';
import styles from './styles.module.css';

export type LocationsListProps = PropsWithClassName;

export const LocationsList = (props: LocationsListProps) => {
  const { className } = props;
  const classNameFinal = clsx(styles.locationsList, className);
  const { data: currentLocation } = useQuery(locationsQueries.getCurrent());
  const { data: locations } = useQuery(locationsQueries.list());
  const changeLocation = useChangeLocation();
  const currentLocationId = currentLocation?.id ?? 0;

  const handleLocationClick = (id: number) => changeLocation(id);

  return (
    <List
      className={classNameFinal}
      items={locations}
      renderItem={(location) => (
        <LocationsItem
          key={location.id}
          location={location}
          currentLocationId={currentLocationId}
          onClick={handleLocationClick}
        />
      )}
      data-test-id="location-list"
    />
  );
};
