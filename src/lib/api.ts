import { ofetch, type FetchOptions } from "ofetch";
import { ApiError } from "@/lib/api-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchApi = ofetch.create({
  baseURL: API_URL,
  credentials: "include",
});

export async function api<T>(
  request: string,
  options?: FetchOptions<"json", unknown>,
): Promise<T> {
  try {
    return await fetchApi<T>(request, options);
  } catch (error: unknown) {
    const status = getErrorStatus(error);

    // Only try to refresh after an unauthorized response
    if (
      status !== 401 ||
      request.includes("/auth/login") ||
      request.includes("/auth/demo-login") ||
      request.includes("/auth/refresh-token") ||
      request.includes("/auth/me")
    ) {
      throw createApiError(error);
    }

    try {
      // Get a new access token from the refresh token cookie
      await fetchApi("/auth/refresh-token", {
        method: "POST",
      });

      // Retry the original request
      return await fetchApi<T>(request, options);
    } catch (refreshError: unknown) {
      throw createApiError(refreshError);
    }
  }
}

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response;

    if (
      typeof response === "object" &&
      response !== null &&
      "status" in response &&
      typeof response.status === "number"
    ) {
      return response.status;
    }
  }

  return undefined;
}

function createApiError(error: unknown): ApiError {
  const status = getErrorStatus(error) ?? 500;

  if (typeof error === "object" && error !== null && "data" in error) {
    const data = error.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      const errors =
        "errors" in data && Array.isArray(data.errors)
          ? data.errors
          : undefined;

      return new ApiError(data.message, status, errors);
    }
  }

  if (error instanceof Error) {
    return new ApiError(error.message, status);
  }

  return new ApiError("Something went wrong", status);
}
