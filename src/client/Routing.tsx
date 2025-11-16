import { Link, Route, Routes } from 'react-router';
import { AppRoute } from '../common/constants/routes';
import { Page } from './lib/components/page/Page';
import { FilmPage } from './pages/film-page/FilmPage';
import { MainPage } from './pages/main-page/MainPage';
import { OrderPage } from './pages/order-page/OrderPage';

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Page />}>
        <Route path={AppRoute.ROOT} element={<MainPage />} />
        <Route path={`${AppRoute.FILMS}/:id`} element={<FilmPage />} />
        <Route path={AppRoute.ORDER_PAGE}>
          <Route index element={<OrderPage />} />
          <Route
            path="checkout"
            element={
              <div>
                Checkout
                <p>
                  <Link to={AppRoute.ORDER_PAGE}>BACK</Link>
                </p>
              </div>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};
