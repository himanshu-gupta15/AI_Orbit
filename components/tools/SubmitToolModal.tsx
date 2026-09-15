"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitToolModal({ isOpen, onClose }: SubmitToolModalProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Productivity");
  const [pricing, setPricing] = useState("Freemium");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login?redirect=/tools?action=submit");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/tools/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          websiteUrl,
          description,
          category,
          pricing,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to submit tool");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit tool");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#232326] bg-[#131316] p-6 md:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#71717a] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Tool Submitted for Review!</h2>
            <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto leading-relaxed">
              Thank you for contributing to AI Orbit. Our editorial team reviews every listing for safety and quality verification before publishing.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-[#6E56CF] px-6 text-xs font-bold text-white transition-all hover:brightness-110"
            >
              Done
            </button>
          </div>
        ) : !user ? (
          <div className="py-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-[#6E56CF]/15 border border-[#6E56CF]/30 text-[#9E7AFF] mx-auto flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Sign In to Submit a Tool</h2>
            <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto leading-relaxed">
              To keep the directory spam-free and maintain verified author records, please sign in or register an account before submitting tools.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => router.push("/login?redirect=/tools?action=submit")}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#6E56CF] px-5 text-xs font-bold text-white hover:brightness-110 transition-all"
              >
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onClose}
                className="inline-flex h-10 items-center rounded-xl border border-[#27272a] bg-[#18181C] px-5 text-xs font-semibold text-[#a1a1aa] hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-[#6E56CF]/15 text-[#9E7AFF]">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-bold text-white">Submit an AI Tool</h2>
            </div>
            <p className="text-xs text-[#a1a1aa] mb-5">
              Submit an artificial intelligence tool to be featured in the AI Orbit index.
            </p>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#d4d4d8] mb-1">
                  Tool Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cursor, Runway, ElevenLabs"
                  className="w-full rounded-xl border border-[#27272a] bg-[#18181C] px-3.5 py-2 text-xs text-white placeholder-[#71717a] outline-none focus:border-[#6E56CF] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4d4d8] mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-[#27272a] bg-[#18181C] px-3.5 py-2 text-xs text-white placeholder-[#71717a] outline-none focus:border-[#6E56CF] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#d4d4d8] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#27272a] bg-[#18181C] px-3 py-2 text-xs text-white outline-none focus:border-[#6E56CF] transition-all"
                  >
                    <option value="Coding">Coding</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Design">Design</option>
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                    <option value="Writing">Writing</option>
                    <option value="Research">Research</option>
                    <option value="Business">Business</option>
                    <option value="Developer Tools">Developer Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4d4d8] mb-1">
                    Pricing Model
                  </label>
                  <select
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    className="w-full rounded-xl border border-[#27272a] bg-[#18181C] px-3 py-2 text-xs text-white outline-none focus:border-[#6E56CF] transition-all"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4d4d8] mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this AI tool does and its main capabilities..."
                  className="w-full rounded-xl border border-[#27272a] bg-[#18181C] px-3.5 py-2 text-xs text-white placeholder-[#71717a] outline-none focus:border-[#6E56CF] transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#71717a] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-5 text-xs font-bold text-white shadow-md shadow-[#6E56CF]/25 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>Submit for Review</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
