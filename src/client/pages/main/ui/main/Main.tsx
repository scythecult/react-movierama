import { AppRoute } from '../../../../../common/constants/routes';
import { FilmsList } from '../../../../entities/films/ui';
import { NewsList } from '../../../../entities/news/ui';
import { SiteNavLink } from '../../../../shared/ui/site-nav-link/SiteNavLink';
import { LinkBar } from '../link-bar/LinkBar';

// Facade by nature or container-pattern
// Объединяет и скрывает сложность системы, объединяет нужные элементы системы в одно-целое.

export const Main = () => {
  return (
    <>
      <p
        style={{
          width: '100%',
          minHeight: '450px',
          backgroundColor: 'tomato',
        }}
        data-test-id="slider"
      >
        whole page width slider
      </p>

      <LinkBar>
        <SiteNavLink to={AppRoute.ROOT}>Today</SiteNavLink>
        <SiteNavLink to={AppRoute.FILMS}>Soon</SiteNavLink>
        <SiteNavLink to={AppRoute.GIFT_CARD}>Gift card</SiteNavLink>
      </LinkBar>

      <FilmsList />

      <NewsList />
    </>
  );
};
