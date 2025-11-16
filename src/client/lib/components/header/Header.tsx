import clsx from 'clsx';
import { useAppStore } from '../../contexts/app-store/useAppStore';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { IconButton, IconButtonName } from '../icon-button/IconButton';
import { Logo } from '../logo/Logo';
import { SiteNavigation } from '../site-navigation/SiteNavigation';
import styles from './styles.module.css';

export type HeaderProps = PropsWithClassName;

export const Header = (props: HeaderProps) => {
  const user = useAppStore((state) => state.user);
  const { className } = props;
  const classNameFinal = clsx(styles.header, className);

  return (
    <header className={classNameFinal}>
      <div className={styles.headerContent}>
        <Logo />

        <IconButton name={IconButtonName.LOCATION}>Current Location</IconButton>

        <SiteNavigation />

        <IconButton name={IconButtonName.LOGIN}>{user.firstName}</IconButton>
      </div>
    </header>
  );
};
