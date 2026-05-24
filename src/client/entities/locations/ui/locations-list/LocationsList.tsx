import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { locationsQueries, useGeolocationMutation } from '../../../../entities/locations/api';
import { List } from '../../../../shared/ui/list/List';
import { LocationsItem } from './locations-item/LocationsItem';
import styles from './styles.module.css';

export type LocationsListProps = PropsWithClassName;

export const LocationsList = (props: LocationsListProps) => {
  const { className } = props;
  const classNameFinal = clsx(styles.locationsList, className);
  const { data: geolocation } = useQuery(locationsQueries.getOne());
  const { data: locations } = useQuery(locationsQueries.list());
  const { mutate } = useGeolocationMutation();

  if (!geolocation || !locations) {
    return null;
  }

  const { id } = geolocation;

  const handleLocationClick = (id: number) => {
    mutate(id);
  };

  return (
    <List
      className={classNameFinal}
      items={locations}
      renderItem={(locationItem) => (
        <LocationsItem
          key={locationItem.id}
          locationsItem={locationItem}
          currentLocationId={id}
          onClick={handleLocationClick}
        />
      )}
      data-test-id="location-list"
    />
  );
};
