const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type HeadersProps = {
  'Content-Type': string;
  Authorization: string;
};

type ConfigProps = {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  headers?: Partial<HeadersProps>;
  data?: object | null;
  params?: object | null;
};

export class APIError extends Error {
  public readonly code: number;
  public readonly status: string;
  public readonly message: string;
  public readonly data?: null | string;

  constructor(code: number, status: string, message: string, data?: string) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export type AccessTokenNames = 'accessToken';
export type RefreshTokenNames = 'refreshToken';

const fetcher = async ({
  url,
  method,
  headers = {},
  data,
  params,
}: ConfigProps) => {
  // const tokenName: AccessTokenNames = 'accessToken';

  const configHeaders: Record<string, string> = {
    ...headers,
    'Content-Type': 'application/json',
  };

  let queryString = '';
  if (params && method === 'GET') {
    queryString = `?${new URLSearchParams(params as Record<string, string>).toString()}`;
  }

  const options: RequestInit = {
    method,
    headers: configHeaders,
    credentials: 'include',
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}${queryString}`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    if (errorBody.message === 'Token is expired') {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const configHeaders: Record<string, string> = {
          ...headers,
          'Content-Type': 'application/json',
        };

        let queryString = '';
        if (params && method === 'GET') {
          queryString = `?${new URLSearchParams(params as Record<string, string>).toString()}`;
        }

        const options: RequestInit = {
          method,
          headers: configHeaders,
          credentials: 'include',
        };

        if (data && method !== 'GET') {
          options.body = JSON.stringify(data);
        }

        const response = await fetch(
          `${BASE_URL}${url}${queryString}`,
          options
        );

        if (!response.ok) {
          throw handleError(errorBody);
        }

        return response.json();
      }
    }
    throw handleError(errorBody);
  }

  return response.json();
};

const handleError = (errorBody: APIError) => {
  throw {
    code: errorBody?.code || 'Unknown Code',
    message: errorBody?.message || 'Unknown Error',
  };
};

const refreshAccessToken = async (): Promise<string | null> => {
  const tokenName: AccessTokenNames = 'accessToken';
  try {
    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Refresh Token은 HttpOnly 쿠키에서 처리
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const { accessToken } = await response.json();
    sessionStorage.setItem(tokenName, accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // 로그아웃 또는 추가 처리
    sessionStorage.removeItem('accessToken');
    return null;
  }
};

const apiCall = {
  get(url: string, params?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'GET', params, headers });
  },

  post(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'POST', data, headers });
  },

  delete(url: string, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'DELETE', headers });
  },

  patch(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'PATCH', data, headers });
  },

  put(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'PUT', data, headers });
  },
};

export default apiCall;
