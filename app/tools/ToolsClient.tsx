"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tool, ToolsPagination, CategoryItem } from "@/types/tool";
import ToolCard from "@/components/tools/ToolCard";
import ToolFilters from "@/components/tools/ToolFilters";
import Pagination from "@/components/tools/Pagination";
import LoadingSkeleton from "@/components/tools/LoadingSkeleton";
import EmptyState from "@/components/tools/EmptyState";
import ErrorState from "@/components/tools/ErrorState";
import SubmitToolModal from "@/components/tools/SubmitToolModal";
import { Sparkles, Layers } from "lucide-react";

export default function ToolsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initial values from query params
  const initialCategory = searchParams.get("category") || "All";
  const initialPricing = searchParams.get("pricing") || "All";
  const initialPlatform = searchParams.get("platform") || "All";
  const initialSort = searchParams.get("sort") || "popular";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // States
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [pricing, setPricing] = useState(initialPricing);
  const [platform, setPlatform] = useState(initialPlatform);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(isNaN(initialPage) ? 1 : initialPage);

  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [pagination, setPagination] = useState<ToolsPagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(
    searchParams.get("action") === "submit"
  );

  // Synchronize state when URL searchParams change (e.g. from navbar clicks)
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "All";
    const urlPricing = searchParams.get("pricing") || "All";
    const urlPlatform = searchParams.get("platform") || "All";
    const urlSort = searchParams.get("sort") || "popular";
    const urlSearch = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    const urlAction = searchParams.get("action");

    setCategory(urlCategory);
    setPricing(urlPricing);
    setPlatform(urlPlatform);
    setSort(urlSort);
    setSearch(urlSearch);
    setPage(isNaN(urlPage) ? 1 : urlPage);
    if (urlAction === "submit") {
      setSubmitModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseSubmitModal = () => {
    setSubmitModalOpen(false);
    if (searchParams.get("action") === "submit") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("action");
      const qs = params.toString();
      router.replace(qs ? `/tools?${qs}` : "/tools", { scroll: false });
    }
  };

  // Sync state to URL search parameters
  const updateUrlParams = useCallback(
    (newParams: {
      search?: string;
      category?: string;
      pricing?: string;
      platform?: string;
      sort?: string;
      page?: number;
    }) => {
      const params = new URLSearchParams();

      const s = newParams.search !== undefined ? newParams.search : search;
      const c = newParams.category !== undefined ? newParams.category : category;
      const pr = newParams.pricing !== undefined ? newParams.pricing : pricing;
      const pl = newParams.platform !== undefined ? newParams.platform : platform;
      const so = newParams.sort !== undefined ? newParams.sort : sort;
      const pg = newParams.page !== undefined ? newParams.page : page;

      if (s) params.set("search", s);
      if (c && c.toLowerCase() !== "all") params.set("category", c);
      if (pr && pr.toLowerCase() !== "all") params.set("pricing", pr);
      if (pl && pl.toLowerCase() !== "all") params.set("platform", pl);
      if (so && so !== "popular") params.set("sort", so);
      if (pg && pg > 1) params.set("page", pg.toString());

      const queryString = params.toString();
      const newUrl = queryString ? `/tools?${queryString}` : "/tools";
      router.replace(newUrl, { scroll: false });
    },
    [search, category, pricing, platform, sort, page, router]
  );

  // Fetch Categories list once
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/tools/categories");
        if (res.ok) {
          const json = await res.json();
          setCategories(json.data || []);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  // Fetch Tools matching current filters
  const fetchTools = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (category && category.toLowerCase() !== "all") params.set("category", category);
      if (pricing && pricing.toLowerCase() !== "all") params.set("pricing", pricing);
      if (platform && platform.toLowerCase() !== "all") params.set("platform", platform);
      if (sort) params.set("sort", sort);
      params.set("page", page.toString());
      params.set("limit", "12");

      const response = await fetch(`/api/tools?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch tools (Status ${response.status})`);
      }

      const json = await response.json();
      setTools(json.data || []);
      if (json.pagination) {
        setPagination(json.pagination);
      }
    } catch (err: unknown) {
      console.error("Error loading tools:", err);
      setError(err instanceof Error ? err.message : "Failed to load tools.");
    } finally {
      setIsLoading(false);
    }
  }, [search, category, pricing, platform, sort, page]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  // Handlers
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
    updateUrlParams({ search: val, page: 1 });
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
    updateUrlParams({ category: cat, page: 1 });
  };

  const handlePricingChange = (pr: string) => {
    setPricing(pr);
    setPage(1);
    updateUrlParams({ pricing: pr, page: 1 });
  };

  const handlePlatformChange = (pl: string) => {
    setPlatform(pl);
    setPage(1);
    updateUrlParams({ platform: pl, page: 1 });
  };

  const handleSortChange = (so: string) => {
    setSort(so);
    setPage(1);
    updateUrlParams({ sort: so, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams({ page: newPage });
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setPricing("All");
    setPlatform("All");
    setSort("popular");
    setPage(1);
    router.replace("/tools", { scroll: false });
  };

  const hasActiveFilters =
    search !== "" ||
    category !== "All" ||
    pricing !== "All" ||
    platform !== "All" ||
    sort !== "popular";

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
      {/* Title & Introduction Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232326]/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#6E56CF]/15 text-[#9E7AFF] border border-[#6E56CF]/30">
              <Sparkles className="h-3 w-3" />
              Verified Directory
            </span>
            <span className="text-xs text-[#71717a]">Updated Daily</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            AI Tools
            <span className="text-xs sm:text-sm font-medium px-2 py-0.5 rounded-md bg-white/5 text-[#a1a1aa] border border-[#232326]">
              {pagination.total} Available
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] max-w-2xl leading-relaxed">
            Discover, compare, and benchmark the premier artificial intelligence products, developer tools, and workflow systems in the global ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#232326] bg-[#131316] text-xs text-[#a1a1aa]">
            <Layers className="h-3.5 w-3.5 text-[#6E56CF]" />
            <span>Server Filtered & Paginated</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8">
        <ToolFilters
          search={search}
          onSearchChange={handleSearchChange}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          selectedPricing={pricing}
          onPricingChange={handlePricingChange}
          selectedPlatform={platform}
          onPlatformChange={handlePlatformChange}
          selectedSort={sort}
          onSortChange={handleSortChange}
          categories={categories}
          totalResults={pagination.total}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Main Content Area */}
      <div>
        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchTools} />
        ) : tools.length === 0 ? (
          <EmptyState onReset={handleResetFilters} hasFilters={hasActiveFilters} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Tool Submission Modal */}
      <SubmitToolModal
        isOpen={submitModalOpen}
        onClose={handleCloseSubmitModal}
      />
    </div>
  );
}
