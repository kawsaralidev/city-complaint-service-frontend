import type { ApiPaginatedData } from "./api";
import type { UserRole } from "./user";

export interface AuditLogUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: unknown;
  createdAt: string;
  user: AuditLogUser;
}

export type AuditLogsResponse = ApiPaginatedData<AuditLog>;

export interface GetAuditLogsParams {
  page?: number;
  limit?: number;
  search?: string;
  action?: string;
  entity?: string;
  sortOrder?: "asc" | "desc";
}
