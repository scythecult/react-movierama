import type { Meta, StoryFn } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { enableMocks } from '../../../../../../mocks';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { FilmsQueryKey } from '../../api';
import { FilmsList, type FilmsListProps } from './FilmsList';

export default {
  title: 'Pages/MainPage/FilmsList',

  args: {
    onFilmClick: () => {},
  },

  argTypes: {
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

const queryClient = new QueryClient();

queryClient.setQueryData([FilmsQueryKey.all], { data: MOCK_FILMS });

// TODO Replace by: https://storybook.js.org/addons/msw-storybook-addon
enableMocks();

const Template: StoryFn<FilmsListProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <FilmsList {...props} />
    </BrowserRouter>
  </QueryClientProvider>
);

export const Default = Template.bind(null);
