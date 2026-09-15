import Link from "next/link";
import { FileQuestion, ArrowLeft, Search } from "lucide-react";

export default function ToolNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#232326] bg-[#131316] text-[#6E56CF]">
        <FileQuestion className="h-8 w-8" />
      </div>

      <h1 className="text-xl font-bold text-white sm:text-2xl">
        Tool Not Found
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
        We couldn&apos;t find an AI tool matching this URL slug in the AI Orbit directory. It may have been renamed or removed.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/tools"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95"
        >
          <Search className="h-4 w-4" />
          <span>Browse All Tools</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#232326] bg-[#131316] px-5 py-2.5 text-xs font-semibold text-[#a1a1aa] hover:text-white hover:bg-[#18181c] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back Home</span>
        </Link>
      </div>
    </div>
  );
}
