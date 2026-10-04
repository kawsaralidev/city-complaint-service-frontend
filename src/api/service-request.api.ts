import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  AssignServiceRequestData,
  CreateServiceRequestData,
  ReviewServiceRequestData,
  ServiceRequest,
  ServiceRequestListParams,
  ServiceRequestListResponse,
  UpdateServiceRequestStatusData,
} from "@/types/service-request";

const buildServiceRequestQuery = (
  params?: ServiceRequestListParams,
): string => {
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params?.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.status) {
    searchParams.set("status", params.status);
  }

  if (params?.serviceId) {
    searchParams.set("serviceId", params.serviceId);
  }

  if (params?.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  return searchParams.toString();
};

export const createServiceRequest = async (
  data: CreateServiceRequestData,
): Promise<ServiceRequest> => {
  const formData = new FormData();

  formData.append("serviceId", data.serviceId);
  formData.append("location", data.location);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api<ApiResponse<ServiceRequest>>("/service-requests", {
    method: "POST",
    body: formData,
  });

  return response.data;
};

export const getAllServiceRequests = async (
  params?: ServiceRequestListParams,
): Promise<ServiceRequestListResponse> => {
  const query = buildServiceRequestQuery(params);

  const response = await api<ApiResponse<ServiceRequestListResponse>>(
    query ? `/service-requests?${query}` : "/service-requests",
  );

  return response.data;
};

export const getMyServiceRequests = async (): Promise<ServiceRequest[]> => {
  const response = await api<ApiResponse<ServiceRequest[]>>(
    "/service-requests/my-service-request",
  );

  return response.data;
};

export const getAssignedServiceRequests = async (): Promise<
  ServiceRequest[]
> => {
  const response = await api<ApiResponse<ServiceRequest[]>>(
    "/service-requests/assigned",
  );

  return response.data;
};

export const getServiceRequestById = async (
  id: string,
): Promise<ServiceRequest> => {
  const response = await api<ApiResponse<ServiceRequest>>(
    `/service-requests/${id}`,
  );

  return response.data;
};

export const assignServiceRequest = async (
  id: string,
  data: AssignServiceRequestData,
): Promise<ServiceRequest> => {
  const response = await api<ApiResponse<ServiceRequest>>(
    `/service-requests/${id}/assign`,
    {
      method: "PATCH",
      body: data,
    },
  );

  return response.data;
};

export const reviewServiceRequest = async (
  id: string,
  data: ReviewServiceRequestData,
): Promise<ServiceRequest> => {
  const response = await api<ApiResponse<ServiceRequest>>(
    `/service-requests/${id}/service-request-status`,
    {
      method: "PATCH",
      body: data,
    },
  );

  return response.data;
};

export const updateServiceRequestStatus = async (
  id: string,
  data: UpdateServiceRequestStatusData,
): Promise<ServiceRequest> => {
  const response = await api<ApiResponse<ServiceRequest>>(
    `/service-requests/${id}/status`,
    {
      method: "PATCH",
      body: data,
    },
  );

  return response.data;
};

export const deleteServiceRequest = async (
  id: string,
): Promise<ServiceRequest> => {
  const response = await api<ApiResponse<ServiceRequest>>(
    `/service-requests/${id}`,
    {
      method: "DELETE",
    },
  );

  return response.data;
};

// export const serviceRequestService = {
//   createServiceRequest,
//   getAllServiceRequests,
//   getMyServiceRequests,
//   getAssignedServiceRequests,
//   getServiceRequestById,
//   assignServiceRequest,
//   reviewServiceRequest,
//   updateServiceRequestStatus,
//   deleteServiceRequest,
// };
