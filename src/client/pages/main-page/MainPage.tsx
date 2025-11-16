import { AppRoute } from '../../../common/constants/routes';
import { useFilmsQuery } from '../../lib/api/films/hooks';
import { useNewsQuery } from '../../lib/api/news/hooks';
import { FilmsList } from '../../lib/components/films-list/FilmsList';
import { LinkBar } from '../../lib/components/link-bar/LinkBar';
import { NewsList } from '../../lib/components/news-list/NewsList';
import { SiteNavLink } from '../../lib/components/site-nav-link/SiteNavLink';

export const MainPage = () => {
  const { data: filmsData, isLoading: isFilmsDataLoading } = useFilmsQuery();
  const { data: newsData, isLoading: isNewsDataLoading } = useNewsQuery();

  if (isFilmsDataLoading || isNewsDataLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!filmsData || !newsData) {
    return <div>Error</div>;
  }

  const { films } = filmsData;
  const { news } = newsData;

  // console.info('main page data', { films, user, news });

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

      <FilmsList films={films} onFilmClick={(film) => console.info({ film })} />

      <NewsList news={news} onNewsClick={(newsItem) => console.info({ newsItem })} />
    </>
  );
};
