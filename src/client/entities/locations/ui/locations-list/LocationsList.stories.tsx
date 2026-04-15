import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';
import { MOCK_GEOLOCATION } from '../../../../../../mocks/data/geolocation';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { queryClient } from '../../../../shared/api/queryClient';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { LocationsList, type LocationsListProps } from './LocationsList';

export default {
  title: 'Components/LocationsList',

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },

  component: LocationsList,
} satisfies Meta<typeof LocationsList>;

const initialState = {
  location: MOCK_GEOLOCATION,
  locations: MOCK_LOCATIONS,
};

const Template: StoryFn<LocationsListProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider initialState={initialState} store={AppStore}>
      <LocationsList {...props} />
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
