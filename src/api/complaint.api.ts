import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import type {
  Complaint,
  ComplaintQueryParams,
  ComplaintStatus,
  GetComplaintsResponse,
  PublicComplaint,
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

  if (params?.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const queryString = searchParams.toString();

  return api<ApiResponse<Complaint[]>>(
    `/complaints${queryString ? `?${queryString}` : ""}`,
  );
};

export const getPublicComplaints = async (
  params?: ComplaintQueryParams,
): Promise<GetComplaintsResponse> => {
  const response = await api<ApiResponse<Complaint[]>>("/complaints/public", {
    method: "GET",
    query: params,
  });

  return {
    complaints: response.data,
    pagination: {
      page: response.meta?.page ?? 1,
      limit: response.meta?.limit ?? 10,
      total: response.meta?.total ?? 0,
      totalPages: response.meta?.totalPages ?? 1,
    },
  };
};

// Get current citizen's complaints
export const getMyComplaints = async (): Promise<ApiResponse<Complaint[]>> => {
  return api<ApiResponse<Complaint[]>>("/complaints/my");
};

// Get single complaint by ID
export const getComplaintById = async (
  id: string,
): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${id}`);
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

// Get active officers
export const getActiveOfficers = async (): Promise<
  ApiResponse<
    {
      id: string;
      name: string;
      imageUrl?: string | null;
    }[]
  >
> => {
  return api<
    ApiResponse<
      {
        id: string;
        name: string;
        imageUrl?: string | null;
      }[]
    >
  >("/complaints/officers");
};

// Assign complaint to officer
export const assignComplaint = async ({
  complaintId,
  officerId,
}: {
  complaintId: string;
  officerId: string;
}): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${complaintId}/assign`, {
    method: "PATCH",
    body: {
      officerId,
    },
  });
};

// Get complaints assigned to current officer
export const getAssignedComplaints = async (): Promise<
  ApiResponse<
    {
      id: string;
      officerId: string;
      complaintId: string;
      assignedBy: string;
      assignedAt: string;
      complaint: Complaint;
    }[]
  >
> => {
  return api<
    ApiResponse<
      {
        id: string;
        officerId: string;
        complaintId: string;
        assignedBy: string;
        assignedAt: string;
        complaint: Complaint;
      }[]
    >
  >("/complaints/assigned");
};

// Delete complaint
export const deleteComplaint = async (
  complaintId: string,
): Promise<ApiResponse<Complaint>> => {
  return api<ApiResponse<Complaint>>(`/complaints/${complaintId}`, {
    method: "DELETE",
  });
};
