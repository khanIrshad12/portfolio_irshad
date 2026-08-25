"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { Project, ProjectMetric } from "@/lib/types";
import { EMPTY_PROJECT, EMPTY_PROJECT_METRIC } from "@/lib/projects";
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

interface AdminProjectsPanelProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function AdminProjectsPanel({
  projects,
  onChange,
}: AdminProjectsPanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(projects[0]?.id ? [projects[0].id] : []),
  );

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function update(
    index: number,
    patch: Partial<Project>,
  ) {
    const next = [...projects];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function addProject() {
    const id = String(Date.now());
    const number = String(projects.length + 1).padStart(2, "0");
    onChange([
      ...projects,
      {
        id,
        ...EMPTY_PROJECT,
        number,
        constellationClusterIndex: projects.length % 4,
      },
    ]);
    setExpandedIds((prev) => new Set(prev).add(id));
  }

  function removeProject(index: number) {
    const id = projects[index]?.id;
    onChange(projects.filter((_, i) => i !== index));
    if (id) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  function updateMetric(
    projectIndex: number,
    metricIndex: number,
    field: keyof ProjectMetric,
    value: string,
  ) {
    const metrics = [...(projects[projectIndex].metrics ?? [])];
    metrics[metricIndex] = { ...metrics[metricIndex], [field]: value };
    update(projectIndex, { metrics });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50">
        These cards power the{" "}
        <strong className="font-normal text-cyan-300/90">Projects</strong>{" "}
        section — system index, category chip, metrics, tech stack, and deep
        specs modal.
      </p>

      {projects.map((project, i) => {
        const isExpanded = expandedIds.has(project.id);
        return (
          <div
            key={project.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#080808]/80"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4">
              <button
                type="button"
                onClick={() => toggleExpanded(project.id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left transition-colors hover:text-cyan-300"
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  className={`size-4 shrink-0 text-cyan-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                />
                <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  System // {project.number || String(i + 1).padStart(2, "0")}
                  {project.title ? ` · ${project.title}` : ""}
                </span>
                {project.featured && (
                  <span className="shrink-0 rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                    Featured
                  </span>
                )}
              </button>
              <div className="flex shrink-0 items-center gap-2">
                <MoveControls
                  index={i}
                  total={projects.length}
                  onMove={(dir) => onChange(moveItem(projects, i, dir))}
                />
                <AdminButton
                  type="button"
                  variant="danger"
                  onClick={() => removeProject(i)}
                  className="!px-2.5 !py-2"
                >
                  <Trash2 className="size-3.5" />
                </AdminButton>
              </div>
            </div>

            {isExpanded && (
              <div className="max-h-[36rem] space-y-5 overflow-y-auto overscroll-contain border-t border-white/10 px-5 pb-5 pt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <AdminField
                    label="Title"
                    value={project.title}
                    onChange={(v) => update(i, { title: v })}
                    className="sm:col-span-2"
                  />
                  <AdminField
                    label="System number"
                    value={project.number}
                    onChange={(v) => update(i, { number: v })}
                    placeholder="01"
                  />
                  <AdminField
                    label="Category chip"
                    value={project.category}
                    onChange={(v) => update(i, { category: v })}
                    placeholder="Industrial Control & Real-Time Telemetry"
                  />
                  <AdminField
                    label="Company"
                    value={project.company ?? ""}
                    onChange={(v) => update(i, { company: v })}
                  />
                  <AdminField
                    label="Accent color"
                    value={project.accentColor}
                    onChange={(v) => update(i, { accentColor: v })}
                    placeholder="#06b6d4"
                  />
                  <AdminField
                    label="Live URL"
                    value={project.liveUrl ?? ""}
                    onChange={(v) => update(i, { liveUrl: v })}
                  />
                  <AdminField
                    label="Link label"
                    value={project.linkLabel ?? ""}
                    onChange={(v) => update(i, { linkLabel: v })}
                    placeholder="Live Website"
                  />
                  <AdminField
                    label="GitHub URL"
                    value={project.githubUrl ?? ""}
                    onChange={(v) => update(i, { githubUrl: v })}
                  />
                  <div className="sm:col-span-2">
                    <AdminLabel>Tagline (card description)</AdminLabel>
                    <AdminTextarea
                      value={project.tagline}
                      onChange={(e) => update(i, { tagline: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AdminLabel>Overview (modal deep specs)</AdminLabel>
                    <AdminTextarea
                      value={project.overview}
                      onChange={(e) => update(i, { overview: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AdminLabel>Tech stack (comma-separated)</AdminLabel>
                    <AdminTextarea
                      value={(project.techStack ?? []).join(", ")}
                      onChange={(e) =>
                        update(i, {
                          techStack: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      rows={2}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AdminLabel>
                      Architecture highlights (one per line)
                    </AdminLabel>
                    <AdminTextarea
                      value={(project.architecture ?? []).join("\n")}
                      onChange={(e) =>
                        update(i, {
                          architecture: e.target.value
                            .split("\n")
                            .filter(Boolean),
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AdminLabel>
                      Key contributions (one per line)
                    </AdminLabel>
                    <AdminTextarea
                      value={(project.keyContributions ?? []).join("\n")}
                      onChange={(e) =>
                        update(i, {
                          keyContributions: e.target.value
                            .split("\n")
                            .filter(Boolean),
                        })
                      }
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                    Metrics (card shows first 2)
                  </h4>
                  {(project.metrics ?? []).map((metric, mi) => (
                    <div
                      key={mi}
                      className="grid gap-3 rounded-lg border border-white/10 bg-[#030303]/80 p-3 sm:grid-cols-[1fr_1fr_auto]"
                    >
                      <AdminField
                        label="Value"
                        value={metric.value}
                        onChange={(v) => updateMetric(i, mi, "value", v)}
                      />
                      <AdminField
                        label="Label"
                        value={metric.label}
                        onChange={(v) => updateMetric(i, mi, "label", v)}
                      />
                      <div className="flex items-end">
                        <AdminButton
                          type="button"
                          variant="danger"
                          onClick={() =>
                            update(i, {
                              metrics: (project.metrics ?? []).filter(
                                (_, idx) => idx !== mi,
                              ),
                            })
                          }
                          className="!px-2 !py-2"
                        >
                          <Trash2 className="size-3" />
                        </AdminButton>
                      </div>
                    </div>
                  ))}
                  <AdminButton
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      update(i, {
                        metrics: [
                          ...(project.metrics ?? []),
                          { ...EMPTY_PROJECT_METRIC },
                        ],
                      })
                    }
                  >
                    <Plus className="size-3.5" /> Add metric
                  </AdminButton>
                </div>

                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) => update(i, { featured: e.target.checked })}
                    className="size-4 accent-cyan-400"
                  />
                  Featured project
                </label>
              </div>
            )}
          </div>
        );
      })}

      <AdminButton type="button" variant="accent" onClick={addProject}>
        <Plus className="size-3.5" /> Add Project
      </AdminButton>
    </div>
  );
}
