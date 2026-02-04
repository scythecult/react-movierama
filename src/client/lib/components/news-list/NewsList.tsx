import clsx from 'clsx';
import type { NewsItem } from '../../../../common/types/news';
import type { PropsWithClassName } from '../../types/PropsWithClassName';
import { List } from '../list/List';
import { NewsListItem } from './NewsListItem/NewsListItem';
import styles from './styles.module.css';

export type NewsListProps = PropsWithClassName<{
  news?: NewsItem[];
  isLoading: boolean;
  onNewsClick?: (id: number) => void;
}>;

export const NewsList = (props: NewsListProps) => {
  const { className, news = [], isLoading } = props;
  const classNameFinal = clsx(styles.newsList, className);

  if (isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
  }

  // TODO Add proper check or add fallback values to hook
  if (!news.length) {
    return <div>Error</div>;
  }

  return (
    <List
      className={classNameFinal}
      items={news}
      renderItem={(newsItem) => <NewsListItem key={newsItem.id} newsItem={newsItem} />}
      data-test-id="news-list"
    />
  );
};
