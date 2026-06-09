import { ApiVersion } from '../../../common/constants/routes';
import { Config } from '../../../common/env';

type QueryParams = Record<string, string | number>;

export type ServerPayload<ServerData = unknown> = {
  data: ServerData;
};

class ApiClient {
  #baseUrl: string;
  #apiVersion: string;

  constructor(baseUrl: string, apiVersion = ApiVersion.V1) {
    this.#baseUrl = baseUrl;
    this.#apiVersion = apiVersion;
  }

  async handleResponse<ResponseData>(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return (await response.json()) as ServerPayload<ResponseData>;
    } catch (error) {
      console.error('Error parsing JSON response:', error);

      return { data: {} } as ServerPayload<ResponseData>;
    }
  }

  async send(method: string, url: string, body?: unknown) {
    return await fetch(url, {
      method,
      ...(body ? { body: JSON.stringify(body) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  constructUrl(endpoint: string) {
    return new URL(`${this.#apiVersion}${endpoint}`, this.#baseUrl);
  }

  public async get<ResponseData>(endpoint: string, queryParams?: QueryParams): Promise<ServerPayload<ResponseData>> {
    const url = this.constructUrl(endpoint);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const response = await this.send('GET', url.toString());

    return this.handleResponse<ResponseData>(response);
  }

  public async post<ResponseData>(endpoint: string, body: unknown): Promise<ServerPayload<ResponseData>> {
    const url = this.constructUrl(endpoint);

    const response = await this.send('POST', url.toString(), body);

    return this.handleResponse<ResponseData>(response);
  }
}

const baseUrl = Config.appMode === 'watch' ? Config.apiUrl : Config.ssrUrl;

export const apiClient = new ApiClient(baseUrl, ApiVersion.V1);
