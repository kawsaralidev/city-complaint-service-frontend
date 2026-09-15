import { getAccessToken, setAccessToken } from "@/lib/auth.token";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      const { accessToken } = response.data;

      // Store access token in memory
      setAccessToken(accessToken);
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    enabled: !!getAccessToken(),
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // Remove access token
      setAccessToken(null);

      // Remove logged-in user from cache
      queryClient.removeQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
