import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls, withProviders } from '../../../../../../../.storybook/helpers';
import { MOCK_NEWS } from '../../../../../../../mocks/data/news';
import { NewsListItem } from './NewsListItem';

const meta = {
  title: 'Pages/MainPage/NewsListItem',
  component: NewsListItem,
  args: {
    newsItem: MOCK_NEWS[0],
  },
  argTypes: hideControls('newsItem'),
  decorators: [withProviders({ router: true })],
} satisfies Meta<typeof NewsListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
