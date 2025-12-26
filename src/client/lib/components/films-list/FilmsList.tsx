import clsx from 'clsx';
import type { Film } from '../../../../common/types/film';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { FilmItem } from './film-item/FilmItem';
import styles from './styles.module.css';

export type FilmsListProps = PropsWithClassName<{
  films: Film[];
  onFilmClick: (film: Film) => void;
}>;

export const FilmsList = (props: FilmsListProps) => {
  const { films, onFilmClick, className } = props;
  const classNameFinal = clsx(styles.filmsList, className);

  return (
    <div className={classNameFinal} data-test-id="films-list">
      {films.map((film) => {
        const { id } = film;

        return <FilmItem key={id} film={film} onClick={onFilmClick} />;
      })}
    </div>
  );
};
