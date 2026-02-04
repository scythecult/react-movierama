import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../mocks/data/news';
import { NewsList, type NewsListProps } from './NewsList';

const DEFAULT_PROPS: NewsListProps = {
  news: MOCK_NEWS,
  isLoading: false,
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

  test('should support the "news" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, news: [] }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, news: MOCK_NEWS }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "isLoading" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, isLoading: true }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, isLoading: false }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
