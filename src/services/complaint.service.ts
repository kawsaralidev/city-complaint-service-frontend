import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";

import type {
  Complaint,
  ComplaintQueryParams,
  ComplaintStatus,
} from "@/types/complaint";

// Get all complaints
export const getComplaints = async (
  params?: ComplaintQueryParams,
): Promise<ApiResponse<Complaint[]>> => {
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set("page", String(params.page));
  }

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.status) {
    searchParams.set("status", params.status);
  }

  if (params?.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  const queryString = searchParams.toString();

  return api<ApiResponse<Complaint[]>>(
    `/complaints${queryString ? `?${queryString}` : ""}`,
  );
};

// Get current citizen's complaints
export const getMyComplaints = async (): Promise<ApiResponse<Complaint[]>> => {
  return api<ApiResponse<Complaint[]>>("/complaints/my");
};

// Get single complaint by ID
export const getComplaintById = async (
  complaintId: string,
): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${complaintId}`);
};

// Create complaint
export const createComplaint = async (data: {
  title: string;
  description: string;
  location: string;
  categoryId: string;
  image?: File | null;
}): Promise<ApiResponse<Complaint>> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("location", data.location);
  formData.append("categoryId", data.categoryId);

  if (data.image) {
    formData.append("image", data.image);
  }

  return api<ApiResponse<Complaint>>("/complaints", {
    method: "POST",
    body: formData,
  });
};

// Update complaint status by admin
export const updateComplaintAdminStatus = async ({
  complaintId,
  status,
}: {
  complaintId: string;
  status: ComplaintStatus;
}): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(
    `/complaints/${complaintId}/admin-status`,
    {
      method: "PATCH",
      body: {
        status,
      },
    },
  );
};

// Update complaint status by officer
export const updateComplaintStatus = async ({
  complaintId,
  status,
}: {
  complaintId: string;
  status: ComplaintStatus;
}): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${complaintId}/status`, {
    method: "PATCH",
    body: {
      status,
    },
  });
};

// Cancel complaint by citizen
export const cancelComplaint = async (
  complaintId: string,
): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${complaintId}/cancel`, {
    method: "PATCH",
  });
};
