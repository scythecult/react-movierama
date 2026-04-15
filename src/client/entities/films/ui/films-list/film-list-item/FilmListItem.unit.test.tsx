import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../../mocks/data/films';
import { FilmListItem, type FilmListItemProps } from './FilmListItem';

const DEFAULT_PROPS: FilmListItemProps = {
  film: MOCK_FILMS[0],
  onClick: () => {},
};

const buildWrappedComponent = (props: FilmListItemProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <FilmListItem {...props} />
  </BrowserRouter>
);

describe('FilmListItem', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
