export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELED";

export interface PaymentCitizen {
  id: string;
  name: string;
  email: string;
}

export interface PaymentService {
  name: string;
}

export interface PaymentServiceRequest {
  service: PaymentService;
}

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

  citizen?: PaymentCitizen;

  serviceRequest: PaymentServiceRequest;
}

export interface CreatePaymentData {
  serviceRequestId: string;
}

export interface CreatePaymentResponse {
  payment: Payment;
  checkoutUrl: string;
}
