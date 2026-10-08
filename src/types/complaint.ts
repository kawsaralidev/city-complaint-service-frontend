export type ComplaintStatus =
  | "PENDING"
  | "APPROVED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELED";

export interface ComplaintQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ComplaintStatus;
  categoryId?: string;
  sortOrder?: "asc" | "desc";
}

export interface ComplaintListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ComplaintStatus;
  categoryId?: string;
  sortOrder?: "asc" | "desc";
}

export interface PublicComplaint {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  imageUrl?: string | null;
  assignedAt?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
    type: "COMPLAINT" | "SERVICE";
  };

  assignment?: ComplaintAssignment | null;
}

export interface ComplaintListResponse {
  data: Complaint[];
  meta: ComplaintPagination;
}

export interface ComplaintPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ComplaintCategory {
  id: string;
  name: string;
  type: "COMPLAINT" | "SERVICE";
  isActive: boolean;
}

export interface ComplaintCitizen {
  id: string;
  name: string;
  email: string;
}

export interface ComplaintOfficer {
  id: string;
  name: string;
  imageUrl?: string | null;
}

export interface ComplaintAssignment {
  id: string;
  officerId: string;
  assignedBy: string;
  assignedAt: string;

  officer?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
  } | null;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  imageUrl?: string | null;
  assignedAt?: string | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  category: ComplaintCategory;

  citizen: ComplaintCitizen;

  assignment?: ComplaintAssignment | null;
}

export interface GetComplaintsResponse {
  complaints: Complaint[];
  pagination: ComplaintPagination;
}
