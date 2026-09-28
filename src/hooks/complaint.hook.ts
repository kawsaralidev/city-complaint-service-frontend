import { useQuery } from "@tanstack/react-query";

import { getComplaints } from "@/services/complaint.service";

import type { ComplaintQueryParams } from "@/types/complaint";

const complaintsQueryKey = ["complaints"];

export function useComplaints(params?: ComplaintQueryParams) {
  return useQuery({
    queryKey: [...complaintsQueryKey, params],
    queryFn: () => getComplaints(params),
  });
}
