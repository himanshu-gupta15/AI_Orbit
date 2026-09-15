export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading tools"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-xl border border-[#232326] bg-[#131316] p-4 h-[190px]"
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-lg bg-[#18181C] animate-pulse border border-[#232326]" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-28 rounded bg-[#18181C] animate-pulse" />
                  <div className="h-3 w-16 rounded bg-[#18181C] animate-pulse" />
                </div>
              </div>
              <div className="h-5 w-14 rounded-md bg-[#18181C] animate-pulse" />
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="h-3 w-full rounded bg-[#18181C] animate-pulse" />
              <div className="h-3 w-3/4 rounded bg-[#18181C] animate-pulse" />
            </div>
          </div>

          <div className="pt-3 border-t border-[#1f1f23] flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="h-4 w-10 rounded bg-[#18181C] animate-pulse" />
              <div className="h-4 w-12 rounded bg-[#18181C] animate-pulse" />
            </div>
            <div className="h-4 w-12 rounded bg-[#18181C] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
