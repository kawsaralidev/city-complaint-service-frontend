import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboardAnalytics,
  getAdminDashboardOverview,
} from "@/api/dashboard.api";

const adminDashboardOverviewQueryKey = ["admin-dashboard-overview"];

const adminDashboardAnalyticsQueryKey = ["admin-dashboard-analytics"];


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
