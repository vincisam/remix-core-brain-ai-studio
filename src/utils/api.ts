// Centralized API base URL configuration.
// The frontend is deployed as a static SPA (Vercel), while the backend runs
// separately (Render). Relative "/api/*" calls would hit the static server,
// so we must prefix with the backend URL.
//
// Set VITE_API_URL in your Vercel project env vars (or .env.local locally)
// to point to the deployed backend, e.g. https://remix-core-brain-api.onrender.com
import { getApiHeaders } from "./apiConfig";

const API_BASE: string = (import.meta.env.VITE_API_URL as string) || "http://localhost:4321";

export { API_BASE };

/**
 * Builds a full URL by prefixing the API base if the path is relative.
 * @param path - The API path, e.g. "/api/ai/chat"
 * @returns The fully-qualified URL.
 */
export const buildApiUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  // Normalize leading slash
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
};

/**
 * Fetch helper that prefixes the API base URL and handles JSON.
 * Merges the custom API-key headers from apiConfig so the backend can
 * inject the user's provider keys (X-Custom-Api-Keys).
 * @param path - The API path, e.g. "/api/ai/chat"
 * @param options - Standard fetch options
 * @returns The parsed JSON response.
 */
export const apiFetch = async <T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers = { ...getApiHeaders(), ...(options.headers || {}) };
  const res = await fetch(buildApiUrl(path), { ...options, headers });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error || body?.message || message;
    } catch {
      // ignore — fall back to generic message
    }
    throw new Error(message);
  }

  // Handle empty responses
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
};

/**
 * Streaming fetch helper for SSE/text-stream endpoints (e.g. chat).
 * Prefixes the API base URL and returns the raw Response so the caller
 * can read the body stream. Merges the custom API-key headers.
 */
export const apiStream = async (path: string, options: RequestInit = {}): Promise<Response> => {
  const headers = { ...getApiHeaders(), ...(options.headers || {}) };
  const res = await fetch(buildApiUrl(path), { ...options, headers });
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error || body?.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return res;
};
