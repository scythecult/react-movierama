import type { Meta, StoryFn } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../mocks/data/films';
import { FilmsList, type FilmsListProps } from './FilmsList';

export default {
  title: 'Components/FilmsList',
  args: {
    films: MOCK_FILMS.slice(0, 5),
    onFilmClick: () => {},
  },
  argTypes: {
    films: {
      table: {
        disable: true,
      },
    },
    onFilmClick: {
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
  component: FilmsList,
} satisfies Meta<typeof FilmsList>;

const Template: StoryFn<FilmsListProps> = (props) => (
  <BrowserRouter>
    <FilmsList {...props} />;
  </BrowserRouter>
);

export const Default = Template.bind(null);
