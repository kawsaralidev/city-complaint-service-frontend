"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createService,
  getActiveServices,
  getAllServices,
  updateService,
} from "@/api/service.api";

import type {
  CreateServiceData,
  ServiceListParams,
  UpdateServiceData,
} from "@/types/service";

const servicesQueryKey = ["services"] as const;

export const useActiveServices = (params?: ServiceListParams) => {
  return useQuery({
    queryKey: [...servicesQueryKey, "active", params],
    queryFn: () => getActiveServices(params),
  });
};

export const useAllServices = (params?: ServiceListParams) => {
  return useQuery({
    queryKey: [...servicesQueryKey, "all", params],
    queryFn: () => getAllServices(params),
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceData) => createService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceData }) =>
      updateService(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKey,
      });
    },
  });
};
