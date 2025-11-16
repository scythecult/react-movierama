import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MOCK_FILMS } from '../../../../mocks/data/films';
import { MOCK_NEWS } from '../../../../mocks/data/news';
import { MOCK_USER } from '../../../../mocks/data/user';
import { AppStoreProvider } from '../../lib/contexts/app-store/AppStoreProvider';
import { MainPage } from './MainPage';

const queryClient = new QueryClient();
const buildWrappedComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </AppStoreProvider>
  </QueryClientProvider>
);

vi.mock('../../lib/api/films/hooks', () => ({
  useFilmsQuery: () => ({
    data: { films: MOCK_FILMS },
  }),
}));

vi.mock('../../lib/api/user/hooks', () => ({
  useUserQuery: () => ({
    data: { user: MOCK_USER },
  }),
}));

vi.mock('../../lib/api/news/hooks', () => ({
  useNewsQuery: () => ({
    data: { news: MOCK_NEWS },
  }),
}));

describe('OrderPage', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });
});
