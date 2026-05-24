import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsList, type NewsListProps } from './NewsList';

vi.mock('../../api', () => ({
  newsQueries: {
    list: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      isLoading: false,
      data: MOCK_NEWS,
    })),
  };
});

const DEFAULT_PROPS: NewsListProps = {
  className: undefined,
};

const buildWrappedComponent = (props: NewsListProps = DEFAULT_PROPS) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NewsList {...props} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('NewsList', () => {
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
