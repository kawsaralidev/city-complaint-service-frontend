import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createComplaint,
  getComplaintById,
  getComplaints,
  getMyComplaints,
} from "@/services/complaint.service";

import type { ComplaintQueryParams } from "@/types/complaint";

const complaintsQueryKey = ["complaints"];

const myComplaintsQueryKey = ["my-complaints"];

const complaintQueryKey = ["complaint"];

// Get all complaints
export function useComplaints(params?: ComplaintQueryParams) {
  return useQuery({
    queryKey: [...complaintsQueryKey, params],
    queryFn: () => getComplaints(params),
  });
}

// Get current citizen's complaints
export function useMyComplaints() {
  return useQuery({
    queryKey: myComplaintsQueryKey,
    queryFn: getMyComplaints,
  });
}

// Get single complaint by ID
export function useComplaint(complaintId: string) {
  return useQuery({
    queryKey: [...complaintQueryKey, complaintId],
    queryFn: () => getComplaintById(complaintId),
    enabled: Boolean(complaintId),
  });
}

// Create complaint mutation
export function useCreateComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComplaint,

    onSuccess: () => {
      // Refresh citizen's complaints after creating a new complaint
      queryClient.invalidateQueries({
        queryKey: ["my-complaints"],
      });

      // Refresh complaints data if it is already being used elsewhere
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });
    },
  });
}
