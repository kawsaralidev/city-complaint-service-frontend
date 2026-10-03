"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, UserRound } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAdminUsers, useUpdateUserStatus } from "@/hooks/user.hook";
import RoleGuard from "../../guard/role-guard";

const AdminUsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const limit = 10;

  const { data, isLoading, isError } = useAdminUsers({
    page,
    limit,
    search: search || undefined,
    sortOrder: "desc",
  });

  const { mutate: updateUserStatus } = useUpdateUserStatus();

  const users = data?.data || [];
  const pagination = data?.pagination;

  // Search users
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Change user status
  const handleStatusChange = (
    userId: string,
    currentStatus: "ACTIVE" | "BLOCKED" | "DELETED",
  ) => {
    // Deleted users cannot be activated or blocked
    if (currentStatus === "DELETED") {
      return;
    }

    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    setUpdatingUserId(userId);

    updateUserStatus(
      {
        userId,
        status: newStatus,
      },
      {
        onSettled: () => {
          setUpdatingUserId(null);
        },
      },
    );
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Users
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor all registered users.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-xl border border-border bg-background p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <Table className="min-w-[950px] table-fixed">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-[30%]  text-[16px] px-5 py-4">
                    User
                  </TableHead>

                  <TableHead className="w-[12%] text-[16px] px-5 py-4">
                    Role
                  </TableHead>

                  <TableHead className="w-[12%] text-[16px] px-5 py-4">
                    Status
                  </TableHead>

                  <TableHead className="w-[18%] text-[16px] px-5 py-4">
                    Email Verified
                  </TableHead>

                  <TableHead className="w-[16%] text-[16px] px-5 py-4">
                    Joined
                  </TableHead>

                  <TableHead className="w-[12%] text-[16px] px-5 py-4 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Loading */}
                {isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      Loading users...
                    </TableCell>
                  </TableRow>
                )}

                {/* Error */}
                {isError && !isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      Failed to load users.
                    </TableCell>
                  </TableRow>
                )}

                {/* Empty */}
                {!isLoading && !isError && users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}

                {/* Users */}
                {!isLoading &&
                  !isError &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      {/* User */}
                      <TableCell className="w-[30%] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
                            {user.imageUrl ? (
                              <Image
                                src={user.imageUrl}
                                alt={user.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <UserRound className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {user.name}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role */}
                      <TableCell className="w-[12%] px-5 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {user.role}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="w-[12%] px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.status === "ACTIVE"
                              ? "bg-secondary/10 text-secondary"
                              : user.status === "BLOCKED"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>

                      {/* Email Verified */}
                      <TableCell className="w-[18%] px-5 py-4">
                        <span className="text-sm text-foreground">
                          {user.emailVerified ? "Verified" : "Not verified"}
                        </span>
                      </TableCell>

                      {/* Joined */}
                      <TableCell className="w-[16%] px-5 py-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="w-[12%] px-5 py-4 text-right">
                        {user.status === "ACTIVE" ||
                        user.status === "BLOCKED" ? (
                          <button
                            type="button"
                            disabled={updatingUserId === user.id}
                            onClick={() =>
                              handleStatusChange(user.id, user.status)
                            }
                            className={`inline-flex h-8 w-[80px] items-center justify-center rounded-lg text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              user.status === "ACTIVE"
                                ? "border border-destructive/30 text-destructive hover:bg-destructive/10"
                                : "border border-secondary/30 text-secondary hover:bg-secondary/10"
                            }`}
                          >
                            {updatingUserId === user.id
                              ? "Updating..."
                              : user.status === "ACTIVE"
                                ? "Block"
                                : "Activate"}
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No action
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading &&
            !isError &&
            pagination &&
            pagination.totalPages > 0 && (
              <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {users.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {pagination.total}
                  </span>{" "}
                  users
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((current) => current - 1)}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
                    {pagination.page}
                  </div>

                  <button
                    type="button"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminUsersPage;
