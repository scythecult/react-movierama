import type { Meta, StoryObj } from '@storybook/react-vite';
import { createStoryQueryClient, hideControls, seedFilms, withProviders } from '../../../../../../.storybook/helpers';
import { FilmsList } from './FilmsList';

const queryClient = createStoryQueryClient();
seedFilms(queryClient);

const meta = {
  title: 'Pages/MainPage/FilmsList',
  component: FilmsList,
  args: {
    onFilmClick: () => {},
  },
  argTypes: hideControls('onFilmClick', 'className'),
  decorators: [withProviders({ queryClient, router: true })],
} satisfies Meta<typeof FilmsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
