import clsx from 'clsx';
import { Link, useLocation } from 'react-router';
import { AppRoute } from '../../../../common/constants/routes';
import styles from './styles.module.css';

export const Logo = () => {
  const location = useLocation();
  const isLogoActive = location.pathname !== AppRoute.ROOT;
  const classNameFinal = clsx(styles.logo, { [styles.isActive]: isLogoActive });

  return (
    <Link className={classNameFinal} to={AppRoute.ROOT}>
      MOVIERAMA
    </Link>
  );
};
