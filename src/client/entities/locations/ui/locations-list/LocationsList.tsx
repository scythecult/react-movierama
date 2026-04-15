import clsx from 'clsx';
import { useGeolocationMutation } from '../../../../entities/locations/api';
import { List } from '../../../../shared/ui/list/List';
import { useAppStore } from '../../../../shared/zustand/useAppStore';
import { LocationsItem } from './locations-item/LocationsItem';
import styles from './styles.module.css';

export type LocationsListProps = PropsWithClassName;

export const LocationsList = (props: LocationsListProps) => {
  // TODO Mb should move data fetching to component
  const { className } = props;
  const geolocation = useAppStore((state) => state.location);
  const locations = useAppStore((state) => state.locations);
  const { mutate } = useGeolocationMutation();
  const { id } = geolocation;
  const classNameFinal = clsx(styles.locationsList, className);

  // TODO Think about data fetching/updating strategy
  // Should we invalidate data "in place" on mutation?
  // Or should store updated data in zustand in onSuccess mutation handler?

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
