import { Config } from '../../../common/env';
import type { ServerPayload } from '../../../common/types/http';

type CreateFetcherOptions = {
  baseUrl: string;
};

const createFetcher = (options: CreateFetcherOptions) => {
  const { baseUrl = '' } = options;

  const fetcher = async <ResponseData>(method: string, path: string, body?: unknown) => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method,
        ...(body ? { body: JSON.stringify(body) } : {}),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return data as ServerPayload<ResponseData>;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: {} } as ServerPayload<ResponseData>;
    }
  };

  return {
    get: <ResponseData = unknown>(path: string) => fetcher<ResponseData>('GET', path),
    post: <ResponseData = unknown, BodyData = unknown>(path: string, body: BodyData) =>
      fetcher<ResponseData>('POST', `${path}`, body),
  };
};

export const fetcher = createFetcher({ baseUrl: Config.ssrUrl });
