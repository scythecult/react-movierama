import { Link, Route, Routes } from 'react-router';
import { AppRoute } from '../common/constants/routes';
import { Page } from './lib/components/page/Page';
import { FilmPage } from './pages/film/Film';
import { Main } from './pages/main/Main';
import { Order } from './pages/order/Order';

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Page />}>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={`${AppRoute.FILMS}/:id`} element={<FilmPage />} />
        <Route path={AppRoute.ORDER}>
          <Route index element={<Order />} />
          <Route
            path="checkout"
            element={
              <div>
                Checkout
                <p>
                  <Link to={AppRoute.ORDER}>BACK</Link>
                </p>
              </div>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};
