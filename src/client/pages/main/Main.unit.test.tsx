import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../mocks/data/films';
import { MOCK_NEWS } from '../../../../mocks/data/news';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { Main } from './Main';

const queryClient = new QueryClient();

const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../lib/api/films/hooks', () => ({
  useFilmsQuery: () => ({
    data: MOCK_FILMS,
  }),
}));

vi.mock('../../lib/api/news/hooks', () => ({
  useNewsQuery: () => ({
    data: MOCK_NEWS,
  }),
}));

describe('Main', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
