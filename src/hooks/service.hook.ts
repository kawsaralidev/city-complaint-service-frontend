"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreateServiceData,
  ServiceListParams,
  UpdateServiceData,
} from "@/types/service";
import { serviceService } from "@/services/service.service";

export const useActiveServices = (params?: ServiceListParams) => {
  return useQuery({
    queryKey: ["services", "active", params],
    queryFn: () => serviceService.getActiveServices(params),
  });
};

export const useAllServices = (params?: ServiceListParams) => {
  return useQuery({
    queryKey: ["services", "all", params],
    queryFn: () => serviceService.getAllServices(params),
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceData) => serviceService.createService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceData }) =>
      serviceService.updateService(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
};
