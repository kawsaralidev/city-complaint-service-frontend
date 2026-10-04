"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AssignServiceRequestData,
  CreateServiceRequestData,
  ReviewServiceRequestData,
  ServiceRequestListParams,
  UpdateServiceRequestStatusData,
} from "@/types/service-request";

import { serviceRequestService } from "@/services/service-request.service";

export const useCreateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceRequestData) =>
      serviceRequestService.createServiceRequest(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
      });
    },
  });
};

export const useAllServiceRequests = (params?: ServiceRequestListParams) => {
  return useQuery({
    queryKey: ["service-requests", "all", params],
    queryFn: () => serviceRequestService.getAllServiceRequests(params),
  });
};

export const useMyServiceRequests = () => {
  return useQuery({
    queryKey: ["service-requests", "my"],
    queryFn: () => serviceRequestService.getMyServiceRequests(),
  });
};

export const useAssignedServiceRequests = () => {
  return useQuery({
    queryKey: ["service-requests", "assigned"],
    queryFn: () => serviceRequestService.getAssignedServiceRequests(),
  });
};

export const useServiceRequestById = (id: string) => {
  return useQuery({
    queryKey: ["service-requests", id],
    queryFn: () => serviceRequestService.getServiceRequestById(id),
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
    }) => serviceRequestService.assignServiceRequest(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
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
    }) => serviceRequestService.reviewServiceRequest(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
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
    }) => serviceRequestService.updateServiceRequestStatus(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
      });
    },
  });
};

export const useDeleteServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => serviceRequestService.deleteServiceRequest(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
      });
    },
  });
};
