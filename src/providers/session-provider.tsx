"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getCurrentUser, refreshAccessToken } from "@/services/auth.service";

import { getAccessToken, setAccessToken } from "@/lib/auth.token";

let sessionRestoreStarted = false;

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Restore session only once
    if (sessionRestoreStarted) {
      return;
    }

    sessionRestoreStarted = true;

    const restoreSession = async () => {
      try {
        // Get a new access token from refresh token cookie
        const response = await refreshAccessToken();

        // Store new access token
        setAccessToken(response.data.accessToken);

        // Get current user
        const userResponse = await getCurrentUser();

        // Store current user in query cache
        queryClient.setQueryData(["current-user"], userResponse);
      } catch {
        // Do not remove an existing access token
        if (!getAccessToken()) {
          setAccessToken(null);
        }
      }
    };

    restoreSession();
  }, [queryClient]);

  return children;
}
