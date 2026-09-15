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

  const user = data?.data;

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Welcome to CityCare</h1>
        <p className="mt-2">Please log in to continue.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

      <p className="mt-2">Email: {user.email}</p>

      <p className="mt-2">Role: {user.role}</p>
    </main>
  );
}
