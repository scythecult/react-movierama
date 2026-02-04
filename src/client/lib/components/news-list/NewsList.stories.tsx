import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../mocks/data/news';
import { NewsList, type NewsListProps } from './NewsList';

export default {
  title: 'Components/NewsList',

  args: {
    news: MOCK_NEWS,
    isLoading: false,
  },

  argTypes: {
    onNewsClick: {
      table: {
        disable: true,
      },
    },

    news: {
      table: {
        disable: true,
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },

  component: NewsList,
} satisfies Meta<typeof NewsList>;

const Template: StoryFn<NewsListProps> = (props) => (
  <BrowserRouter>
    <NewsList {...props} />;
  </BrowserRouter>
);

export const Default = Template.bind(null);
