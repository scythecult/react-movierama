import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../../../mocks/data/films';
import { MOCK_NEWS } from '../../../../../../mocks/data/news';
import { Main } from './Main';

vi.mock('../../../../entities/films/api', () => ({
  useFilmsQuery: () => ({
    data: MOCK_FILMS,
    isLoading: false,
  }),
}));

vi.mock('../../../../entities/news/api', () => ({ useNewsQuery: () => ({ data: MOCK_NEWS, isLoading: false }) }));

const buildWrappedComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Main', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
