"use client";

import type { Theme } from "@/lib/types";
import { CINEMATIC_THEME_DEFAULTS, toColorPickerHex } from "@/lib/cinematic-theme";
import {
  AdminLabel,
  AdminInput,
  AdminButton,
} from "@/components/admin/ui/admin-ui";

const THEME_FIELDS: { key: keyof Theme; label: string; hint?: string }[] = [
  { key: "primary", label: "Primary accent", hint: "Links, focus rings, glow" },
  { key: "accent", label: "Secondary accent", hint: "Gradients, highlights" },
  { key: "background", label: "Page background", hint: "Main canvas" },
  { key: "surface", label: "Surface", hint: "Cards and panels" },
  { key: "ink", label: "Text", hint: "Headlines and body copy" },
];

interface AdminThemeSettingsProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export function AdminThemeSettings({ theme, onChange }: AdminThemeSettingsProps) {
  function updateField(key: keyof Theme, value: string) {
    onChange({ ...theme, [key]: value });
  }

  function resetDefaults() {
    onChange({ ...CINEMATIC_THEME_DEFAULTS });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          Colors apply to your cinematic portfolio after save and refresh.
        </p>
        <AdminButton type="button" variant="ghost" onClick={resetDefaults}>
          Reset to cinematic defaults
        </AdminButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {THEME_FIELDS.map(({ key, label, hint }) => (
          <div key={key}>
            <AdminLabel>{label}</AdminLabel>
            {hint && (
              <p className="-mt-1 mb-2 text-[11px] text-white/35">{hint}</p>
            )}
            <div className="flex gap-2">
              <input
                type="color"
                value={toColorPickerHex(theme[key])}
                onChange={(e) => updateField(key, e.target.value)}
                className="size-11 shrink-0 cursor-pointer rounded-xl border border-white/20 bg-transparent p-1"
                aria-label={`Pick ${label}`}
              />
              <AdminInput
                value={theme[key]}
                onChange={(e) => updateField(key, e.target.value)}
                className="flex-1 font-mono text-xs uppercase"
                spellCheck={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/10"
        style={{
          background: theme.background,
          color: theme.ink,
        }}
      >
        <div
          className="border-b px-5 py-3 font-mono text-[10px] uppercase tracking-widest"
          style={{
            borderColor: `${theme.primary}40`,
            color: theme.primary,
          }}
        >
          Live preview · cinematic site
        </div>
        <div className="space-y-4 p-6">
          <p className="font-display text-lg font-black uppercase tracking-tight">
            Preview on background
          </p>
          <p className="max-w-md text-sm opacity-70">
            This is how primary text and accents read against your chosen
            background and surface colors.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
              style={{
                background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})`,
                color: theme.background,
              }}
            >
              Primary CTA
            </button>
            <span
              className="rounded-xl border px-4 py-2 text-xs font-mono uppercase tracking-wider"
              style={{
                borderColor: `${theme.primary}60`,
                color: theme.primary,
                background: theme.surface,
              }}
            >
              Accent pill
            </span>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{
              background: theme.surface,
              borderColor: `${theme.ink}15`,
            }}
          >
            <p className="text-sm" style={{ color: theme.ink }}>
              Surface card sample
            </p>
            <p className="mt-1 text-xs opacity-50" style={{ color: theme.ink }}>
              Secondary muted copy on surface
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
