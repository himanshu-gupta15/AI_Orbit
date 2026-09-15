import Link from "next/link";
import ToolCard from "@/components/tools/ToolCard";
import { ArrowRight, Sparkles, Layers, Terminal, Shield, Zap } from "lucide-react";
import { toolRepository } from "@/repositories/tool.repository";
import { toolService } from "@/services/tool.service";

export default async function HomePage() {
  const [featuredToolsRaw, totalTools] = await Promise.all([
    toolRepository.findMany({
      where: { isFeatured: true },
      take: 8,
      orderBy: { rating: "desc" },
    }),
    toolRepository.count(),
  ]);

  const featuredTools = featuredToolsRaw.map((tool) => toolService.parseTool(tool));

  const popularCategories = [
    { name: "Coding", count: "8 tools", color: "from-blue-500/20 to-purple-500/20" },
    { name: "Productivity", count: "6 tools", color: "from-purple-500/20 to-pink-500/20" },
    { name: "Image", count: "5 tools", color: "from-emerald-500/20 to-teal-500/20" },
    { name: "Video", count: "4 tools", color: "from-amber-500/20 to-orange-500/20" },
    { name: "Audio", count: "4 tools", color: "from-red-500/20 to-pink-500/20" },
    { name: "Developer Tools", count: "5 tools", color: "from-indigo-500/20 to-cyan-500/20" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#6E56CF]/15 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#6E56CF]/30 bg-[#6E56CF]/10 px-3 py-1 text-xs font-semibold text-[#9E7AFF] mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Global Directory for Frontier AI</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Discover, Compare &amp; Build With{" "}
          <span className="bg-gradient-to-r from-white via-[#d4c7ff] to-[#6E56CF] bg-clip-text text-transparent">
            AI Tools
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
          Explore curated, verified artificial intelligence tools across engineering, design, writing, and business automation with real-time filtering, rankings, and deep specifications.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-6 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg shadow-[#6E56CF]/25"
          >
            <span>Explore {totalTools} AI Tools</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/tools?pricing=Free"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#232326] bg-[#131316] px-6 text-sm font-semibold text-white hover:bg-[#18181c] hover:border-[#38383e] transition-all"
          >
            <span>Browse Free Tools</span>
          </Link>
        </div>

        {/* Key Features Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-[#232326] bg-[#131316]/50 p-4">
            <Layers className="h-5 w-5 text-[#6E56CF] mb-2" />
            <h3 className="text-xs font-bold text-white">Full Stack Filtering</h3>
            <p className="text-[11px] text-[#71717a] mt-1">Multi-attribute query engine with zero page reloads</p>
          </div>
          <div className="rounded-xl border border-[#232326] bg-[#131316]/50 p-4">
            <Terminal className="h-5 w-5 text-emerald-400 mb-2" />
            <h3 className="text-xs font-bold text-white">RESTful Endpoints</h3>
            <p className="text-[11px] text-[#71717a] mt-1">Robust backend APIs powering listing and related items</p>
          </div>
          <div className="rounded-xl border border-[#232326] bg-[#131316]/50 p-4">
            <Zap className="h-5 w-5 text-amber-400 mb-2" />
            <h3 className="text-xs font-bold text-white">Debounced Search</h3>
            <p className="text-[11px] text-[#71717a] mt-1">High-speed server search across names, tags, and blurbs</p>
          </div>
          <div className="rounded-xl border border-[#232326] bg-[#131316]/50 p-4">
            <Shield className="h-5 w-5 text-blue-400 mb-2" />
            <h3 className="text-xs font-bold text-white">Prisma Database</h3>
            <p className="text-[11px] text-[#71717a] mt-1">Typed SQLite data layer with 35+ realistic records</p>
          </div>
        </div>
      </section>

      {/* Category Pills Section */}
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-wide">
            Explore By Category
          </h2>
          <Link
            href="/tools"
            className="text-xs font-semibold text-[#9E7AFF] hover:underline"
          >
            All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/tools?category=${encodeURIComponent(cat.name)}`}
              className="group rounded-xl border border-[#232326] bg-[#131316] p-4 hover:border-[#38383e] hover:bg-[#16161a] transition-all"
            >
              <h3 className="text-xs font-bold text-white group-hover:text-[#9E7AFF] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#71717a] mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools Grid Section */}
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Featured AI Tools
            </h2>
            <p className="text-xs text-[#71717a] mt-0.5">
              Handpicked standout products in the AI ecosystem
            </p>
          </div>

          <Link
            href="/tools"
            className="text-xs font-semibold text-[#9E7AFF] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All Tools</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
