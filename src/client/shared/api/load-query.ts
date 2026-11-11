import type { QueryClient } from '@tanstack/react-query';
import { isRequestAborted } from './request-abort';

type QueryOptions = Parameters<QueryClient['query']>[0];

// Query options from `queryOptions()` are generic. `query()`'s default signature is not, so the call is narrowed here.
const executeQuery = (queryClient: QueryClient, options: object) => queryClient.query(options as QueryOptions);

// A failed query stays in the cache and the page still renders. An abort stops the document.
export const loadQuery = async <TQueryFnData>(queryClient: QueryClient, options: object) => {
  try {
    return (await executeQuery(queryClient, options)) as TQueryFnData;
  } catch (error) {
    if (isRequestAborted(error)) {
      throw error;
    }

    return undefined;
  }
};
