import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { enableMocks } from '../../../../../../mocks';
import { AppStore } from '../../../../app/store/AppStore';
import { queryClient } from '../../../../shared/api/queryClient';
import { AppStoreProvider } from '../../../../shared/zustand/AppStoreProvider';
import { Main } from './Main';

export default {
  title: 'Pages/MainPage/Main',

  component: Main,

  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

// TODO Temporary
// TODO Remove whole story?

enableMocks();
const Template: StoryFn = (props) => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider store={AppStore}>
      <BrowserRouter>
        <Main {...props} />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
