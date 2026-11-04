import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { NewsList, type NewsListProps } from './NewsList';

const getNewsMock = vi.fn().mockResolvedValue(MOCK_NEWS);

vi.mock('../../api', () => ({
  newsQueries: {
    list: () => ({
      queryKey: ['news'],
      queryFn: getNewsMock,
    }),
  },
}));

describe('NewsList', () => {
  const renderNews = (props: NewsListProps = {}) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NewsList {...props} />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  test('should correspond default layout', async () => {
    const result = renderNews();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', async () => {
    let result = renderNews({ className: 'custom-class' });

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();

    result = renderNews({ className: 'custom-class-v2' });

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(result.container).toMatchSnapshot();
  });
});
