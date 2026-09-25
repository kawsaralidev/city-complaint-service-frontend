import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "@/services/user.service";

// Update logged-in user's profile
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,

    onSuccess: (response) => {
      queryClient.setQueryData(["current-user"], response);
    },
  });
}
