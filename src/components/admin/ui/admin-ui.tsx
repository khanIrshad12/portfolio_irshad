"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SpotlightCard } from "@/cinematic/components/reactbits/SpotlightCard";

/* ── Labels & inputs ── */

export function AdminLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/55 ${className}`}
    >
      {children}
    </label>
  );
}

export function AdminInput({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-sm text-white shadow-inner placeholder:text-white/25 transition-colors focus:border-cyan-400 focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function AdminTextarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full resize-y rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-sm text-white shadow-inner placeholder:text-white/25 transition-colors focus:border-cyan-400 focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function AdminField({
  label,
  value,
  onChange,
  className = "",
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className={className}>
      <AdminLabel>{label}</AdminLabel>
      <AdminInput
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export function AdminTextField({
  label,
  value,
  onChange,
  rows = 4,
  className = "",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <AdminLabel>{label}</AdminLabel>
      <AdminTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ── Buttons ── */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50 disabled:pointer-events-none";

export function AdminButton({
  variant = "ghost",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "accent" | "danger";
}) {
  const variants = {
    primary:
      "group relative overflow-hidden bg-white px-5 py-3 text-black shadow-2xl hover:shadow-cyan-500/20",
    ghost:
      "border border-white/10 bg-white/[0.03] px-4 py-2.5 text-white/70 hover:border-cyan-400/40 hover:text-cyan-300",
    accent:
      "border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-950/60",
    danger:
      "border border-red-800/50 bg-red-950/30 px-4 py-2.5 text-red-300 hover:border-red-500/60",
  };

  if (variant === "primary") {
    return (
      <button
        className={`${btnBase} ${variants.primary} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
          {children}
        </span>
        <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-0" />
      </button>
    );
  }

  return (
    <button
      className={`${btnBase} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Layout ── */

export function AdminSectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
          {description}
        </p>
      )}
    </div>
  );
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={`rounded-2xl border border-white/10 p-6 md:p-8 ${className}`}
    >
      {children}
    </SpotlightCard>
  );
}

export function AdminItemCard({
  index,
  label,
  children,
  onRemove,
  onMove,
  total,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
  onRemove: () => void;
  onMove?: (dir: -1 | 1) => void;
  total?: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#080808]/80 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/90">
          {label} {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {onMove && total !== undefined && (
            <MoveControls index={index} total={total} onMove={onMove} />
          )}
          <AdminButton variant="danger" type="button" onClick={onRemove} className="!px-2.5 !py-2">
            Remove
          </AdminButton>
        </div>
      </div>
      {children}
    </div>
  );
}

export function MoveControls({
  index,
  total,
  onMove,
}: {
  index: number;
  total: number;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onMove(-1)}
        disabled={index === 0}
        className="rounded-lg border border-white/10 p-1.5 text-white/60 transition hover:border-cyan-400/50 hover:text-cyan-300 disabled:opacity-30"
        aria-label="Move up"
      >
        <ChevronUp className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => onMove(1)}
        disabled={index >= total - 1}
        className="rounded-lg border border-white/10 p-1.5 text-white/60 transition hover:border-cyan-400/50 hover:text-cyan-300 disabled:opacity-30"
        aria-label="Move down"
      >
        <ChevronDown className="size-3.5" />
      </button>
    </div>
  );
}

export function AdminStatusBanner({
  ok,
  children,
}: {
  ok: boolean;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${
        ok
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
          : "border-red-400/40 bg-red-500/10 text-red-200"
      }`}
      role="status"
    >
      {children}
    </p>
  );
}

export function ResumeUpload({
  resumeUrl,
  onUrlChange,
}: {
  resumeUrl: string;
  onUrlChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setStatus("");
    setFileName(file.name);

    try {
      const body = new FormData();
      body.append("resume", file);

      const res = await fetch("/api/admin/resume", { method: "POST", body });
      const json = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) throw new Error(json.error ?? "Upload failed");

      onUrlChange(json.url ?? "");
      setStatus("Uploaded — previous resume removed.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!resumeUrl) return;
    if (!confirm("Remove the current resume?")) return;

    setUploading(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/resume", { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      onUrlChange("");
      setFileName("");
      setStatus("Resume removed.");
    } catch {
      setStatus("Failed to delete resume.");
    } finally {
      setUploading(false);
    }
  }

  const isError =
    status.toLowerCase().includes("fail") ||
    status.toLowerCase().includes("only") ||
    status.toLowerCase().includes("large") ||
    status.toLowerCase().includes("invalid");

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#080808]/80 p-5 sm:col-span-2">
      <AdminLabel>Resume</AdminLabel>
      <p className="text-xs text-white/40">
        Upload PDF / DOC / DOCX (max 5 MB). New upload replaces the previous file.
      </p>

      {resumeUrl ? (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-cyan-400 hover:underline"
          >
            View current resume
          </a>
          <AdminButton
            variant="danger"
            type="button"
            disabled={uploading}
            onClick={handleDelete}
          >
            Remove
          </AdminButton>
        </div>
      ) : (
        <p className="font-mono text-xs text-white/35">No resume uploaded.</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-950/60">
          {uploading ? "Uploading…" : "Choose file"}
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => void handleUpload(e.target.files?.[0])}
          />
        </label>
        {fileName && (
          <span className="font-mono text-[10px] text-white/40">{fileName}</span>
        )}
      </div>

      {status && (
        <p
          className={`font-mono text-xs ${isError ? "text-red-400" : "text-cyan-300"}`}
        >
          {status}
        </p>
      )}

      <AdminField
        label="Or paste external URL"
        value={resumeUrl}
        onChange={onUrlChange}
        placeholder="/uploads/resume.pdf or https://…"
      />
    </div>
  );
}
