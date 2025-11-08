import { Link, Route, Routes } from 'react-router';
import { AppRoute } from '../common/constants/routes';
import { OrderPage } from './pages/order-page/OrderPage';

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={AppRoute.ROOT}
        element={
          <div>
            Main
            <p>
              <Link to={AppRoute.ORDER_PAGE}>ORDER</Link>
            </p>
          </div>
        }
      />
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
    </Routes>
  );
};
