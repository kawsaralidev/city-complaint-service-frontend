import { useQuery } from "@tanstack/react-query";

import { getAuditLogs } from "@/api/audit-log.api";

import type { GetAuditLogsParams } from "@/types/audit-log";

const auditLogsQueryKey = ["audit-logs"];

export function useAuditLogs(params: GetAuditLogsParams = {}) {
  return useQuery({
    queryKey: [...auditLogsQueryKey, params],
    queryFn: () => getAuditLogs(params),
  });
}
