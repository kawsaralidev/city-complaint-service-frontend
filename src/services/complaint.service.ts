import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";

import type { Complaint, ComplaintQueryParams } from "@/types/complaint";

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
