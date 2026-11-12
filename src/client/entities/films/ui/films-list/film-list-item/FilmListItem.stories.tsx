import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideControls, withProviders } from '../../../../../../../.storybook/helpers';
import { MOCK_FILMS } from '../../../../../../../mocks/data/films';
import { FilmListItem } from './FilmListItem';

const meta = {
  title: 'Pages/MainPage/FilmListItem',
  component: FilmListItem,
  args: {
    film: MOCK_FILMS[0],
  },
  argTypes: hideControls('film'),
  decorators: [withProviders({ router: true })],
} satisfies Meta<typeof FilmListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
