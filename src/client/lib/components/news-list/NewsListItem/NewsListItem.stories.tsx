import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsListItem, type NewsListItemProps } from './NewsListItem';

export default {
  title: 'Components/NewsListItem',

  args: {
    newsItem: MOCK_NEWS[0],
  },

  argTypes: {
    newsItem: {
      table: {
        disable: true,
      },
    },
  },

  component: NewsListItem,
} satisfies Meta<typeof NewsListItem>;

const Template: StoryFn<NewsListItemProps> = (props) => (
  <BrowserRouter>
    <NewsListItem {...props} />
  </BrowserRouter>
);

export const Default = Template.bind(null);
