import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { newsQueries } from '../../../../entities/news/api';
import { List } from '../../../../shared/ui/list/List';
import { NewsListItem } from './news-list-item/NewsListItem';
import styles from './styles.module.css';

export type NewsListProps = PropsWithClassName;

export const NewsList = (props: NewsListProps) => {
  const { data: news, isLoading } = useQuery(newsQueries.list());
  const { className } = props;
  const classNameFinal = clsx(styles.newsList, className);

  if (isLoading) {
    // TODO Add skeletons
    return <div>Loading...</div>;
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
