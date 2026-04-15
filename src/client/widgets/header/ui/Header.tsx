import clsx from 'clsx';
import { LocationsButton } from '../../../features/locations/ui';
import { UserButton } from '../../../features/user/ui';
import { Logo } from '../../../shared/ui/logo/Logo';
import { SiteNavigation } from '../../../shared/ui/site-navigation/SiteNavigation';
import styles from './styles.module.css';

export type HeaderProps = PropsWithClassName;

// TODO Think about dependency injection through renderProps/slots
export const Header = (props: HeaderProps) => {
  const { className } = props;
  const classNameFinal = clsx(styles.header, className);

  return (
    <header className={classNameFinal}>
      <div className={styles.headerContent}>
        <Logo />

        <LocationsButton />

        <SiteNavigation />

        <UserButton />
      </div>
    </header>
  );
};
