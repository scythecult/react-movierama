import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { FilmsList, type FilmsListProps } from './FilmsList';

const DEFAULT_PROPS: FilmsListProps = {
  onFilmClick: () => {},
};

vi.mock('../../../../entities/films/api', () => ({
  useFilmsQuery: () => ({
    data: MOCK_FILMS,
    isLoading: false,
  }),
}));

const buildWrappedComponent = (props: FilmsListProps = DEFAULT_PROPS) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FilmsList {...props} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('FilmsList', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
