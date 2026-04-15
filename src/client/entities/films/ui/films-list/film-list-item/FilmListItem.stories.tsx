import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../../mocks/data/films';
import { FilmListItem, type FilmListItemProps } from './FilmListItem';

export default {
  title: 'Pages/MainPage/FilmListItem',

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

  component: FilmListItem,
} satisfies Meta<typeof FilmListItem>;

const Template: StoryFn<FilmListItemProps> = (props) => (
  <BrowserRouter>
    <FilmListItem {...props} />
  </BrowserRouter>
);

export const Default = Template.bind(null);
