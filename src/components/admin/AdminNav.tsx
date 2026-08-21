"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b-[3px] border-[var(--color-ink)] bg-[var(--color-accent)]">
      <div className="container-narrow flex items-center justify-between px-5 py-3 md:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="font-[family-name:var(--font-display)] text-lg uppercase"
          >
            Admin
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold uppercase tracking-[0.08em] underline"
          >
            View Site →
          </Link>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="brutal-btn brutal-btn-ghost px-4 py-2 text-xs"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
