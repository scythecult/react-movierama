import { StatusCodes } from 'http-status-codes';
import { ApiVersion } from '../../../../common/constants/routes';
import { Config } from '../../../../common/env';
import type { ErrorMap } from '../error/error';
import { getRequestContext } from '../request-context';

const ERROR_STATUSES = [StatusCodes.UNPROCESSABLE_ENTITY, StatusCodes.UNAUTHORIZED, StatusCodes.CONFLICT];

const buildHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const requestContext = getRequestContext();

  if (!requestContext) {
    return headers;
  }

  const forwardedHeaders = {
    cookie: requestContext.cookie,
    'x-forwarded-for': requestContext.forwardedFor,
    'user-agent': requestContext.userAgent,
    'accept-language': requestContext.acceptLanguage,
  };

  for (const [name, value] of Object.entries(forwardedHeaders)) {
    if (value) {
      headers[name] = value;
    }
  }

  return headers;
};

type QueryParams = Record<string, string | number>;

type ServerPayload<ServerData = unknown> = {
  data: ServerData;
  errorMap?: ErrorMap;
};

export class ApiClient {
  #baseUrl: string;
  #apiVersion: string;

  constructor(baseUrl: string, apiVersion = ApiVersion.V1) {
    this.#baseUrl = baseUrl;
    this.#apiVersion = apiVersion;
  }

  async handleResponse<ResponseData>(response: Response) {
    if (ERROR_STATUSES.includes(response.status)) {
      const errorResponse = await response.json();

      return { data: {}, errorMap: errorResponse.error.errors };
    }

    if (response.status === StatusCodes.NO_CONTENT) {
      return { data: {} };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return (await response.json()) satisfies ServerPayload<ResponseData>;
    } catch (error) {
      console.error('Error parsing JSON response:', error);

      return { data: {} };
    }
  }

  async send(method: string, url: string, body?: unknown) {
    const requestContext = getRequestContext();

    return await fetch(url, {
      method,
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...(requestContext?.signal ? { signal: requestContext.signal } : {}),
      credentials: 'include',
      headers: buildHeaders(),
    });
  }

  mapErrorResponse(errors: Record<string, string[]>) {
    return Object.entries(errors).reduce<Record<string, string>>((errorMap, [errorField, errorMessage]) => {
      errorMap[errorField] = errorMessage[0];

      return errorMap;
    }, {});
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

  public async put<ResponseData>(endpoint: string, body: unknown): Promise<ServerPayload<ResponseData>> {
    const url = this.constructUrl(endpoint);

    const response = await this.send('PUT', url.toString(), body);

    return this.handleResponse<ResponseData>(response);
  }
}

const baseUrl = Config.appMode === 'watch' ? Config.apiUrl : Config.ssrUrl;

export const apiClient = new ApiClient(baseUrl, ApiVersion.V1);
