import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { MOCK_LOCATIONS } from '../../../../../mocks/data/locations';
import { AppStore } from '../../../app/store/AppStore';
import { LocationsQueryKey } from '../../../entities/locations/api';
import { AppStoreProvider } from '../../../shared/zustand/AppStoreProvider';
import { Modals } from '../../modals';
import { Header, type HeaderProps } from './Header';

export default {
  title: 'Components/Header',

  component: Header,

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

const queryClient = new QueryClient();

queryClient.setQueryData([LocationsQueryKey.all], { data: MOCK_LOCATIONS });

const Template: StoryFn<HeaderProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider store={AppStore}>
      <Modals>
        <BrowserRouter>
          <Header {...props} />;
        </BrowserRouter>
      </Modals>
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
Default.args = {};
