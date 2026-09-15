import { Suspense } from "react";
import ToolsClient from "./ToolsClient";
import LoadingSkeleton from "@/components/tools/LoadingSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools — Browse the Full Directory | AI Orbit",
  description:
    "Search and filter the complete directory of AI tools by category, pricing, and rating. Find the right tool for writing, coding, image generation, and workflow automation.",
};

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col gap-3">
            <div className="h-8 w-40 rounded-lg bg-[#18181C] animate-pulse" />
            <div className="h-4 w-72 rounded bg-[#18181C] animate-pulse" />
          </div>
          <LoadingSkeleton count={12} />
        </div>
      }
    >
      <ToolsClient />
    </Suspense>
  );
}
