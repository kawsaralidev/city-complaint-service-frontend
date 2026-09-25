import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  AdminDashboardAnalytics,
  AdminDashboardOverview,
  Category,
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

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api<ApiResponse<Category[]>>("/categories");

  return response.data;
};
