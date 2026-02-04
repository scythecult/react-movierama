import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { FilmItem, type FilmItemProps } from './FilmItem';

export default {
  title: 'Components/FilmItem',

  args: {
    film: MOCK_FILMS[0],
  },

  argTypes: {
    film: {
      table: {
        disable: true,
      },
    },
  },

  component: FilmItem,
} satisfies Meta<typeof FilmItem>;

const Template: StoryFn<FilmItemProps> = (props) => (
  <BrowserRouter>
    <FilmItem {...props} />;
  </BrowserRouter>
);

export const Default = Template.bind(null);
