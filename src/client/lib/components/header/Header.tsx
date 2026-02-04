import clsx from 'clsx';
import { useAppStore } from '../../contexts/app-store/useAppStore';
import { useLocationsModalContext } from '../../locations-modal/hooks/useLocationsModalContext';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { CustomIconName } from '../custom-icon/constants';
import { IconButton } from '../icon-button/IconButton';
import { Logo } from '../logo/Logo';
import { SiteNavigation } from '../site-navigation/SiteNavigation';
import styles from './styles.module.css';

export type HeaderProps = PropsWithClassName;

export const Header = (props: HeaderProps) => {
  const user = useAppStore((state) => state.user);
  const geolocation = useAppStore((state) => state.location);
  const { handleOpen } = useLocationsModalContext();
  const { className } = props;
  const classNameFinal = clsx(styles.header, className);
  const userTextFinal = user.email ? `${user.firstName} ${user.lastName}` : 'Personal Account';
  const locationTextFinal = geolocation.name ? geolocation.name : 'Choose City';

  return (
    <header className={classNameFinal}>
      <div className={styles.headerContent}>
        <Logo />

        <IconButton name={CustomIconName.PIN} onClick={handleOpen}>
          {locationTextFinal}
        </IconButton>

        <SiteNavigation />

        <IconButton name={CustomIconName.ACCOUNT}>{userTextFinal}</IconButton>
      </div>
    </header>
  );
};
