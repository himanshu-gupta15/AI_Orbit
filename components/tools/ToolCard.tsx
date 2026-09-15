"use client";

import Link from "next/link";
import { Star, CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import { Tool } from "@/types/tool";
import Image from "next/image";
import { useState } from "react";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [imgError, setImgError] = useState(false);

  // Pricing badge color mapping
  const getPricingBadge = (pricing: string) => {
    switch (pricing?.toLowerCase()) {
      case "free":
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Free
          </span>
        );
      case "freemium":
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#6E56CF]/15 text-[#9E7AFF] border border-[#6E56CF]/30">
            Freemium
          </span>
        );
      case "paid":
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Paid
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/10">
            {pricing}
          </span>
        );
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#232326] bg-[#131316] p-4 transition-all duration-200 hover:border-[#38383e] hover:bg-[#16161a] hover:shadow-lg hover:shadow-black/40">
      {/* Top Section: Logo, Title, Verified, Rating */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#27272a] bg-[#18181C] flex items-center justify-center shadow-inner">
              {!imgError && tool.logo ? (
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-sm bg-gradient-to-br from-[#27272a] to-[#18181c] text-[#9E7AFF]">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="font-semibold text-sm text-white group-hover:text-[#9E7AFF] transition-colors truncate focus:outline-none"
                >
                  {tool.name}
                </Link>
                {tool.verified && (
                  <CheckCircle className="h-3.5 w-3.5 text-[#6E56CF] shrink-0" />
                )}
                {tool.featured && (
                  <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-[#a1a1aa] truncate font-medium">
                  {tool.category}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#3f3f46]"></span>
                <div className="flex items-center gap-0.5 text-amber-400 text-[11px] font-medium">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span>{tool.rating.toFixed(1)}</span>
                  <span className="text-[#71717a] text-[10px] font-normal">
                    ({tool.reviewCount >= 1000 ? `${(tool.reviewCount / 1000).toFixed(1)}k` : tool.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0">{getPricingBadge(tool.pricing)}</div>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-xs leading-relaxed text-[#a1a1aa] line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Footer Details: Platforms & Navigation Action */}
      <div className="mt-4 pt-3 border-t border-[#1f1f23] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {Array.isArray(tool.platforms) &&
            tool.platforms.slice(0, 3).map((platform) => (
              <span
                key={platform}
                className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-[#71717a] border border-white/5 whitespace-nowrap"
              >
                {platform}
              </span>
            ))}
          {Array.isArray(tool.platforms) && tool.platforms.length > 3 && (
            <span className="text-[10px] text-[#52525b]">
              +{tool.platforms.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {tool.websiteUrl && (
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-[#71717a] hover:text-white transition-colors"
              title="Visit tool website"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <Link
            href={`/tools/${tool.slug}`}
            className="text-[11px] font-medium text-[#9E7AFF] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Details</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
