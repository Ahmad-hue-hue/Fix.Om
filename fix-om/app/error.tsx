"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-bone mb-4">
          Something went wrong
        </h2>
        <p className="text-subtext mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <Button onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}