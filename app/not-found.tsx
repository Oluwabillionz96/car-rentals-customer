"use client";

import EmptyState from "@/components/empty-state";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <EmptyState
        title="Page Not Found"
        description="We couldn't find the page you're looking for. It might have been moved or deleted."
        icon={AlertCircle}
        actionLabel="Go back to Home"
        actionHref="/"
      />
    </div>
  );
}
