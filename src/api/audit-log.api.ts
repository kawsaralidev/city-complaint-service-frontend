import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { AuditLogsResponse, GetAuditLogsParams } from "@/types/audit-log";

export const getAuditLogs = async (
  params: GetAuditLogsParams = {},
): Promise<AuditLogsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.action) {
    searchParams.set("action", params.action);
  }

  if (params.entity) {
    searchParams.set("entity", params.entity);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();

  const response = await api<ApiResponse<AuditLogsResponse>>(
    `/audit-logs${query ? `?${query}` : ""}`,
  );

  return response.data;
};
