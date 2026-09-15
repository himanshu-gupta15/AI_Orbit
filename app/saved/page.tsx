"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ToolCard from "@/components/tools/ToolCard";
import { Tool } from "@/types/tool";
import { Bookmark, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface FavoriteItem {
  favoriteId: string;
  savedAt: string;
  tool: Tool;
}

export default function SavedToolsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/saved");
      return;
    }

    if (user) {
      fetchFavorites();
    }
  }, [user, authLoading, router]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const json = await res.json();
        setFavorites(json.data?.favorites || []);
      }
    } catch (err) {
      console.error("Failed to load favorites", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-[#6E56CF]" />
        <p className="text-xs text-[#71717a]">Loading your saved tools...</p>
      </div>
    );
  }

  if (!user) {
    return null; // redirecting to login
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6E56CF]/10 blur-3xl pointer-events-none z-0" />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:py-12 relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6E56CF]/30 bg-[#6E56CF]/10 px-3 py-1 text-xs font-semibold text-[#9E7AFF] w-fit">
            <Bookmark className="h-3.5 w-3.5 fill-[#6E56CF]/40" />
            <span>Your Personal Library</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Saved AI Tools
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa]">
            Curated list of AI tools you have bookmarked for easy reference and workflows.
          </p>
        </div>

        {/* Tools Grid or Empty State */}
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-[#232326] bg-[#131316]/60 p-12 text-center max-w-lg mx-auto mt-8">
            <div className="h-12 w-12 rounded-2xl bg-[#18181C] border border-[#27272a] mx-auto flex items-center justify-center text-[#71717a] mb-4">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No saved tools yet</h3>
            <p className="text-xs text-[#71717a] max-w-xs mx-auto mb-6">
              When browsing the directory, click &quot;Save Tool&quot; on any tool detail page to add it to your library.
            </p>
            <Link
              href="/tools"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-5 text-xs font-bold text-white transition-all hover:brightness-110 shadow-lg shadow-[#6E56CF]/20"
            >
              <span>Explore AI Directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4 text-xs text-[#71717a]">
              <span>Showing {favorites.length} saved {favorites.length === 1 ? "tool" : "tools"}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((fav) => (
                <div key={fav.favoriteId} className="relative group">
                  <ToolCard tool={fav.tool} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
