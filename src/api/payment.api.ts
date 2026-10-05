import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  CreatePaymentData,
  CreatePaymentResponse,
  Payment,
} from "@/types/payment";

export const createPayment = async (
  data: CreatePaymentData,
): Promise<CreatePaymentResponse> => {
  const response = await api<ApiResponse<CreatePaymentResponse>>(
    "/payments/create",
    {
      method: "POST",
      body: data,
    },
  );

  return response.data;
};

export const getMyPayments = async (): Promise<Payment[]> => {
  const response = await api<ApiResponse<Payment[]>>("/payments/my-payments");

  return response.data;
};

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await api<ApiResponse<Payment[]>>("/payments");

  return response.data;
};
