import { Link, Route, Routes } from 'react-router';
import { AppRoute } from '../../../common/constants/routes';
import { Film } from '../../pages/film';
import { Main } from '../../pages/main';
import { Order } from '../../pages/order';
import { Layout } from '../ui/layout/Layout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={`${AppRoute.FILMS}/:id`} element={<Film />} />
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
