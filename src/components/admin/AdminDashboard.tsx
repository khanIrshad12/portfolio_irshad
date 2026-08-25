"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Menu, X } from "lucide-react";
import type {
  PortfolioData,
  ContactMessage,
  Experience,
  ShowcaseStat,
  Education,
  Certification,
} from "@/lib/types";
import { AdminMessages } from "@/components/admin/AdminMessages";
import { AdminThemeSettings } from "@/components/admin/AdminThemeSettings";
import { AdminSkillsPanel } from "@/components/admin/AdminSkillsPanel";
import { AdminAboutPanel } from "@/components/admin/AdminAboutPanel";
import { AdminProjectsPanel } from "@/components/admin/AdminProjectsPanel";
import { normalizeTheme } from "@/lib/cinematic-theme";
import { EMPTY_EXPERIENCE, normalizeExperiences } from "@/lib/experience";
import { normalizeProjects } from "@/lib/projects";
import { normalizePortfolioData } from "@/lib/skills";
import { mergeCinematicContent } from "@/lib/cinematic-content";
import {
  AdminSidebar,
  ADMIN_SECTIONS,
  type AdminTab,
} from "@/components/admin/AdminSidebar";
import {
  AdminField,
  AdminLabel,
  AdminTextarea,
  AdminButton,
  AdminPanel,
  AdminSectionHeader,
  AdminStatusBanner,
  MoveControls,
  ResumeUpload,
} from "@/components/admin/ui/admin-ui";

interface AdminDashboardProps {
  initialData: PortfolioData;
  initialMessages: ContactMessage[];
  initialUnread: number;
}

function sectionMeta(tab: AdminTab) {
  return ADMIN_SECTIONS.find((s) => s.id === tab)!;
}

function moveItem<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[next]] = [copy[next], copy[index]];
  return copy;
}

