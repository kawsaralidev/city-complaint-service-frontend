import { ofetch, type FetchOptions } from "ofetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchApi = ofetch.create({
  baseURL: API_URL,
  credentials: "include",
});

export async function api<T>(
  request: string,
  options?: FetchOptions<"json", any>,
): Promise<T> {
  try {
    return await fetchApi<T>(request, options);
  } catch (error: any) {
    // Only try to refresh after an unauthorized response
    if (
      error?.response?.status !== 401 ||
      request.includes("/auth/refresh-token") ||
      request.includes("/auth/me")
    ) {
      throw error;
    }

    try {
      // Get a new access token from the refresh token cookie
      await fetchApi("/auth/refresh-token", {
        method: "POST",
      });

      // Retry the original request
      return await fetchApi<T>(request, options);
    } catch {
      // User is not authenticated anymore
      return Promise.reject(error);
    }
  }
}
