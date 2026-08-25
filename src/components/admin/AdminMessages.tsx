"use client";

import { useMemo, useState } from "react";
import type { ContactMessage } from "@/lib/types";
import {
  Check,
  Trash2,
  Mail,
  MailOpen,
  RefreshCw,
  Inbox,
} from "lucide-react";
import {
  AdminButton,
  AdminStatusBanner,
} from "@/components/admin/ui/admin-ui";

interface AdminMessagesProps {
  initialMessages: ContactMessage[];
}

export function AdminMessages({ initialMessages }: AdminMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages[0]?.id ?? null,
  );
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    if (filter === "unread") return messages.filter((m) => !m.read);
    if (filter === "read") return messages.filter((m) => m.read);
    return messages;
  }, [messages, filter]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unread = messages.filter((m) => !m.read).length;

  async function refresh() {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to load");
      const json = (await res.json()) as { messages: ContactMessage[] };
      setMessages(json.messages);
      if (
        selectedId &&
        !json.messages.some((m) => m.id === selectedId)
      ) {
        setSelectedId(json.messages[0]?.id ?? null);
      }
      setStatus("Inbox refreshed.");
    } catch {
      setStatus("Could not refresh inbox.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleRead(id: string, read: boolean) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (!res.ok) throw new Error("Update failed");
      const json = (await res.json()) as { message: ContactMessage };
      setMessages((list) =>
        list.map((m) => (m.id === id ? json.message : m)),
      );
    } catch {
      setStatus("Failed to update message.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this contact submission permanently?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setMessages((list) => {
        const next = list.filter((m) => m.id !== id);
        if (selectedId === id) setSelectedId(next[0]?.id ?? null);
        return next;
      });
      setStatus("Message deleted.");
    } catch {
      setStatus("Failed to delete message.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            07 · Contact
          </span>
          <h2 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-white">
            Contact Inbox
          </h2>
          <p className="mt-1 font-mono text-xs text-white/50">
            {messages.length} total · {unread} unread
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                filter === f
                  ? "border-cyan-500/50 bg-cyan-950/50 text-cyan-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
          <AdminButton type="button" variant="ghost" disabled={busy} onClick={refresh}>
            <RefreshCw className={`h-3.5 w-3.5 ${busy ? "animate-spin" : ""}`} />
            Refresh
          </AdminButton>
        </div>
      </div>

      {status && (
        <AdminStatusBanner ok={!status.toLowerCase().includes("fail") && !status.toLowerCase().includes("could")}>
          {status}
        </AdminStatusBanner>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#080808]/60 px-6 py-16 text-center">
          <Inbox className="h-10 w-10 text-white/25" />
          <p className="font-mono text-sm text-white/50">
            No contact form submissions yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="admin-scrollbar max-h-[70vh] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-[#080808]/60 p-3 lg:col-span-5">
            {filtered.length === 0 ? (
              <p className="p-4 font-mono text-xs text-white/40">
                No messages in this filter.
              </p>
            ) : (
              filtered.map((m) => {
                const active = m.id === selectedId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(m.id);
                      if (!m.read) void toggleRead(m.id, true);
                    }}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                      active
                        ? "border-cyan-500/40 bg-cyan-950/40"
                        : "border-white/8 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {!m.read ? (
                            <Mail className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                          ) : (
                            <MailOpen className="h-3.5 w-3.5 shrink-0 text-white/30" />
                          )}
                          <span
                            className={`truncate text-sm font-semibold ${
                              m.read ? "text-white/70" : "text-white"
                            }`}
                          >
                            {m.name}
                          </span>
                        </div>
                        <p className="mt-1 truncate font-mono text-[11px] text-white/40">
                          {m.email}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-white/30">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-white/50">
                      {m.message}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#080808]/60 p-5 lg:col-span-7">
            {selected ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-black uppercase tracking-tight text-white">
                      {selected.name}
                    </h3>
                    <a
                      href={`mailto:${selected.email}`}
                      className="mt-1 inline-block font-mono text-sm text-cyan-400 hover:underline"
                    >
                      {selected.email}
                    </a>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/35">
                      Received{" "}
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AdminButton
                      type="button"
                      variant="ghost"
                      disabled={busy}
                      onClick={() => toggleRead(selected.id, !selected.read)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      {selected.read ? "Mark unread" : "Mark read"}
                    </AdminButton>
                    <a
                      href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: Portfolio inquiry from ${selected.name}`)}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-cyan-300"
                    >
                      Reply
                    </a>
                    <AdminButton
                      type="button"
                      variant="danger"
                      disabled={busy}
                      onClick={() => remove(selected.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </AdminButton>
                  </div>
                </div>
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-white/75">
                  {selected.message}
                </p>
              </div>
            ) : (
              <p className="font-mono text-sm text-white/40">
                Select a message to read it.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