export function AdminDashboard({
  initialData,
  initialMessages,
  initialUnread,
}: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData>(() =>
    mergeCinematicContent(
      normalizePortfolioData({
        ...initialData,
        theme: normalizeTheme(initialData.theme),
        experience: normalizeExperiences(initialData.experience ?? []),
        projects: normalizeProjects(initialData.projects ?? []),
      }),
    ),
  );
  const [tab, setTab] = useState<AdminTab>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState(false);
  const meta = sectionMeta(tab);

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Save failed");
      setMessageOk(true);
      setMessage("Saved! Refresh the site to see changes.");
    } catch {
      setMessageOk(false);
      setMessage("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  function updateProfile(field: keyof PortfolioData["profile"], value: string) {
    setData((d) => ({ ...d, profile: { ...d.profile, [field]: value } }));
  }

  function updateSocial(field: keyof PortfolioData["social"], value: string) {
    setData((d) => ({ ...d, social: { ...d.social, [field]: value } }));
  }

  function updateAbout(
    field: keyof PortfolioData["about"],
    value: string | string[],
  ) {
    setData((d) => ({ ...d, about: { ...d.about, [field]: value } }));
  }

  function updateSeo(field: keyof PortfolioData["seo"], value: string) {
    setData((d) => ({ ...d, seo: { ...d.seo, [field]: value } }));
  }

  function updateShowcase(
    index: number,
    field: keyof ShowcaseStat,
    value: string,
  ) {
    setData((d) => {
      const showcase = [...d.showcase];
      showcase[index] = { ...showcase[index], [field]: value };
      return { ...d, showcase };
    });
  }

  function addShowcase() {
    setData((d) => ({
      ...d,
      showcase: [
        ...d.showcase,
        { id: String(Date.now()), value: "0", label: "New stat" },
      ],
    }));
  }

  function removeShowcase(index: number) {
    setData((d) => ({
      ...d,
      showcase: d.showcase.filter((_, i) => i !== index),
    }));
  }

  function updateExperience(
    index: number,
    field: keyof Experience,
    value: string | string[],
  ) {
    setData((d) => {
      const experience = [...d.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...d, experience };
    });
  }

  function addExperience() {
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { id: String(Date.now()), ...EMPTY_EXPERIENCE },
      ],
    }));
  }

  function removeExperience(index: number) {
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, i) => i !== index),
    }));
  }

  function updateEducation(
    index: number,
    field: keyof Education,
    value: string,
  ) {
    setData((d) => {
      const education = [...d.education];
      education[index] = { ...education[index], [field]: value };
      return { ...d, education };
    });
  }

  function addEducation() {
    setData((d) => ({
      ...d,
      education: [
        ...d.education,
        {
          id: String(Date.now()),
          degree: "",
          institution: "",
          location: "",
          period: "",
        },
      ],
    }));
  }

  function removeEducation(index: number) {
    setData((d) => ({
      ...d,
      education: d.education.filter((_, i) => i !== index),
    }));
  }

  function updateCertification(
    index: number,
    field: keyof Certification,
    value: string,
  ) {
    setData((d) => {
      const certifications = [...d.certifications];
      certifications[index] = { ...certifications[index], [field]: value };
      return { ...d, certifications };
    });
  }

  function addCertification() {
    setData((d) => ({
      ...d,
      certifications: [
        ...d.certifications,
        { id: String(Date.now()), name: "", issuer: "", year: "" },
      ],
    }));
  }

  function removeCertification(index: number) {
    setData((d) => ({
      ...d,
      certifications: d.certifications.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(100%,18rem)] transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          tab={tab}
          unreadCount={initialUnread}
          onTabChange={(next) => {
            setTab(next);
            setSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#030303]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((o) => !o)}
                className="rounded-lg border border-white/10 p-2 text-white/70 lg:hidden"
                aria-label="Toggle sections"
              >
                {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                  {meta.eyebrow}
                </p>
                <h1 className="font-display text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                  {meta.label}
                </h1>
              </div>
            </div>
            <AdminButton
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="size-3.5" />
              {saving ? "Saving…" : "Save Changes"}
            </AdminButton>
          </div>
        </header>

        <main className="admin-scrollbar flex-1 overflow-y-auto px-4 py-8 md:px-8">
          {message && (
            <div className="mb-6">
              <AdminStatusBanner ok={messageOk}>{message}</AdminStatusBanner>
            </div>
          )}

          <AdminPanel>
            {tab !== "inbox" && (
              <AdminSectionHeader
                eyebrow={meta.eyebrow}
                title={meta.label}
                description={
                  tab === "hero"
                    ? "Hero identity, contact details, social links, and stat cards shown in the opening section."
                    : tab === "about"
                      ? "Architectural profile copy and highlight bullets for the About section."
                      : tab === "skills"
                        ? "Technical Matrix categories, skill cards, and section intro copy."
                        : tab === "experience"
                          ? "Company blocks shown in the About section carousel — add one per employer."
                          : tab === "projects"
                            ? "Cinematic project cards — system index, metrics, tech stack, and deep specs."
                            : tab === "education"
                              ? "Degrees and certifications."
                              : "Theme colors and SEO metadata for the whole site."
                }
              />
            )}

            {tab === "hero" && (
            <div className="space-y-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                label="Name"
                value={data.profile.name}
                onChange={(v) => updateProfile("name", v)}
              />
              <AdminField
                label="Title"
                value={data.profile.title}
                onChange={(v) => updateProfile("title", v)}
              />
              <AdminField
                label="Tagline"
                value={data.profile.tagline}
                onChange={(v) => updateProfile("tagline", v)}
                className="sm:col-span-2"
              />
              <AdminField
                label="Email"
                value={data.profile.email}
                onChange={(v) => updateProfile("email", v)}
              />
              <AdminField
                label="Phone"
                value={data.profile.phone}
                onChange={(v) => updateProfile("phone", v)}
              />
              <AdminField
                label="Location"
                value={data.profile.location}
                onChange={(v) => updateProfile("location", v)}
              />
              <AdminField
                label="Avatar URL"
                value={data.profile.avatarUrl}
                onChange={(v) => updateProfile("avatarUrl", v)}
              />
              <AdminField
                label="Current company"
                value={data.profile.currentCompany ?? ""}
                onChange={(v) => updateProfile("currentCompany", v)}
              />
              <AdminField
                label="Current role"
                value={data.profile.currentRole ?? ""}
                onChange={(v) => updateProfile("currentRole", v)}
              />
              <AdminField
                label="Total experience"
                value={data.profile.totalExperience ?? ""}
                onChange={(v) => updateProfile("totalExperience", v)}
                placeholder="2 years 6 months"
              />
              <ResumeUpload
                resumeUrl={data.profile.resumeUrl}
                onUrlChange={(url) => updateProfile("resumeUrl", url)}
              />
              <div className="sm:col-span-2 rounded-xl border border-white/10 bg-[#080808]/60 p-5">
                <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Availability (contact section)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <AdminField
                    label="Status text"
                    value={data.systemStatus?.statusText ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        systemStatus: {
                          ...(d.systemStatus ?? {
                            isAvailable: true,
                            statusText: "",
                            location: "",
                            currentFocus: "",
                            activeClientSlots: "",
                          }),
                          statusText: v,
                        },
                      }))
                    }
                    className="sm:col-span-2"
                  />
                  <AdminField
                    label="Location line"
                    value={data.systemStatus?.location ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        systemStatus: {
                          ...(d.systemStatus ?? {
                            isAvailable: true,
                            statusText: "",
                            location: "",
                            currentFocus: "",
                            activeClientSlots: "",
                          }),
                          location: v,
                        },
                      }))
                    }
                    className="sm:col-span-2"
                  />
                  <AdminField
                    label="Active slots / tenure line"
                    value={data.systemStatus?.activeClientSlots ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        systemStatus: {
                          ...(d.systemStatus ?? {
                            isAvailable: true,
                            statusText: "",
                            location: "",
                            currentFocus: "",
                            activeClientSlots: "",
                          }),
                          activeClientSlots: v,
                        },
                      }))
                    }
                    className="sm:col-span-2"
                  />
                  <AdminField
                    label="Current focus"
                    value={data.systemStatus?.currentFocus ?? ""}
                    onChange={(v) =>
                      setData((d) => ({
                        ...d,
                        systemStatus: {
                          ...(d.systemStatus ?? {
                            isAvailable: true,
                            statusText: "",
                            location: "",
                            currentFocus: "",
                            activeClientSlots: "",
                          }),
                          currentFocus: v,
                        },
                      }))
                    }
                    className="sm:col-span-2"
                  />
                  <label className="flex items-center gap-2 text-sm text-white/70 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={data.systemStatus?.isAvailable ?? true}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          systemStatus: {
                            ...(d.systemStatus ?? {
                              isAvailable: true,
                              statusText: "",
                              location: "",
                              currentFocus: "",
                              activeClientSlots: "",
                            }),
                            isAvailable: e.target.checked,
                          },
                        }))
                      }
                      className="size-4 accent-cyan-400"
                    />
                    Available for hire
                  </label>
                </div>
              </div>
              <AdminField
                label="GitHub"
                value={data.social.github}
                onChange={(v) => updateSocial("github", v)}
              />
              <AdminField
                label="LinkedIn"
                value={data.social.linkedin}
                onChange={(v) => updateSocial("linkedin", v)}
              />
              <AdminField
                label="Twitter"
                value={data.social.twitter}
                onChange={(v) => updateSocial("twitter", v)}
              />
              <AdminField
                label="Website"
                value={data.social.website}
                onChange={(v) => updateSocial("website", v)}
              />
            </div>

            <div>
              <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                Hero stat cards
              </h3>
              <div className="space-y-4">
                {data.showcase.map((stat, i) => (
                  <div
                    key={stat.id}
                    className="grid gap-3 rounded-xl border border-white/10 bg-[#080808]/60 p-4 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <AdminField
                      label="Value"
                      value={stat.value}
                      onChange={(v) => updateShowcase(i, "value", v)}
                    />
                    <AdminField
                      label="Label"
                      value={stat.label}
                      onChange={(v) => updateShowcase(i, "label", v)}
                    />
                    <div className="flex items-end gap-2 pb-1">
                      <MoveControls
                        index={i}
                        total={data.showcase.length}
                        onMove={(dir) =>
                          setData((d) => ({
                            ...d,
                            showcase: moveItem(d.showcase, i, dir),
                          }))
                        }
                      />
                      <AdminButton
                        type="button"
                        variant="danger"
                        onClick={() => removeShowcase(i)}
                        className="!px-2.5 !py-2"
                      >
                        <Trash2 className="size-3.5" />
                      </AdminButton>
                    </div>
                  </div>
                ))}
                <AdminButton type="button" variant="accent" onClick={addShowcase}>
                  <Plus className="size-3.5" /> Add stat
                </AdminButton>
              </div>
            </div>
            </div>
          )}

          {tab === "about" && (
            <div className="space-y-8">
              <AdminAboutPanel
                aboutSection={
                  data.aboutSection ?? {
                    displayHeadline: "",
                    trueFocusSentence: "",
                    summary: "",
                  }
                }
                aboutStats={data.aboutStats ?? []}
                philosophyPillars={data.philosophyPillars ?? []}
                onAboutSectionChange={(aboutSection) =>
                  setData((d) => ({ ...d, aboutSection }))
                }
                onAboutStatsChange={(aboutStats) =>
                  setData((d) => ({ ...d, aboutStats }))
                }
                onPillarsChange={(philosophyPillars) =>
                  setData((d) => ({ ...d, philosophyPillars }))
                }
              />
              <div className="rounded-xl border border-white/10 bg-[#080808]/60 p-5">
                <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Legacy about fields (SEO / metadata)
                </h3>
                <div className="space-y-4">
              <AdminField
                label="Headline"
                value={data.about.headline}
                onChange={(v) => updateAbout("headline", v)}
              />
              <div>
                <AdminLabel>Bio</AdminLabel>
                <AdminTextarea
                  value={data.about.bio}
                  onChange={(e) => updateAbout("bio", e.target.value)}
                  rows={5}
                />
              </div>
              <div>
                <AdminLabel>Highlights (one per line)</AdminLabel>
                <AdminTextarea
                  value={(data.about.highlights ?? []).join("\n")}
                  onChange={(e) =>
                    updateAbout(
                      "highlights",
                      e.target.value.split("\n").filter(Boolean),
                    )
                  }
                  rows={4}
                />
              </div>
                </div>
              </div>
            </div>
          )}

          {tab === "projects" && (
            <AdminProjectsPanel
              projects={data.projects}
              onChange={(projects) => setData((d) => ({ ...d, projects }))}
            />
          )}

          {tab === "skills" && (
            <AdminSkillsPanel
              section={
                data.skillsSection ?? {
                  headline: "A Robust Stack",
                  headlineAccent: "Built for Velocity & Resilience.",
                  description:
                    "From GPU shader math to PLC register polling, low-latency WebSockets, and modern Next.js 15 architectures.",
                }
              }
              categories={data.skillCategories ?? []}
              onSectionChange={(skillsSection) =>
                setData((d) => ({ ...d, skillsSection }))
              }
              onCategoriesChange={(skillCategories) =>
                setData((d) => ({ ...d, skillCategories }))
              }
            />
          )}

          {tab === "experience" && (
            <div className="space-y-6">
              <p className="text-sm text-white/50">
                Each entry is one company block on the About section carousel.
                Add a new company when you switch jobs — reorder with the arrows.
              </p>
              {data.experience.map((exp, i) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-white/10 bg-[#080808]/80 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Company {String(i + 1).padStart(2, "0")}
                      {exp.company ? ` · ${exp.company}` : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <MoveControls
                        index={i}
                        total={data.experience.length}
                        onMove={(dir) =>
                          setData((d) => ({
                            ...d,
                            experience: moveItem(d.experience, i, dir),
                          }))
                        }
                      />
                      <AdminButton
                        type="button"
                        variant="danger"
                        onClick={() => removeExperience(i)}
                        className="!px-2.5 !py-2"
                      >
                        <Trash2 className="size-3.5" />
                      </AdminButton>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <AdminField
                      label="Company"
                      value={exp.company}
                      onChange={(v) => updateExperience(i, "company", v)}
                    />
                    <AdminField
                      label="Role"
                      value={exp.role}
                      onChange={(v) => updateExperience(i, "role", v)}
                    />
                    <AdminField
                      label="Period"
                      value={exp.period}
                      onChange={(v) => updateExperience(i, "period", v)}
                      placeholder="2022 — Present (2 Years 9 Months)"
                    />
                    <AdminField
                      label="Location"
                      value={exp.location}
                      onChange={(v) => updateExperience(i, "location", v)}
                    />
                    <AdminField
                      label="Employment type"
                      value={exp.type}
                      onChange={(v) => updateExperience(i, "type", v)}
                      placeholder="Full-Time"
                    />
                    <AdminField
                      label="Badge (optional)"
                      value={exp.badge ?? ""}
                      onChange={(v) => updateExperience(i, "badge", v)}
                      placeholder="2y 9m Experience"
                    />
                    <div className="sm:col-span-2">
                      <AdminLabel>Summary</AdminLabel>
                      <AdminTextarea
                        value={exp.summary}
                        onChange={(e) =>
                          updateExperience(i, "summary", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <AdminLabel>Highlights (one per line)</AdminLabel>
                      <AdminTextarea
                        value={(exp.highlights ?? []).join("\n")}
                        onChange={(e) =>
                          updateExperience(
                            i,
                            "highlights",
                            e.target.value.split("\n").filter(Boolean),
                          )
                        }
                        rows={6}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <AdminLabel>Tech stack (comma-separated)</AdminLabel>
                      <AdminTextarea
                        value={(exp.techStack ?? []).join(", ")}
                        onChange={(e) =>
                          updateExperience(
                            i,
                            "techStack",
                            e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          )
                        }
                        rows={2}
                        placeholder="React.js, Next.js, TypeScript"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <AdminButton type="button" variant="accent" onClick={addExperience}>
                <Plus className="size-3.5" /> Add Company
              </AdminButton>
            </div>
          )}

          {tab === "education" && (
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-300/80">
                  Education
                </h3>
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div
                      key={edu.id}
                      className="rounded-lg border border-white/10 bg-[#0a0a0a] p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-white/50">
                          Entry {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeEducation(i)}
                          className="rounded border border-white/15 p-1.5 text-red-300 transition hover:border-red-400/50"
                          aria-label="Remove education"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <AdminField
                          label="Degree"
                          value={edu.degree}
                          onChange={(v) => updateEducation(i, "degree", v)}
                          className="sm:col-span-2"
                        />
                        <AdminField
                          label="Institution"
                          value={edu.institution}
                          onChange={(v) =>
                            updateEducation(i, "institution", v)
                          }
                        />
                        <AdminField
                          label="Period"
                          value={edu.period}
                          onChange={(v) => updateEducation(i, "period", v)}
                        />
                        <AdminField
                          label="Location"
                          value={edu.location}
                          onChange={(v) => updateEducation(i, "location", v)}
                          className="sm:col-span-2"
                        />
                        <div className="sm:col-span-2">
                          <AdminLabel>Details</AdminLabel>
                          <AdminTextarea
                            value={edu.details ?? ""}
                            onChange={(e) =>
                              setData((d) => {
                                const education = [...d.education];
                                education[i] = {
                                  ...education[i],
                                  details: e.target.value,
                                };
                                return { ...d, education };
                              })
                            }
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <AdminButton type="button" variant="accent" onClick={addEducation}>
                    <Plus className="size-3.5" /> Add Education
                  </AdminButton>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-300/80">
                  Certifications
                </h3>
                <div className="space-y-4">
                  {data.certifications.map((cert, i) => (
                    <div
                      key={cert.id}
                      className="rounded-lg border border-white/10 bg-[#0a0a0a] p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-white/50">
                          Cert {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCertification(i)}
                          className="rounded border border-white/15 p-1.5 text-red-300 transition hover:border-red-400/50"
                          aria-label="Remove certification"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <AdminField
                          label="Name"
                          value={cert.name}
                          onChange={(v) => updateCertification(i, "name", v)}
                          className="sm:col-span-2"
                        />
                        <AdminField
                          label="Issuer"
                          value={cert.issuer}
                          onChange={(v) => updateCertification(i, "issuer", v)}
                        />
                        <AdminField
                          label="Year"
                          value={cert.year}
                          onChange={(v) => updateCertification(i, "year", v)}
                        />
                      </div>
                    </div>
                  ))}
                  <AdminButton type="button" variant="accent" onClick={addCertification}>
                    <Plus className="size-3.5" /> Add Certification
                  </AdminButton>
                </div>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-10">
              <AdminThemeSettings
                theme={data.theme}
                onChange={(theme) => setData((d) => ({ ...d, theme }))}
              />

              <div>
                <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  SEO metadata
                </h3>
                <div className="space-y-4">
                  <AdminField
                    label="Page Title"
                    value={data.seo.title}
                    onChange={(v) => updateSeo("title", v)}
                  />
                  <div>
                    <AdminLabel>Meta Description</AdminLabel>
                    <AdminTextarea
                      value={data.seo.description}
                      onChange={(e) => updateSeo("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "inbox" && (
            <AdminMessages initialMessages={initialMessages} />
          )}
          </AdminPanel>
        </main>
      </div>
    </div>
  );
}
