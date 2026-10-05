export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELED";

export interface Payment {
  id: string;
  serviceRequestId: string;
  citizenId: string;
  amount: string;
  currency: string;
  stripeSessionId?: string | null;
  stripePaymentId?: string | null;
  status: PaymentStatus;
  initiatedAt?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  serviceRequestId: string;
}

export interface CreatePaymentResponse {
  payment: Payment;
  checkoutUrl: string;
}
