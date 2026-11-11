import type { RouteObject } from 'react-router';
import { Link } from 'react-router';
import { AppPath, AppRoute } from '../../../common/constants/routes';
import { Film } from '../../pages/film';
import { Main } from '../../pages/main';
import { mainLoader } from '../../pages/main/model/main.loader';
import { Order } from '../../pages/order';
import { orderLoader } from '../../pages/order/model/order.loaders';
import { Layout } from '../ui/layout/Layout';
import { rootLoader } from './root.loader';
import { unknownPageLoader } from './unknown.loader';

export const appRoutes: RouteObject[] = [
  {
    id: 'root',
    loader: rootLoader,
    element: <Layout />,
    children: [
      { id: 'main', path: AppRoute.ROOT, loader: mainLoader, element: <Main /> },
      { id: 'film', path: `${AppRoute.FILMS}/:id`, element: <Film /> },
      {
        id: 'order',
        path: AppRoute.ORDER,
        loader: orderLoader,
        children: [
          { id: 'order-index', index: true, element: <Order /> },
          {
            id: 'checkout',
            path: AppPath.CHECKOUT,
            element: (
              <div>
                Checkout
                <p>
                  <Link to={AppRoute.ORDER}>BACK</Link>
                </p>
              </div>
            ),
          },
        ],
      },
      { id: 'unknown', path: '*', loader: unknownPageLoader, element: <p>Page not found</p> },
    ],
  },
];
