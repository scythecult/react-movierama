import { AppRoute } from '../../../../common/constants/routes';
import { SiteNavLink } from '../site-nav-link/SiteNavLink';
import styles from './styles.module.css';

export const SiteNavigation = () => {
  return (
    <nav className={styles.siteNavigation}>
      <SiteNavLink to={AppRoute.FINDER}>Theaters</SiteNavLink>
      <SiteNavLink to={AppRoute.DISCOUNTS}>Sale</SiteNavLink>
      <SiteNavLink to={AppRoute.KIDS}>Kids</SiteNavLink>
      <SiteNavLink to={AppRoute.ART}>Art</SiteNavLink>
      <SiteNavLink to={AppRoute.MULTI_CARD}>Multi-card</SiteNavLink>
    </nav>
  );
};
