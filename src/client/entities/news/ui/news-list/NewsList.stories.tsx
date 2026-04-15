import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { enableMocks } from '../../../../../../mocks';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsQueryKey } from '../../api';
import { NewsList, type NewsListProps } from './NewsList';

export default {
  title: 'Pages/MainPage/NewsList',

  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },

  component: NewsList,
} satisfies Meta<typeof NewsList>;

const queryClient = new QueryClient();

queryClient.setQueryData([NewsQueryKey.all], { data: MOCK_NEWS });

enableMocks();

const Template: StoryFn<NewsListProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NewsList {...props} />
    </BrowserRouter>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
