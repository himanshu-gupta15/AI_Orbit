"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Orbit, ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/tools";

  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.replace(redirect);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error || "Invalid credentials");
      return;
    }

    router.push(redirect);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-[#6E56CF]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative w-full max-w-md rounded-2xl border border-[#232326] bg-[#131316]/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#6E56CF] to-[#9E7AFF] flex items-center justify-center text-white shadow-lg shadow-[#6E56CF]/30 mb-4">
            <Orbit className="h-5 w-5 animate-spin" style={{ animationDuration: "20s" }} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Welcome Back</h1>
          <p className="text-xs text-[#a1a1aa] mt-1.5">
            Sign in to access your saved tools and recommendations
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#d4d4d8] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#27272a] bg-[#18181C] py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-[#71717a] outline-none focus:border-[#6E56CF] focus:ring-1 focus:ring-[#6E56CF] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#d4d4d8]">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#27272a] bg-[#18181C] py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-[#71717a] outline-none focus:border-[#6E56CF] focus:ring-1 focus:ring-[#6E56CF] transition-all"
              />
            </div>
          </div>



          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6E56CF] px-4 text-xs font-bold text-white shadow-lg shadow-[#6E56CF]/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#71717a]">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup${redirect !== "/tools" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="font-semibold text-[#9E7AFF] hover:underline ml-1"
          >
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-[#6E56CF]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
