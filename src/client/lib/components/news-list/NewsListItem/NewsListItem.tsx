import { Link } from 'react-router';
import { AppRoute } from '../../../../../common/constants/routes';
import type { NewsItem } from '../../../../../common/types/news';
import styles from './styles.module.css';

export type NewsListItemProps = NewsItem;

export const NewsListItem = (props: NewsListItemProps) => {
  const { id, headline, addedAt, image, preview } = props;

  return (
    <div className={styles.newsListItem} data-test-id="news-list-item">
      <Link className={styles.newsListItemLink} to={`${AppRoute.NEWS}/${id}`} />
      <img className={styles.newsListItemImage} src={image} alt={preview} />
      <h3 className={styles.newsListItemTitle}>{headline}</h3>
      <small className={styles.newsListItemDate}>{addedAt}</small>
    </div>
  );
};
