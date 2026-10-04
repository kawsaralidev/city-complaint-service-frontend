"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";

import {
  assignServiceRequest,
  createServiceRequest,
  deleteServiceRequest,
  getAllServiceRequests,
  getAssignedServiceRequests,
  getMyServiceRequests,
  getServiceRequestById,
  reviewServiceRequest,
  updateServiceRequestStatus,
} from "@/api/service-request.api";

import type {
  AssignServiceRequestData,
  CreateServiceRequestData,
  ReviewServiceRequestData,
  ServiceRequestListParams,
  ServiceRequestListResponse,
  UpdateServiceRequestStatusData,
} from "@/types/service-request";

const serviceRequestsQueryKey = ["service-requests"] as const;
const serviceRequestQueryKey = ["service-request"] as const;

export const useCreateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceRequestData) => createServiceRequest(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceRequestsQueryKey,
      });
    },
  });
};

export const useAllServiceRequests = (
  params?: ServiceRequestListParams,
): UseQueryResult<ServiceRequestListResponse, Error> => {
  return useQuery<ServiceRequestListResponse, Error>({
    queryKey: [...serviceRequestsQueryKey, "all", params],
    queryFn: () => getAllServiceRequests(params),
  });
};

export const useMyServiceRequests = () => {
  return useQuery({
    queryKey: [...serviceRequestsQueryKey, "my"],
    queryFn: getMyServiceRequests,
  });
};

export const useAssignedServiceRequests = () => {
  return useQuery({
    queryKey: [...serviceRequestsQueryKey, "assigned"],
    queryFn: getAssignedServiceRequests,
  });
};

export const useServiceRequestById = (id: string) => {
  return useQuery({
    queryKey: [...serviceRequestQueryKey, id],
    queryFn: () => getServiceRequestById(id),
    enabled: Boolean(id),
  });
};

export const useAssignServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: AssignServiceRequestData;
    }) => assignServiceRequest(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: serviceRequestsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [...serviceRequestQueryKey, variables.id],
      });
    },
  });
};

export const useReviewServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ReviewServiceRequestData;
    }) => reviewServiceRequest(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: serviceRequestsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [...serviceRequestQueryKey, variables.id],
      });
    },
  });
};

export const useUpdateServiceRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateServiceRequestStatusData;
    }) => updateServiceRequestStatus(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: serviceRequestsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [...serviceRequestQueryKey, variables.id],
      });
    },
  });
};

export const useDeleteServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceRequest,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: serviceRequestsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: [...serviceRequestQueryKey, id],
      });
    },
  });
};
