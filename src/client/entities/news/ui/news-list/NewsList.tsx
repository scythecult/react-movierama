import clsx from 'clsx';
import { useNewsQuery } from '../../../../entities/news/api';
import { List } from '../../../../shared/ui/list/List';
import { NewsListItem } from './news-list-item/NewsListItem';
import styles from './styles.module.css';

export type NewsListProps = PropsWithClassName;

export const NewsList = (props: NewsListProps) => {
  const { data: news = [], isLoading } = useNewsQuery();
  const { className } = props;
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
