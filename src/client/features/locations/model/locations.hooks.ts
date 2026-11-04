import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { locationsQueries } from '../../../entities/locations/api';
import { setCurrentLocation } from '../../../entities/locations/api/locations.actions';
import { useInvalidateCurrentLocation } from '../../../entities/locations/api/locations.hooks';
import { isSelectedLocation } from './locations.resolvers';

export const useChangeLocation = () => {
  const invalidateCurrentLocation = useInvalidateCurrentLocation();

  const locationMutation = useMutation({
    mutationFn: setCurrentLocation,
    onSuccess: () => invalidateCurrentLocation(),
  });

  return (locationId: number) => locationMutation.mutate(locationId);
};

export const useLocationCheck = () => {
  // 1. Current location request
  const { data, isSuccess, isFetching } = useQuery(locationsQueries.getCurrent());
  const isMissingLocation = isSuccess && !isSelectedLocation(data);

  // 2. Detection request (fires if current location is missing)
  const {
    data: detectData,
    isFetching: detectFetching,
    isSuccess: detectIsSuccess,
  } = useQuery({
    ...locationsQueries.detectCurrent(),
    enabled: isMissingLocation,
    staleTime: Infinity, // No re-render requests.
  });

  return {
    location: [data, detectData].find(isSelectedLocation) ?? null,
    isResolving: isFetching || detectFetching,
    isSuccess: isSuccess && (!isMissingLocation || detectIsSuccess),
  };
};
