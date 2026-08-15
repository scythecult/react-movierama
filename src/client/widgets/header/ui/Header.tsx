import clsx from 'clsx';
import { UserButton } from '../../../features/auth/ui';
import { LocationsButton } from '../../../features/locations/ui';
import { Logo } from '../../../shared/ui/logo/Logo';
import { SiteNavigation } from '../../../shared/ui/site-navigation/SiteNavigation';
import styles from './styles.module.css';

export type HeaderProps = PropsWithClassName;

export const Header = (props: HeaderProps) => {
  const { className } = props;
  const classNameFinal = clsx(styles.header, className);

  return (
    <header className={classNameFinal}>
      <div className={styles.headerContent}>
        <div className={styles.headerNavigation}>
          <Logo />

          <SiteNavigation />
        </div>

        <div className={styles.headerUserActions}>
          <UserButton />

          <LocationsButton />
        </div>
      </div>
    </header>
  );
};
