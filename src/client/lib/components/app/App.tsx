import { useEffect } from 'react';
import { AppRoute } from '../../../../common/routes';
import { SSR_URL } from '../../../../common/url';
import { OrderPageController } from '../../../pages/order-page/OrderPageController';

export const App = () => {
  // Temporary test effect
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`${SSR_URL}${AppRoute.HEALTH}`, {
          headers: {
            credentials: 'include',
          },
        });

        if (!response.ok) {
          console.error('Health check failed');

          return;
        }

        const result = await response.json();

        console.info({ result });
      } catch (error) {
        console.error({ error });
      }
    };

    fetchHealth();
  }, []);

  return (
    // TODO Move to common "page" component
    // TODO Add Router
    <OrderPageController />
  );
};
