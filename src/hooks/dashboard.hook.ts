import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboardAnalytics,
  getAdminDashboardOverview,
  getCategories,
} from "@/services/dashboard.service";

const adminDashboardOverviewQueryKey = ["admin-dashboard-overview"];

const adminDashboardAnalyticsQueryKey = ["admin-dashboard-analytics"];

const categoriesQueryKey = ["categories"];

// Get admin dashboard overview
export function useAdminDashboardOverview() {
  return useQuery({
    queryKey: adminDashboardOverviewQueryKey,
    queryFn: getAdminDashboardOverview,
  });
}

// Get admin dashboard analytics
export function useAdminDashboardAnalytics() {
  return useQuery({
    queryKey: adminDashboardAnalyticsQueryKey,
    queryFn: getAdminDashboardAnalytics,
  });
}

// Get all categories
export function useCategories() {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
}
