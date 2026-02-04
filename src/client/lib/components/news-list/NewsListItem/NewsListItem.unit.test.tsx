import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsListItem, type NewsListItemProps } from './NewsListItem';

const DEFAULT_PROPS: NewsListItemProps = {
  newsItem: MOCK_NEWS[0],
};

const buildWrappedComponent = (props: NewsListItemProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <NewsListItem {...props} />
  </BrowserRouter>
);

describe('NewsListItem', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
