"use client";

import { useCurrentUser } from "@/hooks/auth.hook";

export default function HomePage() {
  const { data, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load user</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {data?.data.name}</h1>

      <p className="mt-2">Email: {data?.data.email}</p>

      <p className="mt-2">Role: {data?.data.role}</p>
    </main>
  );
}
