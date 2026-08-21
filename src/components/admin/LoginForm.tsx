"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="brutal-card w-full max-w-md p-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl">
        Admin Login
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Customize your portfolio content and theme.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="brutal-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="brutal-input"
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm font-semibold text-[var(--color-primary)]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="brutal-btn brutal-btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
{/* 
      <p className="mt-6 text-xs text-[var(--color-muted)]">
        Default password: <code className="bg-[var(--color-surface)] px-1">changeme123</code>.
        Set <code className="bg-[var(--color-surface)] px-1">ADMIN_PASSWORD</code> in{" "}
        <code className="bg-[var(--color-surface)] px-1">.env.local</code>.
      </p> */}
    </div>
  );
}
