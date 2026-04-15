import clsx from 'clsx';
import { useFilmsQuery } from '../../../../entities/films/api';
import type { FilmData } from '../../../../entities/films/model';
import { List } from '../../../../shared/ui/list/List';
import { FilmListItem } from './film-list-item/FilmListItem';
import styles from './styles.module.css';

export type FilmsListProps = PropsWithClassName<{
  onFilmClick?: (film: FilmData) => void;
}>;

export const FilmsList = (props: FilmsListProps) => {
  const { data: films = [], isLoading } = useFilmsQuery();
  const { onFilmClick, className } = props;
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
      renderItem={(film) => <FilmListItem key={film.id} film={film} onClick={onFilmClick} />}
      data-test-id="films-list"
    />
  );
};
