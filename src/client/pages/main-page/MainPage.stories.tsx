import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { enableMocks } from '../../../../mocks';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { MainPage } from './MainPage';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

// TODO Temporary
// TODO Remove whole story?
const queryClient = new QueryClient();

enableMocks();
const Template: StoryFn = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <BrowserRouter>
        <MainPage {...props} />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
