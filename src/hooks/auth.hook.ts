import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  demoLogin,
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyRegisterEmail,
} from "@/services/auth.service";

const currentUserQueryKey = ["current-user"];

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      queryClient.setQueryData(currentUserQueryKey, {
        success: response.success,
        message: response.message,
        data: response.data.user,
      });
    },
  });
}

export function useDemoLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role: "CITIZEN" | "OFFICER" | "ADMIN") => demoLogin(role),

    onSuccess: (response) => {
      queryClient.setQueryData(currentUserQueryKey, {
        success: response.success,
        message: response.message,
        data: response.data.user,
      });
    },
  });
}
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: {
        newPassword: string;
        confirmPassword: string;
      };
    }) => resetPassword(token, data),
  });
}

export function useVerifyRegisterEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyRegisterEmail,

    onSuccess: (response) => {
      queryClient.setQueryData(currentUserQueryKey, response);
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.setQueryData(currentUserQueryKey, {
        success: true,
        message: "Logout successful.",
        data: null,
      });
    },
  });
}
