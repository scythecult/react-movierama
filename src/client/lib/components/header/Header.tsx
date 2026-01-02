import clsx from 'clsx';
import type { GeolocationData } from '../../../../common/types/geolocation';
import { useAppStore } from '../../contexts/app-store/useAppStore';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { CustomIconName } from '../custom-icon/constants';
import { IconButton } from '../icon-button/IconButton';
import { Logo } from '../logo/Logo';
import { SiteNavigation } from '../site-navigation/SiteNavigation';
import styles from './styles.module.css';

export type HeaderProps = PropsWithClassName<{
  location: GeolocationData;
  onLocationClick: () => void;
}>;

export const Header = (props: HeaderProps) => {
  const { location } = props;
  const user = useAppStore((state) => state.user);
  const { className, onLocationClick } = props;
  const classNameFinal = clsx(styles.header, className);
  const userTextFinal = user.email ? `${user.firstName} ${user.lastName}` : 'Personal Account';
  const locationTextFinal = location.name ? location.name : 'Choose City';

  return (
    <header className={classNameFinal}>
      <div className={styles.headerContent}>
        <Logo />

        <IconButton name={CustomIconName.PIN} onClick={onLocationClick}>
          {locationTextFinal}
        </IconButton>

        <SiteNavigation />

        <IconButton name={CustomIconName.ACCOUNT}>{userTextFinal}</IconButton>
      </div>
    </header>
  );
};
