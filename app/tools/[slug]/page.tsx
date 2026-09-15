import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import InteractiveActions from "./ToolDetailClient";
import {
  Star,
  CheckCircle,
  Sparkles,
  Layers,
  Globe,
  Monitor,
  Check,
  ChevronRight,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

import { toolService } from "@/services/tool.service";
import { toolRepository } from "@/repositories/tool.repository";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all seeded tools at build time
export async function generateStaticParams() {
  try {
    const tools = await toolRepository.findMany({
      select: { slug: true },
    });
    return tools.map((tool) => ({
      slug: tool.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "AI Tool | AI Orbit",
      description: "Discover tools in the AI Orbit directory.",
    };
  }

  const tool = await toolService.getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | AI Orbit",
      description: "The requested AI tool could not be found in the AI Orbit directory.",
    };
  }

  return {
    title: `${tool.name} — AI Tool Details, Pricing & Reviews | AI Orbit`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — AI Tool Directory | AI Orbit`,
      description: tool.description,
      images: [tool.logo],
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const tool = await toolService.getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const platforms = tool.platforms;
  const features = tool.features;
  const useCases = tool.useCases;
  const tags = tool.tags;
  const pricingPlans = tool.pricingPlans;

  const relatedTools = await toolService.getRelatedTools(slug);

  // Pricing badge helper
  const getPricingBadge = (pricing: string) => {
    switch (pricing?.toLowerCase()) {
      case "free":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Free
          </span>
        );
      case "freemium":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#6E56CF]/15 text-[#9E7AFF] border border-[#6E56CF]/30">
            Freemium
          </span>
        );
      case "paid":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Paid
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
            {pricing}
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* AI Orbit Purple Ambient Glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6E56CF]/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-10 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 md:mb-6 flex items-center gap-1.5 text-xs text-[#71717a]"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#52525b]" />
          <Link href="/tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="h-3 w-3 text-[#52525b]" />
          <Link
            href={`/tools?category=${encodeURIComponent(tool.category)}`}
            className="hover:text-white transition-colors"
          >
            {tool.category}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#52525b]" />
          <span className="text-white font-medium truncate max-w-[200px]">
            {tool.name}
          </span>
        </nav>

        {/* Hero Header Card */}
        <div className="flex flex-col gap-6 rounded-xl border border-[#232326]/80 bg-[#131316]/50 p-5 md:p-7 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Logo & Headline */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#27272a] bg-[#18181C] shadow-lg shadow-black/40">
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {tool.name}
                  </h1>
                  {tool.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-[#9E7AFF] bg-[#6E56CF]/10 px-2 py-0.5 rounded-full border border-[#6E56CF]/20">
                      <CheckCircle className="h-3.5 w-3.5 text-[#6E56CF]" />
                      <span>Verified Tool</span>
                    </div>
                  )}
                  {tool.featured && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Subtitle / Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 pt-0.5">
                  <Link
                    href={`/tools?category=${encodeURIComponent(tool.category)}`}
                    className="text-xs font-semibold text-[#a1a1aa] hover:text-white transition-colors"
                  >
                    {tool.category}
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-[#3f3f46]"></span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
                    <span className="text-[#71717a] font-normal">
                      ({tool.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-[#3f3f46]"></span>
                  <div>{getPricingBadge(tool.pricing)}</div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <InteractiveActions
              toolId={tool.id}
              toolName={tool.name}
              websiteUrl={tool.websiteUrl}
              initialFavorited={tool.isFavorited}
            />
          </div>

          <hr className="border-[#232326]/80" />

          {/* Short Description & Tags */}
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed text-[#d4d4d8]">
              {tool.description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tools?search=${encodeURIComponent(tag)}`}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-[#a1a1aa] hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Main Body Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] items-start gap-8 lg:gap-10">
          {/* Main Left Column: Overview, Features, Use Cases, Pricing */}
          <div className="space-y-8">
            {/* Section 1: Overview */}
            <section className="rounded-xl border border-[#232326] bg-[#131316] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-[#6E56CF]" />
                <h2 className="text-base font-bold text-white tracking-wide">
                  Overview
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-[#a1a1aa] whitespace-pre-line">
                {tool.longDescription}
              </p>
            </section>

            {/* Section 2: Key Features */}
            {features.length > 0 && (
              <section className="rounded-xl border border-[#232326] bg-[#131316] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="h-4 w-4 text-[#6E56CF]" />
                  <h2 className="text-base font-bold text-white tracking-wide">
                    Key Features
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-[#232326] bg-[#18181C]/60 p-3.5"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#6E56CF]/15 flex items-center justify-center text-[#9E7AFF] shrink-0 mt-0.5">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs leading-relaxed text-[#d4d4d8] font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 3: Use Cases */}
            {useCases.length > 0 && (
              <section className="rounded-xl border border-[#232326] bg-[#131316] p-6 shadow-sm">
                <h2 className="text-base font-bold text-white tracking-wide mb-4">
                  Common Use Cases
                </h2>

                <div className="space-y-2.5">
                  {useCases.map((uc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-[#1f1f23] bg-[#16161a] px-4 py-3 text-xs text-[#a1a1aa]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6E56CF]"></span>
                      <span className="text-white font-medium">{uc}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 4: Pricing Plans */}
            {pricingPlans.length > 0 && (
              <section className="rounded-xl border border-[#232326] bg-[#131316] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-base font-bold text-white tracking-wide">
                    Pricing & Plans
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pricingPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-xl border border-[#232326] bg-[#18181C] p-4 hover:border-[#38383e] transition-all"
                    >
                      <div>
                        <span className="text-xs font-bold text-[#9E7AFF] uppercase tracking-wider">
                          {plan.tier}
                        </span>
                        <div className="text-lg font-extrabold text-white mt-1">
                          {plan.price}
                        </div>
                        <p className="mt-2 text-xs text-[#a1a1aa] leading-relaxed">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Metadata & Related Tools */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="rounded-xl border border-[#232326] bg-[#131316] p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider border-b border-[#232326] pb-3">
                Tool Specifications
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> Category
                  </span>
                  <span className="font-semibold text-white">{tool.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" /> Pricing Model
                  </span>
                  <span className="font-semibold text-white">{tool.pricing}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" /> Rating
                  </span>
                  <span className="font-semibold text-amber-400">
                    {tool.rating.toFixed(1)} / 5.0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verification
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {tool.verified ? "Verified" : "Unverified"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#71717a] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Last Updated
                  </span>
                  <span className="text-[#a1a1aa]">
                    {new Date(tool.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#1f1f23]">
                  <span className="text-[#71717a] block mb-2 flex items-center gap-1.5">
                    <Monitor className="h-3.5 w-3.5" /> Supported Platforms
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded bg-[#18181C] text-[11px] font-medium text-white border border-[#232326]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {tool.websiteUrl && (
                  <div className="pt-3 border-t border-[#1f1f23]">
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-9 rounded-lg border border-[#232326] bg-[#18181C] hover:bg-[#1f1f24] hover:text-white text-xs font-semibold text-[#a1a1aa] flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Globe className="h-3.5 w-3.5 text-[#6E56CF]" />
                      <span>Official Website</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Related Tools Card */}
            <div className="rounded-xl border border-[#232326] bg-[#131316] p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#232326] pb-3 mb-4">
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider">
                  Related AI Tools
                </h3>
                <Link
                  href={`/tools?category=${encodeURIComponent(tool.category)}`}
                  className="text-[11px] text-[#9E7AFF] hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/tools/${rel.slug}`}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-[#232326] transition-all"
                  >
                    <div className="h-9 w-9 rounded-lg overflow-hidden bg-[#18181C] border border-[#27272a] shrink-0">
                      <Image
                        src={rel.logo}
                        alt={`${rel.name} thumbnail`}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#9E7AFF] transition-colors truncate">
                          {rel.name}
                        </h4>
                        <span className="text-[10px] text-amber-400 font-medium flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-amber-400" />
                          {rel.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#71717a] truncate mt-0.5">
                        {rel.category} • {rel.pricing}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Directory CTA */}
            <Link
              href="/tools"
              className="w-full h-10 rounded-xl border border-[#232326] bg-[#131316] hover:bg-[#18181c] hover:border-[#38383e] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all AI Tools</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
