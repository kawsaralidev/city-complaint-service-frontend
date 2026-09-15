import { ofetch, type FetchOptions } from "ofetch";
import { getAccessToken, setAccessToken } from "./auth.token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchApi = ofetch.create({
  baseURL: API_URL,
  credentials: "include",

  onRequest({ options }) {
    const accessToken = getAccessToken();

    if (accessToken) {
      const headers = new Headers(options.headers);

      headers.set("Authorization", `Bearer ${accessToken}`);

      options.headers = headers;
    }
  },
});

export async function api<T>(
  request: string,
  options?: FetchOptions<"json", any>,
): Promise<T> {
  try {
    return await fetchApi<T>(request, options);
  } catch (error: any) {
    const accessToken = getAccessToken();

    // Refresh only when an existing access token has expired
    if (
      error?.response?.status === 401 &&
      accessToken &&
      !request.includes("/auth/refresh-token")
    ) {
      try {
        // Request a new access token using the refresh token cookie
        const refreshResponse = await fetchApi<{
          success: boolean;
          message: string;
          data: {
            accessToken: string;
          };
        }>("/auth/refresh-token", {
          method: "POST",
        });

        const newAccessToken = refreshResponse.data.accessToken;

        // Store the new access token in memory
        setAccessToken(newAccessToken);

        // Retry the original request with the new access token
        const headers = new Headers(options?.headers);

        headers.set("Authorization", `Bearer ${newAccessToken}`);

        return await fetchApi<T>(request, {
          ...options,
          headers,
        });
      } catch (refreshError) {
        // Clear access token when refresh fails
        setAccessToken(null);

        throw refreshError;
      }
    }

    throw error;
  }
}
