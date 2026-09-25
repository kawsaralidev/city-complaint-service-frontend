import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAdminUsers,
  updateMyProfile,
  updateUserStatus,
} from "@/services/user.service";

import type { UpdateProfileInput } from "@/services/user.service";
import type { GetAdminUsersParams, UpdateUserStatusInput } from "@/types/user";

const adminUsersQueryKey = ["admin-users"];

// Get users for admin
export function useAdminUsers(params: GetAdminUsersParams = {}) {
  return useQuery({
    queryKey: [...adminUsersQueryKey, params],
    queryFn: () => getAdminUsers(params),
  });
}

// Update current user's profile
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => updateMyProfile(data),

    onSuccess: (response) => {
      queryClient.setQueryData(["current-user"], response);
    },
  });
}

// Update user status
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserStatusInput) => updateUserStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKey,
      });
    },
  });
}
