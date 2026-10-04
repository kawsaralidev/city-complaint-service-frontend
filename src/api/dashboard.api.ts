import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  AdminDashboardAnalytics,
  AdminDashboardOverview,
} from "@/types/dashboard";

// Get admin dashboard overview
export const getAdminDashboardOverview =
  async (): Promise<AdminDashboardOverview> => {
    const response = await api<ApiResponse<AdminDashboardOverview>>(
      "/dashboard/admin/overview",
    );

    return response.data;
  };

// Get admin dashboard analytics
export const getAdminDashboardAnalytics =
  async (): Promise<AdminDashboardAnalytics> => {
    const response = await api<ApiResponse<AdminDashboardAnalytics>>(
      "/dashboard/admin/analytics",
    );

    return response.data;
  };
