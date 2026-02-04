import clsx from 'clsx';
import { useGeolocationMutation } from '../../api/geolocation/hooks';
import { useAppStore } from '../../contexts/app-store/useAppStore';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { List } from '../list/List';
import { LocationItem } from './location-item/LocationItem';
import styles from './styles.module.css';

export type LocationListProps = PropsWithClassName;

export const LocationList = (props: LocationListProps) => {
  const { className } = props;
  const geolocation = useAppStore((state) => state.location);
  const locations = useAppStore((state) => state.locations);
  const { mutate } = useGeolocationMutation();
  const { id } = geolocation;
  const classNameFinal = clsx(styles.locationList, className);

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
        <LocationItem
          key={locationItem.id}
          locationItem={locationItem}
          currentLocationId={id}
          onClick={handleLocationClick}
        />
      )}
      data-test-id="location-list"
    />
  );
};
