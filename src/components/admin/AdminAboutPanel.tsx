"use client";

import { Plus, Trash2 } from "lucide-react";
import type {
  AboutSectionMeta,
  AboutStatCard,
  PhilosophyPillar,
} from "@/lib/types";
import {
  AdminField,
  AdminLabel,
  AdminTextarea,
  AdminButton,
  MoveControls,
} from "@/components/admin/ui/admin-ui";

function moveItem<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[next]] = [copy[next], copy[index]];
  return copy;
}

interface AdminAboutPanelProps {
  aboutSection: AboutSectionMeta;
  aboutStats: AboutStatCard[];
  philosophyPillars: PhilosophyPillar[];
  onAboutSectionChange: (v: AboutSectionMeta) => void;
  onAboutStatsChange: (v: AboutStatCard[]) => void;
  onPillarsChange: (v: PhilosophyPillar[]) => void;
}

export function AdminAboutPanel({
  aboutSection,
  aboutStats,
  philosophyPillars,
  onAboutSectionChange,
  onAboutStatsChange,
  onPillarsChange,
}: AdminAboutPanelProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-white/10 bg-[#080808]/60 p-5">
        <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          About section (live site)
        </h3>
        <div className="space-y-3">
          <AdminField
            label="Mobile headline"
            value={aboutSection.displayHeadline}
            onChange={(v) =>
              onAboutSectionChange({ ...aboutSection, displayHeadline: v })
            }
          />
          <AdminField
            label="Desktop TrueFocus sentence"
            value={aboutSection.trueFocusSentence}
            onChange={(v) =>
              onAboutSectionChange({ ...aboutSection, trueFocusSentence: v })
            }
          />
          <div>
            <AdminLabel>Intro paragraph</AdminLabel>
            <AdminTextarea
              value={aboutSection.summary}
              onChange={(e) =>
                onAboutSectionChange({
                  ...aboutSection,
                  summary: e.target.value,
                })
              }
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080808]/60 p-5">
        <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Stat cards (4-up grid)
        </h3>
        <div className="space-y-4">
          {aboutStats.map((stat, i) => (
            <div
              key={stat.id}
              className="grid gap-3 rounded-lg border border-white/10 bg-[#030303]/80 p-4 sm:grid-cols-2"
            >
              <AdminField
                label="Label"
                value={stat.label}
                onChange={(v) => {
                  const next = [...aboutStats];
                  next[i] = { ...next[i], label: v };
                  onAboutStatsChange(next);
                }}
              />
              <AdminField
                label="Value"
                value={stat.value}
                onChange={(v) => {
                  const next = [...aboutStats];
                  next[i] = { ...next[i], value: v };
                  onAboutStatsChange(next);
                }}
              />
              <AdminField
                label="Sublabel"
                value={stat.sublabel}
                onChange={(v) => {
                  const next = [...aboutStats];
                  next[i] = { ...next[i], sublabel: v };
                  onAboutStatsChange(next);
                }}
                className="sm:col-span-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080808]/60 p-5">
        <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Philosophy pillars (carousel)
        </h3>
        <div className="space-y-4">
          {philosophyPillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="rounded-lg border border-white/10 bg-[#030303]/80 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-cyan-400/80">
                  Pillar {pillar.number}
                </span>
                <div className="flex gap-2">
                  <MoveControls
                    index={i}
                    total={philosophyPillars.length}
                    onMove={(dir) =>
                      onPillarsChange(moveItem(philosophyPillars, i, dir))
                    }
                  />
                  <AdminButton
                    type="button"
                    variant="danger"
                    onClick={() =>
                      onPillarsChange(
                        philosophyPillars.filter((_, idx) => idx !== i),
                      )
                    }
                    className="!px-2 !py-1.5"
                  >
                    <Trash2 className="size-3 w-3" />
                  </AdminButton>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
                <AdminField
                  label="Number"
                  value={pillar.number}
                  onChange={(v) => {
                    const next = [...philosophyPillars];
                    next[i] = { ...next[i], number: v };
                    onPillarsChange(next);
                  }}
                />
                <AdminField
                  label="Title"
                  value={pillar.title}
                  onChange={(v) => {
                    const next = [...philosophyPillars];
                    next[i] = { ...next[i], title: v };
                    onPillarsChange(next);
                  }}
                />
                <div className="sm:col-span-2">
                  <AdminLabel>Description</AdminLabel>
                  <AdminTextarea
                    value={pillar.description}
                    onChange={(e) => {
                      const next = [...philosophyPillars];
                      next[i] = { ...next[i], description: e.target.value };
                      onPillarsChange(next);
                    }}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <AdminButton
            type="button"
            variant="accent"
            onClick={() =>
              onPillarsChange([
                ...philosophyPillars,
                {
                  id: String(Date.now()),
                  number: String(philosophyPillars.length + 1).padStart(2, "0"),
                  title: "New Pillar",
                  description: "",
                },
              ])
            }
          >
            <Plus className="size-3.5" /> Add pillar
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
