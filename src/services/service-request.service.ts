import { api } from "@/lib/api";
import {
  AssignServiceRequestData,
  CreateServiceRequestData,
  ReviewServiceRequestData,
  ServiceRequest,
  ServiceRequestListParams,
  ServiceRequestListResponse,
  UpdateServiceRequestStatusData,
} from "@/types/service-request";

const createServiceRequest = async (
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

  const response = await api<ServiceRequest>("/service-requests", {
    method: "POST",
    body: formData,
  });

  return response;
};

const getAllServiceRequests = async (
  params?: ServiceRequestListParams,
): Promise<ServiceRequestListResponse> => {
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

  const query = searchParams.toString();

  const response = await api<{
    data: ServiceRequestListResponse;
  }>(query ? `/service-request?${query}` : "/service-request", {
    method: "GET",
  });

  return response.data;
};

const getMyServiceRequests = async (): Promise<ServiceRequest[]> => {
  const response = await api<{
    data: ServiceRequest[];
  }>("/service-requests/my-service-request", {
    method: "GET",
  });

  return response.data;
};

const getAssignedServiceRequests = async (): Promise<ServiceRequest[]> => {
  const response = await api<ServiceRequest[]>("/service-requests/assigned", {
    method: "GET",
  });

  return response;
};

const getServiceRequestById = async (id: string): Promise<ServiceRequest> => {
  const response = await api<{
    data: ServiceRequest;
  }>(`/service-requests/${id}`, {
    method: "GET",
  });

  return response.data;
};

const assignServiceRequest = async (
  id: string,
  data: AssignServiceRequestData,
): Promise<ServiceRequest> => {
  const response = await api<ServiceRequest>(`/service-requests/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return response;
};

const reviewServiceRequest = async (
  id: string,
  data: ReviewServiceRequestData,
): Promise<ServiceRequest> => {
  const response = await api<ServiceRequest>(
    `/service-requests/${id}/service-request-status`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );

  return response;
};

const updateServiceRequestStatus = async (
  id: string,
  data: UpdateServiceRequestStatusData,
): Promise<ServiceRequest> => {
  const response = await api<ServiceRequest>(`/service-requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return response;
};

const deleteServiceRequest = async (id: string): Promise<ServiceRequest> => {
  const response = await api<ServiceRequest>(`/service-requests/${id}`, {
    method: "DELETE",
  });

  return response;
};

export const serviceRequestService = {
  createServiceRequest,
  getAllServiceRequests,
  getMyServiceRequests,
  getAssignedServiceRequests,
  getServiceRequestById,
  assignServiceRequest,
  reviewServiceRequest,
  updateServiceRequestStatus,
  deleteServiceRequest,
};
