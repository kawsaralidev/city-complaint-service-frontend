import type { ApiPaginatedData } from "./api";
import type { Service } from "./service";

export type ServiceRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "PAYMENT_PENDING"
  | "CONFIRMED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELED";

export interface ServiceRequest {
  id: string;
  citizenId: string;
  serviceId: string;
  description: string | null;
  location: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  amount: string;
  status: ServiceRequestStatus;
  confirmedAt: string | null;
  assignedAt: string | null;
  completedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  service: Service;
  payment?: ServiceRequestPayment | null;
  assignment?: ServiceRequestAssignment | null;
}

export interface ServiceRequestPayment {
  id: string;
  serviceRequestId?: string;
  citizenId?: string;
  amount: string;
  currency: string;
  status: string;
  stripeSessionId?: string | null;
  stripePaymentId?: string | null;
  initiatedAt?: string | null;
  paidAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceRequestAssignment {
  id: string;
  officerId: string;
  serviceRequestId: string;
  assignedBy: string;
  assignedAt: string;
}

export interface CreateServiceRequestData {
  serviceId: string;
  description?: string;
  location: string;
  image?: File;
}

export interface ServiceRequestListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ServiceRequestStatus;
  serviceId?: string;
  sortOrder?: "asc" | "desc";
}

export type ServiceRequestListResponse = ApiPaginatedData<ServiceRequest>;

export interface ReviewServiceRequestData {
  status: "APPROVED" | "REJECTED";
}

export interface AssignServiceRequestData {
  officerId: string;
}

export interface UpdateServiceRequestStatusData {
  status: "IN_PROGRESS" | "COMPLETED";
}
