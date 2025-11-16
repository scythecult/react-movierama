import clsx from 'clsx';
import { Link } from 'react-router';
import { AppRoute } from '../../../../common/constants/routes';
import type { Film } from '../../../../common/types/film';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './styles.module.css';
export type FilmsListProps = PropsWithClassName & {
  films: Film[];
  onFilmClick: (film: Film) => void;
};

export const FilmsList = (props: FilmsListProps) => {
  const { films, onFilmClick, className } = props;
  const classNameFinal = clsx(styles.filmsList, className);

  return (
    <div className={classNameFinal} data-test-id="films-list">
      {films.map((film) => {
        const { id } = film;

        return (
          <div
            key={id}
            onClick={() => onFilmClick(film)}
            style={{
              width: '100%',
              maxWidth: '295px',
              minHeight: '380px',
              backgroundColor: 'chocolate',
              borderRadius: '12px',
            }}
          >
            <Link to={`${AppRoute.FILMS}/${id}`}>to {id}</Link>
          </div>
        );
      })}
    </div>
  );
};
