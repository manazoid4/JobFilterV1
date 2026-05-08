type ApiOptions = RequestInit & { timeout?: number };

export class ApiError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor(status: number, statusText: string, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

const DEFAULT_TIMEOUT = 15000;

let toastQueue: ((message: string, type: 'error' | 'success' | 'info') => void) | null = null;

export function setToastHandler(handler: (message: string, type: 'error' | 'success' | 'info') => void) {
  toastQueue = handler;
}

function toast(message: string, type: 'error' | 'success' | 'info' = 'error') {
  if (toastQueue) {
    toastQueue(message, type);
  } else {
    console.error('[JobFilter API]', message);
  }
}

function getErrorMessage(status: number, data?: unknown): string {
  if (typeof data === 'object' && data !== null && 'errors' in data) {
    const errs = (data as Record<string, unknown>).errors;
    if (Array.isArray(errs) && errs.length > 0 && typeof errs[0] === 'string') {
      return errs[0];
    }
  }
  if (typeof data === 'object' && data !== null && 'message' in data) {
    return String((data as Record<string, unknown>).message);
  }
  switch (status) {
    case 400: return 'Something went wrong. Check your input and try again.';
    case 401: return 'You need to be logged in for that.';
    case 403: return "You don't have access to that.";
    case 404: return "We couldn't find that. It may have been removed.";
    case 429: return 'Too many requests. Wait a moment and try again.';
    case 500: return "Server error. We're on it. Try again in a minute.";
    case 502: return 'Service temporarily unavailable. Try again shortly.';
    case 503: return 'Service is down for maintenance. Check back soon.';
    default: return `Request failed (${status}). Try again.`;
  }
}

export async function api<T>(path: string, options?: ApiOptions): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options?.timeout ?? DEFAULT_TIMEOUT);

  try {
    const response = await fetch(path, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeout);

    let data: unknown;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message = getErrorMessage(response.status, data);
      const error = new ApiError(response.status, response.statusText, message, data);

      if (response.status >= 500) {
        toast(message, 'error');
      } else if (response.status === 429) {
        toast(message, 'error');
      } else if (response.status === 404) {
        toast(message, 'info');
      }

      throw error;
    }

    return data as T;
  } catch (err) {
    clearTimeout(timeout);

    if (err instanceof ApiError) throw err;

    if (err instanceof DOMException && err.name === 'AbortError') {
      const message = 'Request timed out. Check your connection and try again.';
      toast(message, 'error');
      throw new ApiError(408, 'Timeout', message);
    }

    if (err instanceof TypeError && err.message.includes('fetch')) {
      const message = 'Network error. Check your connection and try again.';
      toast(message, 'error');
      throw new ApiError(0, 'Network Error', message);
    }

    const message = 'Something went wrong. Try again.';
    toast(message, 'error');
    throw new ApiError(500, 'Unknown', message, err);
  }
}

export async function apiGet<T>(path: string, options?: ApiOptions): Promise<T> {
  return api<T>(path, { method: 'GET', ...options });
}

export async function apiPost<T>(path: string, body?: unknown, options?: ApiOptions): Promise<T> {
  return api<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
}

export async function apiPut<T>(path: string, body?: unknown, options?: ApiOptions): Promise<T> {
  return api<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
}

export async function apiDelete<T>(path: string, options?: ApiOptions): Promise<T> {
  return api<T>(path, { method: 'DELETE', ...options });
}
