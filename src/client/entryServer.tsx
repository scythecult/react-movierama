import { dehydrate, QueryClient } from '@tanstack/react-query';
import { renderToString } from 'react-dom/server';
import { fetchHallplan } from './lib/api/hallplan/requests';
import { QueryKey } from './lib/api/queryKeys';
import { ServerApp } from './ServerApp';

export type RenderSsrTemplate = typeof renderSsrTemplate;
// On the server, we need to prefetch data before we generate/render the markup,
// we need to dehydrate that data into a serializable format we can embed in the markup,
// and on the client we need to hydrate that data into a React Query cache
// so we can avoid doing a new fetch on the client.
export const renderSsrTemplate = async (url: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    // TODO Here we can use QueryKey[url].all to get data from current requested page
    queryKey: QueryKey.hallplan.all,
    queryFn: fetchHallplan,
  });

  const currentPageData = queryClient.getQueryData(QueryKey.hallplan.all);
  const dehydratedQueryState = dehydrate(queryClient);
  const html = renderToString(<ServerApp queryClient={queryClient} url={url} />);

  const zustandState = {
    ...(typeof currentPageData === 'undefined' ? {} : currentPageData),
  };

  return { html, dehydratedQueryState, zustandState };
};
