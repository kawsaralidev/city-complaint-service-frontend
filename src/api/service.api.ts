import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  CreateServiceData,
  Service,
  ServiceListParams,
  ServiceListResponse,
  UpdateServiceData,
} from "@/types/service";

const buildServiceQuery = (params?: ServiceListParams): string => {
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

  if (params?.minFee !== undefined) {
    searchParams.set("minFee", params.minFee.toString());
  }

  if (params?.maxFee !== undefined) {
    searchParams.set("maxFee", params.maxFee.toString());
  }

  if (params?.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  return searchParams.toString();
};

export const createService = async (
  data: CreateServiceData,
): Promise<Service> => {
  const response = await api<ApiResponse<Service>>("/services", {
    method: "POST",
    body: data,
  });

  return response.data;
};

export const getActiveServices = async (
  params?: ServiceListParams,
): Promise<ServiceListResponse> => {
  const query = buildServiceQuery(params);

  const response = await api<ApiResponse<ServiceListResponse>>(
    query ? `/services?${query}` : "/services",
  );

  return response.data;
};

export const getAllServices = async (
  params?: ServiceListParams,
): Promise<ServiceListResponse> => {
  const query = buildServiceQuery(params);

  const response = await api<ApiResponse<ServiceListResponse>>(
    query ? `/services/all?${query}` : "/services/all",
  );

  return response.data;
};

export const updateService = async (
  id: string,
  data: UpdateServiceData,
): Promise<Service> => {
  const response = await api<ApiResponse<Service>>(`/services/${id}`, {
    method: "PATCH",
    body: data,
  });

  return response.data;
};
