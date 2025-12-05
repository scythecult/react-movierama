import { Link } from 'react-router';
import { AppRoute } from '../../../../../common/constants/routes';
import type { Film } from '../../../../../common/types/film';
import { Badge } from '../../badge/Badge';
import styles from './styles.module.css';

export type FilmItemProps = {
  film: Film;
  onClick?: (film: Film) => void;
};

export const FilmItem = (props: FilmItemProps) => {
  const { film } = props;
  const { id, name, ageCategory, genres, formats, poster } = film;

  const formatNodes = formats.map((format) => {
    return (
      <span key={format.name} className={styles.filmItemFormat}>
        {format.name}
      </span>
    );
  });

  return (
    <Link className={styles.filmItem} to={`${AppRoute.FILMS}/${id}`}>
      <Badge className={styles.filmItemBadge}>{ageCategory}</Badge>
      <img src={poster} alt={name} />
      <span className={styles.filmItemContent}>
        <span className={styles.filmItemName}>{name}</span>
        <span className={styles.filmItemMetaInfo}>
          {genres.join(', ')}

          <span className={styles.filmItemFormat}>{formatNodes}</span>
        </span>
      </span>
    </Link>
  );
};
