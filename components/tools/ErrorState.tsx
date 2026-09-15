import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({
  message = "Something went wrong loading AI tools.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 sm:p-12 text-center max-w-lg mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-white">
        Something went wrong
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-sm">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#232326] bg-[#131316] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#18181c] hover:border-[#38383e] active:scale-95"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Try again</span>
      </button>
    </div>
  );
}
