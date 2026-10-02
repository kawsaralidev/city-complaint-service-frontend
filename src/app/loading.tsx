export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl border bg-muted"
            />
          ))}
        </div>

        <div className="h-64 animate-pulse rounded-xl border bg-muted" />
      </div>
    </div>
  );
}
