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

export interface ServicePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ServiceListResponse {
  data: Service[];
  pagination: ServicePagination;
}

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
