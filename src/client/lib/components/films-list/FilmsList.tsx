import clsx from 'clsx';
import type { Film } from '../../../../common/types/film';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { List } from '../list/List';
import { FilmItem } from './film-item/FilmItem';
import styles from './styles.module.css';

export type FilmsListProps = PropsWithClassName<{
  films?: Film[];
  isLoading: boolean;
  onFilmClick?: (film: Film) => void;
}>;

export const FilmsList = (props: FilmsListProps) => {
  const { films = [], isLoading, onFilmClick, className } = props;
  const classNameFinal = clsx(styles.filmsList, className);

  if (isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!films.length) {
    return <div>Error</div>;
  }

  return (
    <List
      className={classNameFinal}
      items={films}
      renderItem={(film) => <FilmItem key={film.id} film={film} onClick={onFilmClick} />}
      data-test-id="films-list"
    />
  );
};
