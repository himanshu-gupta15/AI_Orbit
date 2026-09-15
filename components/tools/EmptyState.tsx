import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
  hasFilters: boolean;
}

export default function EmptyState({ onReset, hasFilters }: EmptyStateProps) {
  return (
    <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-[#232326] bg-[#131316]/50 p-8 sm:p-12 text-center max-w-lg mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-[#18181C] border border-[#232326] flex items-center justify-center text-[#71717a] mb-4">
        <SearchX className="h-7 w-7 text-[#9E7AFF]" />
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-white">
        No tools found
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
        {hasFilters
          ? "Try changing your search keyword, adjusting category, or clearing active filters."
          : "We couldn't find any tools matching your criteria in the directory."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#6E56CF] px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear all filters</span>
        </button>
      )}
    </div>
  );
}
