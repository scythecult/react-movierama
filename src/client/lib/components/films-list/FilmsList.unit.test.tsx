import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../mocks/data/films';
import { FilmsList, type FilmsListProps } from './FilmsList';

const DEFAULT_PROPS = {
  films: MOCK_FILMS,
  onFilmClick: () => {},
};

const buildWrappedComponent = (props: FilmsListProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <FilmsList {...props} />
  </BrowserRouter>
);

describe('FilmsList', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "films" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, films: [] }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, films: MOCK_FILMS }));

    expect(result.container).toMatchSnapshot();
  });
});
