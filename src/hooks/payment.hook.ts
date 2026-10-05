"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPayment,
  getAllPayments,
  getMyPayments,
} from "@/api/payment.api";

import type { CreatePaymentData } from "@/types/payment";

const paymentsQueryKey = ["payments"];

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentData) => createPayment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["service-request"],
      });
    },
  });
};

export const useMyPayments = () => {
  return useQuery({
    queryKey: [...paymentsQueryKey, "my"],
    queryFn: getMyPayments,
  });
};

export const useAllPayments = () => {
  return useQuery({
    queryKey: [...paymentsQueryKey, "all"],
    queryFn: getAllPayments,
  });
};
