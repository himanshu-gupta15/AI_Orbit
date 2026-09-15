"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Menu, X, Plus, Sparkles, Orbit, Bookmark, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function HeaderContent() {
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category")?.toLowerCase() || "";
  const currentSort = searchParams.get("sort")?.toLowerCase() || "";
  const isToolsRoot = pathname === "/tools" && !currentCategory && !currentSort;

  const isBusinessActive = currentCategory === "business";
  const isLeaderboardActive = currentSort === "rating";
  const isDeveloperActive =
    currentCategory === "developer" ||
    currentCategory === "developer tools" ||
    currentCategory === "coding";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232326] bg-black/80 backdrop-blur-md py-2 px-4 sm:px-8">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between relative">
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#6E56CF] to-[#9E7AFF] flex items-center justify-center text-white shadow-lg shadow-[#6E56CF]/20 transition-transform group-hover:scale-105">
              <Orbit className="h-4 w-4 animate-spin" style={{ animationDuration: "16s" }} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white flex items-center gap-1">
                AI ORBIT
                <span className="h-1.5 w-1.5 rounded-full bg-[#6E56CF] inline-block animate-pulse"></span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#71717A] hidden sm:block -mt-1 font-medium">
                The AI Ecosystem
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <Link
            href="/tools"
            className={`text-[12px] font-bold transition-colors relative py-1 ${isToolsRoot ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
          >
            AI Tools
            {isToolsRoot && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6E56CF] rounded-full"></span>
            )}
          </Link>

          <Link
            href="/tools?category=Business"
            className={`text-[12px] font-bold transition-colors relative py-1 ${isBusinessActive ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
          >
            Business AI
            {isBusinessActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6E56CF] rounded-full"></span>
            )}
          </Link>

          <Link
            href="/tools?sort=rating"
            className={`text-[12px] font-bold transition-colors flex items-center gap-1 relative py-1 ${isLeaderboardActive
              ? "text-white"
              : "text-[#6E56CF] hover:text-[#9E7AFF]"
              }`}
          >
            <Sparkles className="h-3 w-3 text-[#6E56CF]" />
            Leaderboard
            {isLeaderboardActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6E56CF] rounded-full"></span>
            )}
          </Link>

          <Link
            href="/tools?category=Developer"
            className={`text-[12px] font-bold transition-colors relative py-1 ${isDeveloperActive ? "text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
          >
            Developer
            {isDeveloperActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6E56CF] rounded-full"></span>
            )}
          </Link>

          <a
            href="#newsletter"
            className="text-[12px] font-bold text-[#a1a1aa] hover:text-white transition-colors"
          >
            Newsletter
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">


          <Link
            href="/tools?action=submit"
            className="group inline-flex h-[28px] items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all duration-200 hover:brightness-110 active:scale-95 shrink-0 bg-[#6E56CF] text-white shadow-md shadow-[#6E56CF]/20"
          >
            <Plus className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
            <span className=" xs:inline">Submit Tool</span>
          </Link>

          {/* Auth Section */}
          {loading ? (
            <div className="h-[28px] w-16 bg-[#18181C] animate-pulse rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/saved"
                className="inline-flex h-[28px] items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold text-[#9E7AFF] hover:text-white border border-[#6E56CF]/30 hover:border-[#6E56CF] bg-[#6E56CF]/10 transition-all"
                title="Saved Tools"
              >
                <Bookmark className="h-3.5 w-3.5 fill-[#6E56CF]/40 text-[#9E7AFF]" />
                <span className="hidden md:inline">Saved</span>
              </Link>

              <div className="relative flex items-center gap-1.5 pl-1">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover border border-[#38383e]"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-[#232326] flex items-center justify-center text-xs font-bold text-white border border-[#38383e]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-medium text-zinc-300 hidden lg:inline max-w-[90px] truncate">
                  {user.name}
                </span>

                <button
                  type="button"
                  onClick={() => logout()}
                  className="p-1 rounded-md text-[#71717a] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-[28px] items-center px-3 text-[11px] font-semibold text-[#a1a1aa] hover:text-white transition-colors"
              >
                Log In
              </Link>

            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#232326] flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-semibold bg-[#18181C] text-white flex items-center justify-between"
          >
            <span>All AI Tools</span>
            <span className="text-[10px] text-[#6E56CF]">Explore</span>
          </Link>
          <Link
            href="/tools?category=Business"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5"
          >
            Business AI
          </Link>
          <Link
            href="/tools?sort=rating"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-medium text-[#6E56CF] hover:bg-[#6E56CF]/10"
          >
            Leaderboard (Top Rated)
          </Link>
          <Link
            href="/tools?category=Developer"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5"
          >
            Developer Tools
          </Link>
          <Link
            href="/tools?pricing=Free"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-xs font-medium text-emerald-400 hover:bg-emerald-500/10"
          >
            100% Free Tools
          </Link>
        </div>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 w-full border-b border-[#232326] bg-black/80 backdrop-blur-md py-2 px-4 sm:px-8">
          <div className="mx-auto max-w-[1440px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#18181C]" />
              <div className="h-4 w-24 bg-[#18181C] rounded" />
            </div>
            <div className="h-7 w-24 rounded-full bg-[#6E56CF]" />
          </div>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
