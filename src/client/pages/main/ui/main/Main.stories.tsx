import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, seedFilms, seedNews, withProviders } from '../../../../../../.storybook/helpers';
import { Main } from './Main';

const queryClient = createStoryQueryClient();
seedFilms(queryClient);
seedNews(queryClient);

const meta = {
  title: 'Pages/MainPage/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withProviders({ queryClient, router: true })],
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
