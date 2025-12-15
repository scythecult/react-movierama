import { useLayoutEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { useLocationQuery } from '../../api/location/hooks';
import { Header } from '../header/Header';
import { Logo } from '../logo/Logo';
import styles from './styles.module.css';
export const Page = () => {
  const location = useLocation();
  const { data: locationData, isLoading: isLocationDataLoading } = useLocationQuery();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (isLocationDataLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!locationData) {
    return <div>Error</div>;
  }

  return (
    <>
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
    </>
  );
};
