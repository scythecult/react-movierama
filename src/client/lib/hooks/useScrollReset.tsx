import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export const useScrollReset = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
};
