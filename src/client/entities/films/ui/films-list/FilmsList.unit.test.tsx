import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
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

let queryClient: QueryClient;

const buildWrappedComponent = (props: FilmsListProps = DEFAULT_PROPS) => {
  queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FilmsList {...props} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('FilmsList', () => {
  test('should correspond default layout', async () => {
    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });

  test('should correspond loading layout', async () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should correspond error layout', async () => {
    getFilmsMock.mockResolvedValue([]);

    const result = render(buildWrappedComponent());

    await waitFor(() => {
      expect(queryClient.isFetching()).toBe(0);
    });

    expect(result.container).toMatchSnapshot();
  });
});
