import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { Main } from './Main';

// vi.mock('../../../../entities/news/api/news.loaders', () => ({
//   getNews: vi.fn().mockResolvedValue(MOCK_NEWS),
// }));

// vi.mock('../../../../entities/films/api/films.loaders', () => ({
//   getFilms: vi.fn().mockResolvedValue(MOCK_FILMS),
// }));

const getNewsMock = vi.fn().mockResolvedValue(MOCK_NEWS);
const getFilmsMock = vi.fn().mockResolvedValue(MOCK_FILMS);

vi.mock('../../../../entities/news/api', () => ({
  newsQueries: {
    list: () => ({
      queryKey: ['news'],
      queryFn: getNewsMock,
    }),
  },
}));

vi.mock('../../../../entities/films/api', () => ({
  filmsQueries: {
    list: () => ({
      queryKey: ['films'],
      queryFn: getFilmsMock,
    }),
  },
}));

let queryClient: QueryClient;

const buildWrappedComponent = () => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Main', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });
});
