import type { ApiPaginatedData } from "./api";

export interface Service {
  id: string;
  name: string;
  description: string | null;
  baseFee: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceListParams {
  page?: number;
  limit?: number;
  search?: string;
  minFee?: number;
  maxFee?: number;
  sortOrder?: "asc" | "desc";
}

export type ServiceListResponse = ApiPaginatedData<Service>;

export interface CreateServiceData {
  name: string;
  description?: string;
  baseFee: number;
}

export interface UpdateServiceData {
  name?: string;
  description?: string;
  baseFee?: number;
  isActive?: boolean;
}
