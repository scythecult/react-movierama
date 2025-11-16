import type { NewsItem } from '../../../../common/types/news';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { NewsListItem } from './NewsListItem/NewsListItem';
import styles from './styles.module.css';

export type NewsListProps = PropsWithClassName & {
  news: NewsItem[];
  onNewsClick: (id: number) => void;
};

export const NewsList = (props: NewsListProps) => {
  const { news } = props;

  return (
    <div className={styles.newsList} data-test-id="news-list">
      {news.map((newsItem) => {
        const { id } = newsItem;

        return <NewsListItem key={id} {...newsItem} />;
      })}
    </div>
  );
};
