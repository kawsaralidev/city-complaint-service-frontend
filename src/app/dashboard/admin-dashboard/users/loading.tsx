import { Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUsersLoading() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl  bg-background p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-[950px] table-fixed">
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[30%] px-5 py-4">
                  <Skeleton className="h-5 w-16" />
                </TableHead>

                <TableHead className="w-[12%] px-5 py-4">
                  <Skeleton className="h-5 w-12" />
                </TableHead>

                <TableHead className="w-[12%] px-5 py-4">
                  <Skeleton className="h-5 w-14" />
                </TableHead>

                <TableHead className="w-[18%] px-5 py-4">
                  <Skeleton className="h-5 w-28" />
                </TableHead>

                <TableHead className="w-[16%] px-5 py-4">
                  <Skeleton className="h-5 w-16" />
                </TableHead>

                <TableHead className="w-[12%] px-5 py-4 text-right">
                  <Skeleton className="ml-auto h-5 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {/* User: Avatar, Name and Email */}
                  <TableCell className="w-[30%] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-4 w-32 max-w-full" />
                        <Skeleton className="h-3 w-40 max-w-full" />
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="w-[12%] px-5 py-4">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>

                  {/* Status */}
                  <TableCell className="w-[12%] px-5 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>

                  {/* Email Verified */}
                  <TableCell className="w-[18%] px-5 py-4">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>

                  {/* Joined */}
                  <TableCell className="w-[16%] px-5 py-4">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>

                  {/* Action */}
                  <TableCell className="w-[12%] px-5 py-4 text-right">
                    <Skeleton className="ml-auto h-8 w-[80px] rounded-lg" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-4 w-40" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
