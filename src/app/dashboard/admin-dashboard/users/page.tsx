"use client";

import Image from "next/image";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  MailCheck,
  Search,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserRound,
  UsersRound,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useAdminUsers,
  useUpdateUserRole,
  useUpdateUserStatus,
} from "@/hooks/user.hook";

import RoleGuard from "../../guard/role-guard";

const AdminUsersPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = 10;

  const search = searchParams.get("search") ?? "";

  const pageParam = Number(searchParams.get("page") ?? "1");

  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const [searchInput, setSearchInput] = useState(search);

  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  /*
   * Keep local search input synchronized with browser
   * back/forward navigation.
   */
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  /*
   * Update URL without losing existing query parameters.
   */
  const updateUrl = (updates: { search?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      const trimmedSearch = updates.search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }
    }

    if (updates.page !== undefined) {
      if (updates.page > 1) {
        params.set("page", String(updates.page));
      } else {
        params.delete("page");
      }
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  /*
   * Fetch users.
   */
  const { data, isLoading, isError } = useAdminUsers({
    page,
    limit,
    search: search || undefined,
    sortOrder: "desc",
  });

  /*
   * Mutations.
   */
  const { mutate: updateUserStatus } = useUpdateUserStatus();
  const { mutate: updateUserRole } = useUpdateUserRole();

  const users = data?.data || [];
  const pagination = data?.pagination;

  /*
   * Search submit.
   */
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
      page: 1,
    });
  };

  /*
   * Clear search.
   */
  const handleClearSearch = () => {
    setSearchInput("");

    updateUrl({
      search: "",
      page: 1,
    });
  };

  /*
   * Change user status.
   */
  const handleStatusChange = (
    userId: string,
    currentStatus: "ACTIVE" | "BLOCKED" | "DELETED",
  ) => {
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

  /*
   * Change user role.
   */
  const handleRoleChange = (userId: string, userName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to convert ${userName} from Citizen to Officer?`,
    );

    if (!confirmed) {
      return;
    }

    setUpdatingUserId(userId);

    updateUserRole(userId, {
      onSettled: () => {
        setUpdatingUserId(null);
      },
    });
  };

  /*
   * Pagination.
   */
  const handlePreviousPage = () => {
    if (page <= 1) {
      return;
    }

    updateUrl({
      page: page - 1,
    });
  };

  const handleNextPage = () => {
    if (!pagination || page >= pagination.totalPages) {
      return;
    }

    updateUrl({
      page: page + 1,
    });
  };

  /*
   * Page statistics.
   *
   * Total users comes from backend pagination.
   * Other values represent the currently loaded page.
   */
  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const officerUsers = users.filter((user) => user.role === "OFFICER").length;

  const verifiedUsers = users.filter((user) => user.emailVerified).length;

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full w-full bg-muted/20 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* =========================================================
              PAGE HEADER
          ========================================================= */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div>
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                      User Management
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Usres
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                      Manage citizens, officers, account status, and
                      verification from one place.
                    </p>
                  </div>
                </div>
              </div>

              {/* Total users */}
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary shadow-sm ring-1 ring-border">
                  <UsersRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Total users
                  </p>

                  <p className="text-xl font-bold tracking-tight text-foreground">
                    {pagination?.total ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              STAT CARDS
          ========================================================= */}
          <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {pagination?.total ?? 0}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Registered platform users
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UsersRound className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Active */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {activeUsers}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    On current page
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Officers */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Officers
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {officerUsers}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    On current page
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Verified */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Verified
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {verifiedUsers}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Verified on current page
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <MailCheck className="h-5 w-5" />
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              SEARCH / TOOLBAR
          ========================================================= */}
          <section className="mb-5 rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  All users
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Search users by name or email address.
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="text"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search by name or email..."
                    className="h-11 w-full rounded-xl border border-border bg-muted/20 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
                  />

                  {searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>
            </div>

            {search && (
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <CircleDot className="h-3.5 w-3.5 text-primary" />

                <p className="text-xs text-muted-foreground">
                  Showing results for{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{search}&quot;
                  </span>
                </p>
              </div>
            )}
          </section>

          {/* =========================================================
              DESKTOP TABLE
          ========================================================= */}
          <section className="hidden overflow-hidden rounded-2xl border border-border bg-background shadow-sm md:block">
            <div className="w-full min-w-0 overflow-x-hidden">
              <Table className="w-full table-fixed border-collapse">
                <TableHeader>
                  <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-[30%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      User
                    </TableHead>

                    <TableHead className="w-[13%] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role
                    </TableHead>

                    <TableHead className="w-[13%] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>

                    <TableHead className="w-[16%] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Verification
                    </TableHead>

                    <TableHead className="w-[13%] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Joined
                    </TableHead>

                    <TableHead className="sticky right-0 z-10 w-[180px] bg-muted/30 px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {/* Loading */}
                  {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={`loading-${index}`}>
                        <TableCell colSpan={6} className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 animate-pulse rounded-full bg-muted" />

                            <div className="space-y-2">
                              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                              <div className="h-2.5 w-48 animate-pulse rounded bg-muted" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                  {/* Error */}
                  {isError && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={6} className="px-6 py-16">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                            <Ban className="h-5 w-5" />
                          </div>

                          <h3 className="text-sm font-semibold text-foreground">
                            Unable to load users
                          </h3>

                          <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                            Something went wrong while fetching the user list.
                            Please try again.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Empty */}
                  {!isLoading && !isError && users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="px-6 py-16">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                            <UsersRound className="h-5 w-5" />
                          </div>

                          <h3 className="text-sm font-semibold text-foreground">
                            No users found
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Try changing your search keyword.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Users */}
                  {!isLoading &&
                    !isError &&
                    users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="group border-border transition-colors hover:bg-muted/20"
                      >
                        {/* User */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 text-primary ring-1 ring-border">
                              {user.imageUrl ? (
                                <Image
                                  src={user.imageUrl}
                                  alt={user.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover"
                                />
                              ) : (
                                <UserRound className="h-5 w-5" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {user.name}
                              </p>

                              <div className="mt-1 flex items-center gap-1.5">
                                <MailCheck className="h-3 w-3 shrink-0 text-muted-foreground" />

                                <p className="truncate text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Role */}
                        <TableCell className="px-5 py-5">
                          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5">
                            <ShieldCheck
                              className={`h-3.5 w-3.5 ${
                                user.role === "OFFICER"
                                  ? "text-violet-500"
                                  : user.role === "ADMIN"
                                    ? "text-amber-500"
                                    : "text-primary"
                              }`}
                            />

                            <span className="text-xs font-semibold text-foreground">
                              {user.role}
                            </span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="px-5 py-5">
                          <StatusBadge status={user.status} />
                        </TableCell>

                        {/* Verification */}
                        <TableCell className="px-5 py-5">
                          {user.emailVerified ? (
                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Verified
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <CircleDot className="h-3.5 w-3.5" />
                              Not verified
                            </div>
                          )}
                        </TableCell>

                        {/* Joined */}
                        <TableCell className="px-5 py-5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />

                            <span>
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="sticky right-0 z-[1] bg-background px-5 py-5 text-right group-hover:bg-muted/20">
                          <div className="flex items-center justify-end gap-2">
                            {user.role === "CITIZEN" &&
                              user.status !== "DELETED" && (
                                <button
                                  type="button"
                                  disabled={updatingUserId === user.id}
                                  onClick={() =>
                                    handleRoleChange(user.id, user.name)
                                  }
                                  title="Make Officer"
                                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 text-xs font-semibold text-violet-600 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 dark:text-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <UserCog className="h-3.5 w-3.5" />

                                  {updatingUserId === user.id
                                    ? "..."
                                    : "Officer"}
                                </button>
                              )}

                            {user.status === "ACTIVE" ||
                            user.status === "BLOCKED" ? (
                              <button
                                type="button"
                                disabled={updatingUserId === user.id}
                                onClick={() =>
                                  handleStatusChange(user.id, user.status)
                                }
                                title={
                                  user.status === "ACTIVE"
                                    ? "Block user"
                                    : "Activate user"
                                }
                                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                                  user.status === "ACTIVE"
                                    ? "border-destructive/20 bg-destructive/5 text-destructive hover:border-destructive/30 hover:bg-destructive/10"
                                    : "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 hover:border-emerald-500/30 hover:bg-emerald-500/10 dark:text-emerald-400"
                                }`}
                              >
                                {user.status === "ACTIVE" ? (
                                  <Ban className="h-3.5 w-3.5" />
                                ) : (
                                  <UserCheck className="h-3.5 w-3.5" />
                                )}

                                {updatingUserId === user.id
                                  ? "..."
                                  : user.status === "ACTIVE"
                                    ? "Block"
                                    : "Activate"}
                              </button>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                No action
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* Desktop Pagination */}
            {!isLoading &&
              !isError &&
              pagination &&
              pagination.totalPages > 0 && (
                <Pagination
                  page={page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  currentCount={users.length}
                  onPrevious={handlePreviousPage}
                  onNext={handleNextPage}
                />
              )}
          </section>

          {/* =========================================================
              MOBILE USER CARDS
          ========================================================= */}
          <section className="space-y-3 md:hidden">
            {/* Loading */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`mobile-loading-${index}`}
                  className="rounded-2xl border border-border bg-background p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-2.5 w-44 animate-pulse rounded bg-muted" />
                    </div>
                  </div>

                  <div className="mt-4 h-10 animate-pulse rounded-xl bg-muted" />
                </div>
              ))}

            {/* Error */}
            {isError && !isLoading && (
              <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <Ban className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  Unable to load users
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Please try again later.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && users.length === 0 && (
              <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <UsersRound className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  No users found
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Try another search keyword.
                </p>
              </div>
            )}

            {/* Mobile users */}
            {!isLoading &&
              !isError &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="p-4">
                    {/* User header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 text-primary ring-1 ring-border">
                          {user.imageUrl ? (
                            <Image
                              src={user.imageUrl}
                              alt={user.name}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : (
                            <UserRound className="h-5 w-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {user.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={user.status} />
                    </div>

                    {/* User details */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-muted/30 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Role
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />

                          <p className="text-xs font-semibold text-foreground">
                            {user.role}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Joined
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />

                          <p className="text-xs font-medium text-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Verification */}
                    <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-muted/20 px-3 py-2.5">
                      <span className="text-xs text-muted-foreground">
                        Email verification
                      </span>

                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">
                          Not verified
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                      {user.role === "CITIZEN" && user.status !== "DELETED" && (
                        <button
                          type="button"
                          disabled={updatingUserId === user.id}
                          onClick={() => handleRoleChange(user.id, user.name)}
                          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/5 text-xs font-semibold text-violet-600 transition-colors hover:bg-violet-500/10 dark:text-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <UserCog className="h-4 w-4" />

                          {updatingUserId === user.id
                            ? "Updating..."
                            : "Make Officer"}
                        </button>
                      )}

                      {user.status === "ACTIVE" || user.status === "BLOCKED" ? (
                        <button
                          type="button"
                          disabled={updatingUserId === user.id}
                          onClick={() =>
                            handleStatusChange(user.id, user.status)
                          }
                          className={`inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                            user.status === "ACTIVE"
                              ? "border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10"
                              : "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                          }`}
                        >
                          {user.status === "ACTIVE" ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}

                          {updatingUserId === user.id
                            ? "Updating..."
                            : user.status === "ACTIVE"
                              ? "Block"
                              : "Activate"}
                        </button>
                      ) : (
                        <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-muted text-xs font-medium text-muted-foreground">
                          No action available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {/* Mobile pagination */}
            {!isLoading &&
              !isError &&
              pagination &&
              pagination.totalPages > 0 && (
                <Pagination
                  page={page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  currentCount={users.length}
                  onPrevious={handlePreviousPage}
                  onNext={handleNextPage}
                />
              )}
          </section>
        </div>
      </div>
    </RoleGuard>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

const StatusBadge = ({ status }: { status: UserStatus }) => {
  const config = {
    ACTIVE: {
      label: "Active",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    BLOCKED: {
      label: "Blocked",
      className: "border-destructive/20 bg-destructive/10 text-destructive",
      dot: "bg-destructive",
    },
    DELETED: {
      label: "Deleted",
      className: "border-border bg-muted text-muted-foreground",
      dot: "bg-muted-foreground",
    },
  };

  const current = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${current.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />

      {current.label}
    </span>
  );
};

/* =========================================================
   PAGINATION
========================================================= */

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  currentCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({
  page,
  totalPages,
  total,
  currentCount,
  onPrevious,
  onNext,
}: PaginationProps) => {
  return (
    <div className="flex flex-col gap-4 border-t border-border bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div>
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{currentCount}</span>{" "}
          of <span className="font-semibold text-foreground">{total}</span>{" "}
          users
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <button
          type="button"
          disabled={page === 1}
          onClick={onPrevious}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />

          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm">
          {page}
        </div>

        <span className="text-xs text-muted-foreground">of {totalPages}</span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={onNext}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AdminUsersPage;
