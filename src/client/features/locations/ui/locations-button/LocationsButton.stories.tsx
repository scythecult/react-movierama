import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MOCK_LOCATIONS } from '../../../../../../mocks/data/locations';
import { AppStore } from '../../../../app/store/AppStore';
import { LocationsQueryKey } from '../../../../entities/locations/api';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { Modals } from '../../../../widgets/modals';
import { LocationsButton } from './LocationsButton';

export default {
  title: 'Components/LocationsButton',

  component: LocationsButton,

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LocationsButton>;

const queryClient = new QueryClient();

queryClient.setQueryData([LocationsQueryKey.all], { data: MOCK_LOCATIONS });

const Template: StoryFn = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider store={AppStore}>
      <Modals>
        <LocationsButton />
      </Modals>
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
