"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Layers,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AdminTab =
  | "hero"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "inbox"
  | "settings";

export const ADMIN_SECTIONS: {
  id: AdminTab;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
}[] = [
  { id: "hero", label: "Hero", eyebrow: "01 · Identity", icon: Sparkles },
  { id: "about", label: "About", eyebrow: "02 · Profile", icon: User },
  { id: "skills", label: "Skills", eyebrow: "03 · Stack", icon: Layers },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "04 · Trajectory",
    icon: Briefcase,
  },
  { id: "projects", label: "Projects", eyebrow: "05 · Work", icon: FolderKanban },
  {
    id: "education",
    label: "Education",
    eyebrow: "06 · Credentials",
    icon: GraduationCap,
  },
  { id: "inbox", label: "Inbox", eyebrow: "07 · Contact", icon: Mail },
  { id: "settings", label: "Settings", eyebrow: "System", icon: Settings },
];

interface AdminSidebarProps {
  tab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  unreadCount: number;
}

export function AdminSidebar({ tab, onTabChange, unreadCount }: AdminSidebarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-[#050505]/90 backdrop-blur-xl lg:w-64 lg:shrink-0">
      <div className="border-b border-white/10 p-5">
        <Link href="/admin" className="block">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">
            Portfolio Control
          </p>
          <h1 className="mt-1 font-display text-lg font-black uppercase tracking-tight text-white">
            Admin
          </h1>
        </Link>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          Edit the same sections visitors see on your cinematic site.
        </p>
      </div>

      <nav className="admin-scrollbar flex-1 space-y-1 overflow-y-auto p-3">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          const active = tab === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onTabChange(section.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
                active
                  ? "border-cyan-500/40 bg-cyan-950/40 text-white shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                  : "border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <Icon
                className={`size-4 shrink-0 ${active ? "text-cyan-400" : "text-white/35"}`}
              />
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-white/35">
                  {section.eyebrow}
                </span>
                <span className="block text-sm font-semibold">{section.label}</span>
              </div>
              {section.id === "inbox" && unreadCount > 0 && (
                <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-cyan-400 px-1.5 py-0.5 text-[10px] font-bold text-black">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white/50 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          <ExternalLink className="size-3.5" />
          View live site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white/50 transition hover:border-red-400/40 hover:text-red-300"
        >
          <LogOut className="size-3.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
