import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { FilmItem, type FilmItemProps } from './FilmItem';

const DEFAULT_PROPS: FilmItemProps = {
  film: MOCK_FILMS[0],
  onClick: () => {},
};

const buildWrappedComponent = (props: FilmItemProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <FilmItem {...props} />
  </BrowserRouter>
);

describe('FilmItem', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
