import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router';
import { AppRoute } from '../../../../common/constants/routes';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';

export type SiteNavLinkProps = PropsWithChildren<PropsWithClassName> & {
  to: string;
};

export const SiteNavLink = (props: SiteNavLinkProps) => {
  const { className, children, to = AppRoute.ROOT } = props;
  const classNameFinal = clsx(styles.siteNavLink, className);

  return (
    <NavLink
      className={({ isActive }) => clsx(classNameFinal, { [styles.isActive]: isActive })}
      to={to}
      data-test-id="site-nav-link"
    >
      {children}
    </NavLink>
  );
};
