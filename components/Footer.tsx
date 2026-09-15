"use client";

import Link from "next/link";
import { ArrowUp, Orbit } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 120);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Matrix LED dot simulation
    const dotSpacing = 16;
    const cols = Math.floor(width / dotSpacing);
    const rows = Math.floor(height / dotSpacing);

    let offset = 0;

    const render = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      offset += 0.03;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * dotSpacing + dotSpacing / 2;
          const y = r * dotSpacing + dotSpacing / 2;

          // Wave equation
          const wave = Math.sin(c * 0.15 + offset) * Math.cos(r * 0.2 + offset);
          const intensity = Math.max(0.08, (wave + 1) / 2);

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);

          if (intensity > 0.65) {
            ctx.fillStyle = `rgba(110, 86, 207, ${intensity})`; // Purple glow
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.25})`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black text-white pt-0 font-sans border-t border-[#1C1C1F] mt-20">
      {/* AI Orbit LED Matrix Display */}
      <section
        aria-label="AI Orbit LED display"
        className="w-full bg-black border-b border-[#1C1C1F] overflow-hidden relative"
        style={{ height: "100px" }}
      >
        <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] text-[#a1a1aa] uppercase tracking-widest font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE ECOSYSTEM TELEMETRY
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-14">
          {/* Brand Info */}
          <div className="w-full lg:w-[380px] shrink-0">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#6E56CF] to-[#9E7AFF] flex items-center justify-center text-white">
                <Orbit className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-white">
                AI ORBIT
              </span>
            </Link>
            <p className="text-[13px] sm:text-[14px] text-[#e4e4e7] mb-2 font-medium">
              The Home of Everything AI.
            </p>
            <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#a1a1aa] mb-5 max-w-[340px]">
              Discover, compare, and leverage the most advanced AI tools, models, and workflows shaping the frontier.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-[#71717A]">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Discord"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Directory Columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.1em] uppercase mb-1">
                  EXPLORE
                </h3>
                <div className="h-px w-10 bg-[#3f3f46]"></div>
              </div>
              <ul className="space-y-2 text-[12px] sm:text-[13px] text-[#a1a1aa]">
                <li>
                  <Link href="/tools" className="hover:text-white transition-colors">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/tools?category=Coding" className="hover:text-white transition-colors">
                    Coding AI
                  </Link>
                </li>
                <li>
                  <Link href="/tools?category=Productivity" className="hover:text-white transition-colors">
                    Productivity
                  </Link>
                </li>
                <li>
                  <Link href="/tools?category=Design" className="hover:text-white transition-colors">
                    Design & UI
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.1em] uppercase mb-1">
                  DISCOVER
                </h3>
                <div className="h-px w-10 bg-[#3f3f46]"></div>
              </div>
              <ul className="space-y-2 text-[12px] sm:text-[13px] text-[#a1a1aa]">
                <li>
                  <Link href="/tools?sort=rating" className="hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/tools?sort=newest" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/tools?pricing=Free" className="hover:text-white transition-colors">
                    Free AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/tools?pricing=Freemium" className="hover:text-white transition-colors">
                    Freemium Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.1em] uppercase mb-1">
                  ECOSYSTEM
                </h3>
                <div className="h-px w-10 bg-[#3f3f46]"></div>
              </div>
              <ul className="space-y-2 text-[12px] sm:text-[13px] text-[#a1a1aa]">
                <li>
                  <Link href="/tools?action=submit" className="hover:text-white transition-colors">
                    Submit AI
                  </Link>
                </li>
                <li>
                  <Link href="/tools?platform=API" className="hover:text-white transition-colors">
                    Developer APIs
                  </Link>
                </li>
                <li>
                  <Link href="/tools?category=Developer+Tools" className="hover:text-white transition-colors">
                    Agent Tooling
                  </Link>
                </li>
                <li>
                  <Link href="/tools?category=Research" className="hover:text-white transition-colors">
                    Research Models
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-white tracking-[0.1em] uppercase mb-1">
                  PLATFORM
                </h3>
                <div className="h-px w-10 bg-[#3f3f46]"></div>
              </div>
              <ul className="space-y-2 text-[12px] sm:text-[13px] text-[#a1a1aa]">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About AI Orbit
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 pb-8 border-t border-[#232326] flex items-center justify-between text-[12px] text-[#71717A]">
          <p>© 2026 AI Orbit. All rights reserved. Built for the AI Ecosystem.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3f3f46] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
