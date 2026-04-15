import { ApiVersion } from '../../../common/constants/routes';
import { Config } from '../../../common/env';

type CreateFetcherOptions = {
  baseUrl: string;
};

export type ServerPayload<ServerData = unknown> = {
  data: ServerData;
};

// TODO Refactor/upgrade
// TODO Move to common
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
        // TODO Update error
        throw new Error(`Network response was not ok, ${response.status} ${response.statusText}`);
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

const baseUrl = Config.appMode === 'watch' ? Config.apiUrl : Config.ssrUrl;

export const fetcher = createFetcher({ baseUrl: `${baseUrl}${ApiVersion.V1}` });
