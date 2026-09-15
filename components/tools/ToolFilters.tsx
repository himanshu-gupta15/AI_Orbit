"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { CategoryItem } from "@/types/tool";

interface ToolFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedPricing: string;
  onPricingChange: (pricing: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  categories: CategoryItem[];
  totalResults: number;
  onResetFilters: () => void;
}

const PLATFORMS = [
  { label: "All Platforms", value: "All" },
  { label: "Web", value: "Web" },
  { label: "macOS", value: "macOS" },
  { label: "Windows", value: "Windows" },
  { label: "Linux", value: "Linux" },
  { label: "iOS", value: "iOS" },
  { label: "Android", value: "Android" },
  { label: "API", value: "API" },
];

const PRICING_OPTIONS = [
  { label: "All Pricing", value: "All" },
  { label: "Free", value: "Free" },
  { label: "Freemium", value: "Freemium" },
  { label: "Paid", value: "Paid" },
];

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "A - Z", value: "a-z" },
];

export default function ToolFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
  selectedPlatform,
  onPlatformChange,
  selectedSort,
  onSortChange,
  categories,
  totalResults,
  onResetFilters,
}: ToolFiltersProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [, startTransition] = useTransition();

  // Debounce search query input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        startTransition(() => {
          onSearchChange(localSearch);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const hasActiveFilters =
    search !== "" ||
    selectedCategory !== "All" ||
    selectedPricing !== "All" ||
    selectedPlatform !== "All" ||
    selectedSort !== "popular";

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Search Bar & Fast Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search AI tools by name, description, tags..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#232326] bg-[#131316] text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#6E56CF] transition-colors"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                onSearchChange("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center text-[#71717a] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-44">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717a] pointer-events-none" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full h-11 pl-9 pr-8 rounded-xl border border-[#232326] bg-[#131316] text-xs font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#6E56CF] transition-colors"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#18181c] text-white">
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`sm:hidden h-11 px-3.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              showMobileFilters
                ? "border-[#6E56CF] bg-[#6E56CF]/10 text-[#9E7AFF]"
                : "border-[#232326] bg-[#131316] text-white"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Horizontal Category Nav / Pills */}
      <div className="relative w-full">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
          {categories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#6E56CF] text-white shadow-sm shadow-[#6E56CF]/40"
                    : "bg-[#131316] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c21] border border-[#232326]"
                }`}
              >
                <span>{cat.name}</span>
                {cat.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-black/25 text-white/90"
                        : "bg-white/5 text-[#71717a] group-hover:text-white"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters Bar (Pricing, Platform, Active Badges) */}
      <div
        className={`sm:flex items-center justify-between gap-4 py-2 border-y border-[#1f1f23] ${
          showMobileFilters ? "flex flex-col sm:flex-row" : "hidden sm:flex"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Pricing Selector */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#71717a] font-medium mr-1">Pricing:</span>
            <div className="flex items-center rounded-lg border border-[#232326] bg-[#131316] p-0.5">
              {PRICING_OPTIONS.map((p) => {
                const active = selectedPricing.toLowerCase() === p.value.toLowerCase();
                return (
                  <button
                    key={p.value}
                    onClick={() => onPricingChange(p.value)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      active
                        ? "bg-[#27272a] text-white shadow-xs"
                        : "text-[#71717a] hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#71717a] font-medium mr-1">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => onPlatformChange(e.target.value)}
              className="h-7 px-2.5 rounded-lg border border-[#232326] bg-[#131316] text-[11px] font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#6E56CF]"
            >
              {PLATFORMS.map((pl) => (
                <option key={pl.value} value={pl.value} className="bg-[#18181c] text-white">
                  {pl.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter & Reset CTA */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-[#71717a]">
            Found <span className="text-white font-medium">{totalResults}</span> tools
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#9E7AFF] hover:text-white font-medium flex items-center gap-1 hover:underline transition-colors"
            >
              <X className="h-3 w-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
