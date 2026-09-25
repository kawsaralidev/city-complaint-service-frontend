export interface AdminDashboardOverview {
  users: {
    total: number;
    citizens: number;
    officers: number;
    admins: number;
  };

  complaints: {
    total: number;
    pending: number;
    assigned: number;
    inProgress: number;
    completed: number;
  };

  serviceRequests: {
    total: number;
    pending: number;
    approved: number;
    paymentPending: number;
    confirmed: number;
    assigned: number;
    inProgress: number;
    completed: number;
  };

  payments: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    totalPaidAmount: string;
  };
}

export interface AdminDashboardAnalytics {
  complaints: {
    byStatus: {
      status: string;
      count: number;
    }[];
  };

  serviceRequests: {
    byStatus: {
      status: string;
      count: number;
    }[];
  };

  monthly: {
    month: string;
    complaints: number;
    serviceRequests: number;
    paidAmount: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
