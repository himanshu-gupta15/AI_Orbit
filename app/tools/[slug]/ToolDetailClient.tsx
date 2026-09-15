"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Share2, Bookmark, Check, ExternalLink, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { trackActivity } from "@/lib/tracker";

interface InteractiveActionsProps {
  toolId?: string;
  toolName: string;
  websiteUrl: string;
  initialFavorited?: boolean;
}

export default function InteractiveActions({
  toolId,
  toolName,
  websiteUrl,
  initialFavorited = false,
}: InteractiveActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialFavorited);
  const [saving, setSaving] = useState(false);

  // Track VIEW_TOOL activity on mount
  useEffect(() => {
    if (toolId) {
      trackActivity("VIEW_TOOL", {
        toolId,
        metadata: { toolName, path: pathname },
      });
    }
  }, [toolId, toolName, pathname]);

  // If user is logged in and toolId is provided, check favorite status from server
  useEffect(() => {
    if (user && toolId) {
      fetch(`/api/favorites/${toolId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data?.favorited !== undefined) {
            setBookmarked(json.data.favorited);
          }
        })
        .catch(() => {});
    }
  }, [user, toolId]);

  const handleVisitWebsite = () => {
    if (toolId) {
      trackActivity("VISIT_WEBSITE", {
        toolId,
        metadata: { toolName, websiteUrl },
      });
    }
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (toolId) {
          trackActivity("SHARE_TOOL", {
            toolId,
            metadata: { toolName },
          });
        }
      }
    } catch (e) {
      console.error("Could not copy URL:", e);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      // Redirect to login if user tries to save without an account
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!toolId || saving) return;

    const nextState = !bookmarked;
    setBookmarked(nextState); // Optimistic UI update
    setSaving(true);

    try {
      const method = nextState ? "POST" : "DELETE";
      const res = await fetch(`/api/favorites/${toolId}`, { method });
      if (!res.ok) {
        // Rollback on failure
        setBookmarked(!nextState);
      }
    } catch (e) {
      console.error("Failed to update favorite:", e);
      setBookmarked(!nextState);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleVisitWebsite}
          className="flex-1 sm:flex-none inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-5 text-xs font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-[#6E56CF]/20"
        >
          <span>Visit Website</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <button
        type="button"
        onClick={handleShare}
        className="h-10 px-3.5 rounded-xl border border-[#232326] bg-[#131316] text-xs font-medium text-[#a1a1aa] hover:text-white hover:border-[#38383e] hover:bg-[#18181c] flex items-center gap-1.5 transition-all"
        title="Share link"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleBookmark}
        disabled={saving}
        className={`h-10 px-3.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
          bookmarked
            ? "border-[#6E56CF] bg-[#6E56CF]/15 text-[#9E7AFF]"
            : "border-[#232326] bg-[#131316] text-[#a1a1aa] hover:text-white hover:border-[#38383e] hover:bg-[#18181c]"
        } disabled:opacity-75`}
        title={bookmarked ? "Remove from saved" : "Save to library"}
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin text-[#9E7AFF]" />
        ) : (
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-[#9E7AFF]" : ""}`} />
        )}
        <span className="hidden sm:inline">
          {bookmarked ? "Saved" : "Save"}
        </span>
      </button>
    </div>
  );
}
