import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../mocks/data/news';
import { NewsList, type NewsListProps } from './NewsList';

const DEFAULT_PROPS: NewsListProps = {
  news: MOCK_NEWS,
  onNewsClick: vi.fn(),
};

const buildWrappedComponent = (props: NewsListProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <NewsList {...props} />
  </BrowserRouter>
);

describe('NewsList', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
