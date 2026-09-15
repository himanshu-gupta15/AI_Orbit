"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { ToolsPagination } from "@/types/tool";

interface PaginationProps {
  pagination: ToolsPagination;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const { page, limit, total, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  // Calculate start and end count
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Generate pagination numbers array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-[#1f1f23]">
      {/* Results details */}
      <p className="text-xs text-[#71717a]">
        Showing <span className="text-white font-medium">{startItem}</span> to{" "}
        <span className="text-white font-medium">{endItem}</span> of{" "}
        <span className="text-white font-medium">{total}</span> tools
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 px-2.5 rounded-lg border border-[#232326] bg-[#131316] text-xs font-medium text-white flex items-center gap-1 hover:border-[#38383e] hover:bg-[#18181c] disabled:opacity-40 disabled:pointer-events-none transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === "...") {
              return (
                <div
                  key={`ellipsis-${idx}`}
                  className="h-8 w-8 flex items-center justify-center text-[#71717a]"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </div>
              );
            }

            const num = p as number;
            const isCurrent = num === page;

            return (
              <button
                key={num}
                type="button"
                onClick={() => onPageChange(num)}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-[#6E56CF] text-white font-semibold shadow-xs"
                    : "border border-[#232326] bg-[#131316] text-[#a1a1aa] hover:text-white hover:border-[#38383e] hover:bg-[#18181c]"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 px-2.5 rounded-lg border border-[#232326] bg-[#131316] text-xs font-medium text-white flex items-center gap-1 hover:border-[#38383e] hover:bg-[#18181c] disabled:opacity-40 disabled:pointer-events-none transition-all"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
