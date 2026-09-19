import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { FilmsList, type FilmsListProps } from './FilmsList';

const getFilmsMock = vi.fn().mockResolvedValue(MOCK_FILMS);

vi.mock('../../api', () => ({
  filmsQueries: {
    list: () => ({
      queryKey: ['films'],
      queryFn: getFilmsMock,
    }),
  },
}));

const DEFAULT_PROPS: FilmsListProps = {
  onFilmClick: () => {},
};

describe('FilmsList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a clean client before each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Disable retries to speed up tests
          retry: false,
        },
      },
    });
  });

  const renderFilmsList = (props: FilmsListProps = DEFAULT_PROPS) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FilmsList {...props} />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', async () => {
    const result = renderFilmsList();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    const result = renderFilmsList({ className: 'custom-class' });

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });

  test('should correspond loading layout', async () => {
    const result = renderFilmsList();

    expect(result.container).toMatchSnapshot();
  });

  test('should correspond error layout', async () => {
    getFilmsMock.mockResolvedValue([]);

    const result = renderFilmsList();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });
});
