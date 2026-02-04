import { NavLink, Outlet } from 'react-router';
import { useScrollReset } from '../../hooks/useScrollReset';
import { LocationsModal } from '../../locations-modal/components/LocationsModal';
import { LocationsModalProvider } from '../../locations-modal/components/LocationsModalProvider';
import { Header } from '../header/Header';
import { Logo } from '../logo/Logo';
import styles from './styles.module.css';

export const Page = () => {
  useScrollReset();

  return (
    <LocationsModalProvider>
      <Header />

      <main className={styles.pageMain}>
        <Outlet />
      </main>
      {/* Separate to component */}
      <footer className={styles.pageFooter}>
        <div className={`${styles.pageContentContainer} ${styles.pageContentContainerFooter}`}>
          <div className={styles.pageFooterLayout}>
            <Logo />

            {/* Separate to component  */}
            <ul className={styles.socials}>
              <li className={styles.socialsItem}>
                <a className={styles.socialsItemLink} href="/">
                  <span>FB</span>
                </a>
              </li>
              <li className={styles.socialsItem}>
                <a className={styles.socialsItemLink} href="/">
                  <span>TW</span>
                </a>
              </li>
              <li className={styles.socialsItem}>
                <a className={styles.socialsItemLink} href="/">
                  <span>IS</span>
                </a>
              </li>
              <li className={styles.socialsItem}>
                <a className={styles.socialsItemLink} href="/">
                  <span>VK</span>
                </a>
              </li>
              <li className={styles.socialsItem}>
                <a className={styles.socialsItemLink} href="/">
                  <span>TG</span>
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.pageFooterLayout}>
            <div className={styles.pageFooterClientInfo}>
              <div className={styles.pageFooterNavigationContainer}>
                {/* Separate to component */}
                <p className={styles.pageFooterNavigationTitle}>For Client</p>
                <nav className={styles.pageFooterNavigation}>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Theaters
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Sale
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Kids
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Art
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Multi-card
                  </NavLink>
                </nav>
              </div>
              <div className={styles.pageFooterNavigationContainer}>
                {/* Separate to component */}
                <p className={styles.pageFooterNavigationTitle}>For Business</p>
                <nav className={styles.pageFooterNavigation}>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    About
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Vacancy
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Rent
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Advertising in cinema
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Press
                  </NavLink>
                  <NavLink className={styles.pageFooterNavigationLink} to="/">
                    Advertising on site
                  </NavLink>
                </nav>
              </div>
            </div>

            <span className={styles.pageFooterCopyright}>© 2022 MOVIERAMA</span>
          </div>
        </div>
      </footer>
      <LocationsModal />
    </LocationsModalProvider>
  );
};
