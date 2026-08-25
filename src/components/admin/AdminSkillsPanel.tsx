"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { SkillCategory, SkillMatrixItem, SkillsSectionMeta } from "@/lib/types";
import {
  AdminField,
  AdminLabel,
  AdminTextarea,
  AdminButton,
  MoveControls,
} from "@/components/admin/ui/admin-ui";
import { EMPTY_SKILL, EMPTY_SKILL_CATEGORY } from "@/lib/skills";

const ICON_OPTIONS = [
  "Layout",
  "Server",
  "Activity",
  "Database",
  "Sparkles",
  "Cpu",
] as const;

function moveItem<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[next]] = [copy[next], copy[index]];
  return copy;
}

interface AdminSkillsPanelProps {
  section: SkillsSectionMeta;
  categories: SkillCategory[];
  onSectionChange: (section: SkillsSectionMeta) => void;
  onCategoriesChange: (categories: SkillCategory[]) => void;
}

export function AdminSkillsPanel({
  section,
  categories,
  onSectionChange,
  onCategoriesChange,
}: AdminSkillsPanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(categories[0]?.id ? [categories[0].id] : []),
  );

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function updateCategory(
    catIndex: number,
    field: keyof SkillCategory,
    value: string | SkillMatrixItem[],
  ) {
    const next = [...categories];
    next[catIndex] = { ...next[catIndex], [field]: value } as SkillCategory;
    onCategoriesChange(next);
  }

  function updateSkill(
    catIndex: number,
    skillIndex: number,
    field: keyof SkillMatrixItem,
    value: string | number,
  ) {
    const next = [...categories];
    const skills = [...next[catIndex].skills];
    skills[skillIndex] = { ...skills[skillIndex], [field]: value };
    next[catIndex] = { ...next[catIndex], skills };
    onCategoriesChange(next);
  }

  function addCategory() {
    const id = String(Date.now());
    onCategoriesChange([
      ...categories,
      { id, ...EMPTY_SKILL_CATEGORY },
    ]);
    setExpandedIds((prev) => new Set(prev).add(id));
  }

  function removeCategory(index: number) {
    const removedId = categories[index]?.id;
    onCategoriesChange(categories.filter((_, i) => i !== index));
    if (removedId) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.delete(removedId);
        return next;
      });
    }
  }

  function addSkill(catIndex: number) {
    const next = [...categories];
    next[catIndex] = {
      ...next[catIndex],
      skills: [...next[catIndex].skills, { ...EMPTY_SKILL }],
    };
    onCategoriesChange(next);
  }

  function removeSkill(catIndex: number, skillIndex: number) {
    const next = [...categories];
    next[catIndex] = {
      ...next[catIndex],
      skills: next[catIndex].skills.filter((_, i) => i !== skillIndex),
    };
    onCategoriesChange(next);
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-white/50">
        Each <strong className="font-normal text-cyan-300/90">category below becomes one tab</strong>{" "}
        on the site (01 Frontend, 02 Backend, etc.). Skills you add inside a
        category only show when that tab is selected — not by the skill tag field.
      </p>

      <div className="rounded-xl border border-white/10 bg-[#080808]/60 p-5">
        <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          Section intro
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminField
            label="Headline"
            value={section.headline}
            onChange={(v) => onSectionChange({ ...section, headline: v })}
          />
          <AdminField
            label="Headline accent"
            value={section.headlineAccent}
            onChange={(v) => onSectionChange({ ...section, headlineAccent: v })}
          />
          <div className="sm:col-span-2">
            <AdminLabel>Description</AdminLabel>
            <AdminTextarea
              value={section.description}
              onChange={(e) =>
                onSectionChange({ ...section, description: e.target.value })
              }
              rows={2}
            />
          </div>
        </div>
      </div>

      {categories.map((cat, catIndex) => {
        const isExpanded = expandedIds.has(cat.id);
        const skillCount = cat.skills?.length ?? 0;

        return (
          <div
            key={cat.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#080808]/80"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <button
                type="button"
                onClick={() => toggleExpanded(cat.id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left transition-colors hover:text-cyan-300"
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  className={`size-4 shrink-0 text-cyan-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                />
                <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Tab {String(catIndex + 1).padStart(2, "0")}
                  {cat.title ? ` · ${cat.title}` : ""}
                </span>
                <span className="shrink-0 rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/45">
                  {skillCount} skill{skillCount === 1 ? "" : "s"}
                </span>
              </button>
              <div className="flex shrink-0 items-center gap-2">
                <MoveControls
                  index={catIndex}
                  total={categories.length}
                  onMove={(dir) =>
                    onCategoriesChange(moveItem(categories, catIndex, dir))
                  }
                />
                <AdminButton
                  type="button"
                  variant="danger"
                  onClick={() => removeCategory(catIndex)}
                  className="!px-2.5 !py-2"
                >
                  <Trash2 className="size-3.5" />
                </AdminButton>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-white/10 px-5 pb-5 pt-4">
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <AdminField
                    label="Tab label (desktop)"
                    value={cat.title}
                    onChange={(v) => updateCategory(catIndex, "title", v)}
                  />
                  <AdminField
                    label="Tab label (mobile chip)"
                    value={cat.shortTitle ?? ""}
                    onChange={(v) => updateCategory(catIndex, "shortTitle", v)}
                  />
                  <AdminField
                    label="Subtitle"
                    value={cat.subtitle}
                    onChange={(v) => updateCategory(catIndex, "subtitle", v)}
                    className="sm:col-span-2"
                  />
                  <div>
                    <AdminLabel>Icon</AdminLabel>
                    <select
                      value={cat.iconName}
                      onChange={(e) =>
                        updateCategory(catIndex, "iconName", e.target.value)
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                    Skills in this category
                  </h4>
                  <div className="max-h-[28rem] space-y-4 overflow-y-auto overscroll-contain rounded-lg border border-white/5 bg-[#030303]/40 p-3 pr-2">
                    {(cat.skills ?? []).map((skill, skillIndex) => (
                      <div
                        key={`${cat.id}-${skillIndex}`}
                        className="rounded-lg border border-white/10 bg-[#030303]/80 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-white/40">
                            Skill {skillIndex + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <MoveControls
                              index={skillIndex}
                              total={cat.skills.length}
                              onMove={(dir) => {
                                const next = [...categories];
                                next[catIndex] = {
                                  ...next[catIndex],
                                  skills: moveItem(
                                    next[catIndex].skills,
                                    skillIndex,
                                    dir,
                                  ),
                                };
                                onCategoriesChange(next);
                              }}
                            />
                            <AdminButton
                              type="button"
                              variant="danger"
                              onClick={() => removeSkill(catIndex, skillIndex)}
                              className="!px-2 !py-1.5"
                            >
                              <Trash2 className="size-3 w-3" />
                            </AdminButton>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <AdminField
                            label="Name"
                            value={skill.name}
                            onChange={(v) =>
                              updateSkill(catIndex, skillIndex, "name", v)
                            }
                            className="sm:col-span-2"
                          />
                          <AdminField
                            label="Skill tag (small label, not the tab)"
                            value={skill.category}
                            onChange={(v) =>
                              updateSkill(catIndex, skillIndex, "category", v)
                            }
                          />
                          <div>
                            <AdminLabel>
                              Proficiency ({skill.proficiency}%)
                            </AdminLabel>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={skill.proficiency}
                              onChange={(e) =>
                                updateSkill(
                                  catIndex,
                                  skillIndex,
                                  "proficiency",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full accent-cyan-400"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <AdminLabel>Highlight description</AdminLabel>
                            <AdminTextarea
                              value={skill.highlight ?? ""}
                              onChange={(e) =>
                                updateSkill(
                                  catIndex,
                                  skillIndex,
                                  "highlight",
                                  e.target.value,
                                )
                              }
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {skillCount === 0 && (
                      <p className="py-6 text-center font-mono text-[10px] uppercase tracking-widest text-white/30">
                        No skills yet
                      </p>
                    )}
                  </div>
                  <AdminButton
                    type="button"
                    variant="ghost"
                    onClick={() => addSkill(catIndex)}
                  >
                    <Plus className="size-3.5" /> Add skill
                  </AdminButton>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <AdminButton type="button" variant="accent" onClick={addCategory}>
        <Plus className="size-3.5" /> Add tab (category)
      </AdminButton>
    </div>
  );
}
