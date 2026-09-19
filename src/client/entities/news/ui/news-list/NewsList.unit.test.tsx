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

describe('NewsList', () => {
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

  const renderNews = (props: NewsListProps = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NewsList {...props} />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', () => {
    const result = renderNews();

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = renderNews({ className: 'custom-class' });

    expect(result.container).toMatchSnapshot();

    result = renderNews({ className: 'custom-class-v2' });

    expect(result.container).toMatchSnapshot();
  });
});
