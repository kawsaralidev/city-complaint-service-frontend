import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  assignComplaint,
  cancelComplaint,
  createComplaint,
  getActiveOfficers,
  getComplaintById,
  getComplaints,
  getMyComplaints,
  updateComplaintAdminStatus,
  updateComplaintStatus,
} from "@/services/complaint.service";

import type { ComplaintQueryParams } from "@/types/complaint";
import { deleteComplaint } from "@/services/category.service";

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

export function useActiveOfficers() {
  return useQuery({
    queryKey: ["active-officers"],
    queryFn: getActiveOfficers,
  });
}

export function useAssignComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignComplaint,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...complaintQueryKey, variables.complaintId],
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });
    },
  });
}

// Create complaint
export function useCreateComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComplaint,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myComplaintsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });
    },
  });
}

export function useCancelComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (complaintId: string) => cancelComplaint(complaintId),

    onSuccess: (_, complaintId) => {
      queryClient.invalidateQueries({
        queryKey: [...complaintQueryKey, complaintId],
      });

      queryClient.invalidateQueries({
        queryKey: myComplaintsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });
    },
  });
}

// Update complaint status by officer
export function useUpdateComplaintStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComplaintStatus,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...complaintQueryKey, variables.complaintId],
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: myComplaintsQueryKey,
      });
    },
  });
}

// Update complaint status by admin
export function useUpdateComplaintAdminStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComplaintAdminStatus,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...complaintQueryKey, variables.complaintId],
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: myComplaintsQueryKey,
      });
    },
  });
}

export function useDeleteComplaint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (complaintId: string) => deleteComplaint(complaintId),

    onSuccess: (_, complaintId) => {
      queryClient.invalidateQueries({
        queryKey: [...complaintQueryKey, complaintId],
      });

      queryClient.invalidateQueries({
        queryKey: myComplaintsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: complaintsQueryKey,
      });
    },
  });
}
