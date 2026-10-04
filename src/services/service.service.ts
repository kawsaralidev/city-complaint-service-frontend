import { api } from "@/lib/api";
import {
  CreateServiceData,
  Service,
  ServiceListParams,
  ServiceListResponse,
  UpdateServiceData,
} from "@/types/service";

const createService = async (data: CreateServiceData): Promise<Service> => {
  return api<Service>("/services", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const getActiveServices = async (
  params?: ServiceListParams,
): Promise<ServiceListResponse> => {
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

  const query = searchParams.toString();

  const response = await api<{
    data: ServiceListResponse;
  }>(query ? `/services?${query}` : "/services", {
    method: "GET",
  });

  return response.data;
};

const getAllServices = async (
  params?: ServiceListParams,
): Promise<ServiceListResponse> => {
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

  const query = searchParams.toString();

  const response = await api<{
    data: ServiceListResponse;
  }>(query ? `/services/all?${query}` : "/services/all", {
    method: "GET",
  });

  return response.data;
};

const updateService = async (
  id: string,
  data: UpdateServiceData,
): Promise<Service> => {
  return api<Service>(`/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const serviceService = {
  createService,
  getActiveServices,
  getAllServices,
  updateService,
};
