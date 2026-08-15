import { StatusCodes } from 'http-status-codes';
import { ApiVersion } from '../../../../common/constants/routes';
import { ApiClient } from './api-client';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

vi.mock('../../../../common/env', () => ({
  Config: {
    apiUrl: 'https://example.com',
    appMode: 'watch',
    ssrUrl: 'https://example.com',
  },
}));

let consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ApiClient', () => {
  const mockBaseUrl = 'https://example.com';
  let client: ApiClient;

  beforeEach(() => {
    client = new ApiClient(mockBaseUrl, ApiVersion.V1);
    fetchMock.mockReset();
    consoleErrorMock.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructUrl', () => {
    test('should correctly form URL with API version', () => {
      const url = client.constructUrl('/users');
      expect(url.toString()).toBe(`${mockBaseUrl}${ApiVersion.V1}/users`);
    });
  });

  describe('mapErrorResponse', () => {
    test('should map array errors to flat object with first elements', () => {
      const inputErrors = {
        email: ['Неверный формат', 'Поле обязательно'],
        password: ['Слишком короткий'],
      };
      const result = client.mapErrorResponse(inputErrors);

      expect(result).toEqual({
        email: 'Неверный формат',
        password: 'Слишком короткий',
      });
    });
  });

  describe('handleResponse', () => {
    test('should handle UNPROCESSABLE_ENTITY (422) and return errorMap', async () => {
      const mockErrorResponse = {
        error: {
          errors: { email: 'Email уже существует' },
        },
      };

      const response = new Response(JSON.stringify(mockErrorResponse), {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
      });

      const result = await client.handleResponse(response);

      expect(result).toEqual({
        data: {},
        errorMap: mockErrorResponse.error.errors,
      });
    });

    test('should throw error if response.ok is false (except 422)', async () => {
      const response = new Response(null, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });

      await expect(client.handleResponse(response)).rejects.toThrow(
        `HTTP error! Status: ${StatusCodes.INTERNAL_SERVER_ERROR}`,
      );
    });

    test('should return empty data for NO_CONTENT (204)', async () => {
      const response = new Response(null, {
        status: StatusCodes.NO_CONTENT,
      });

      const result = await client.handleResponse(response);

      expect(result).toEqual({ data: {} });
    });

    test('should successfully parse correct JSON', async () => {
      const mockData = { id: 1, name: 'John' };
      const response = new Response(JSON.stringify({ data: mockData }), {
        status: StatusCodes.OK,
      });

      const result = await client.handleResponse(response);

      expect(result).toEqual({ data: mockData });
    });

    test('should catch parsing error for invalid JSON and log it to console', async () => {
      consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

      const response = new Response('', {
        status: StatusCodes.OK,
      });

      const result = await client.handleResponse(response);

      expect(consoleErrorMock).toHaveBeenCalled();
      expect(result).toEqual({ data: {} });
    });
  });

  describe('HTTP methods (get / post)', () => {
    test('GET: should send correct headers and query parameters', async () => {
      const mockData = { items: [] };
      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ data: mockData }), { status: StatusCodes.OK }));

      const queryParams = { page: 1, search: 'test' };
      const result = await client.get('/items', queryParams);

      const expectedUrl = `${mockBaseUrl}${ApiVersion.V1}/items?page=1&search=test`;
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual({ data: mockData });
    });

    test('POST: should send request body in JSON format', async () => {
      const mockData = { success: true };
      const requestBody = { title: 'New Post' };

      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ data: mockData }), { status: StatusCodes.OK }));

      const result = await client.post('/items', requestBody);

      const expectedUrl = `${mockBaseUrl}${ApiVersion.V1}/items`;
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual({ data: mockData });
    });
  });
});
