import { Link } from 'react-router';
import { AppRoute } from '../../../../../common/constants/routes';
import type { NewsItem } from '../../../../../common/types/news';
import styles from './styles.module.css';

export type NewsListItemProps = NewsItem;

export const NewsListItem = (props: NewsListItemProps) => {
  const { id, headline, addedAt } = props;

  return (
    <div className={styles.newsListItem}>
      <Link className={styles.newsListItemLink} to={`${AppRoute.NEWS}/${id}`} />
      <div className={styles.newsListItemImage}></div>
      {/* <img src={image} alt={preview} /> */}
      <h3 className={styles.newsListItemTitle}>{headline}</h3>
      <small className={styles.newsListItemDate}>{addedAt}</small>
    </div>
  );
};
