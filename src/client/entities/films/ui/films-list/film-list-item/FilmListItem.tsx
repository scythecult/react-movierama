import { Link } from 'react-router';
import { AppRoute } from '../../../../../../common/constants/routes';
import type { FilmData } from '../../../../../entities/films/model';
import { Badge } from '../../../../../shared/ui/badge/Badge';
import styles from './styles.module.css';

export type FilmListItemProps = {
  film: FilmData;
  onClick?: (film: FilmData) => void;
};

export const FilmListItem = (props: FilmListItemProps) => {
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
    <Link className={styles.filmListItem} to={`${AppRoute.FILMS}/${id}`}>
      <Badge className={styles.filmListItemBadge}>{ageCategory}</Badge>

      <img src={poster} alt={name} />

      <span className={styles.filmListItemContent}>
        <span className={styles.filmListItemName}>{name}</span>
        <span className={styles.filmListItemMetaInfo}>
          {genres.join(', ')}

          <span className={styles.filmListItemFormat}>{formatNodes}</span>
        </span>
      </span>
    </Link>
  );
};
