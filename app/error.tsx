"use client";

import EmptyState from "@/components/empty-state";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-screen">
      <EmptyState
        title="Something went wrong"
        description="An unexpected error occurred while processing your request. Please try again or contact support if the problem persists."
        icon={AlertTriangle}
        actionLabel="Try Again"
        onAction={() => reset()}
      />
    </div>
  );
}
