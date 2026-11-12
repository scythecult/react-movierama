import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, hideControls, seedNews, withProviders } from '../../../../../../.storybook/helpers';
import { NewsList } from './NewsList';

const queryClient = createStoryQueryClient();
seedNews(queryClient);

const meta = {
  title: 'Pages/MainPage/NewsList',
  component: NewsList,
  argTypes: hideControls('className'),
  decorators: [withProviders({ queryClient, router: true })],
} satisfies Meta<typeof NewsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
