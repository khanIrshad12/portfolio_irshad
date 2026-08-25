"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpotlightCard } from "@/cinematic/components/reactbits/SpotlightCard";
import {
  AdminField,
  AdminInput,
  AdminLabel,
  AdminButton,
} from "@/components/admin/ui/admin-ui";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-md px-4">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-cyan-500/10 blur-3xl" />
      <SpotlightCard className="relative rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/80">
        <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
          Portfolio Control
        </span>
        <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white">
          Admin Login
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          Manage hero content, projects, skills, and contact submissions for
          your cinematic portfolio.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <AdminLabel>Password</AdminLabel>
            <AdminInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm font-semibold text-red-400" role="alert">
              {error}
            </p>
          )}

          <AdminButton
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in…" : "Sign In"}
          </AdminButton>
        </form>

        <p className="mt-6 font-mono text-[10px] leading-relaxed text-white/35">
          Set <code className="text-cyan-400/80">ADMIN_PASSWORD</code> in{" "}
          <code className="text-white/50">.env.local</code>. Quote passwords
          that contain <code className="text-white/50">#</code> or{" "}
          <code className="text-white/50">$</code>, then restart the dev
          server.
        </p>
      </SpotlightCard>
    </div>
  );
}
