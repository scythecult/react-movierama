import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { locationsQueries } from '../../../../entities/locations/api';
import { AppStoreProvider } from '../../../../shared/lib/store';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

queryClient.setQueryData(locationsQueries.getCurrent().queryKey, MOCK_LOCATIONS[0]);
queryClient.setQueryData(locationsQueries.list().queryKey, MOCK_LOCATIONS);

const Template: StoryFn<LocationsListProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider store={AppStore}>
      <LocationsList {...props} />
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
