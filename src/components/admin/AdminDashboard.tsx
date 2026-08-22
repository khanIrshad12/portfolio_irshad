"use client";

import { useState } from "react";
import type { PortfolioData, Project, Experience, Skill } from "@/lib/types";

type Tab =
  | "profile"
  | "about"
  | "showcase"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "theme"
  | "seo";

interface AdminDashboardProps {
  initialData: PortfolioData;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "about", label: "About" },
  { id: "showcase", label: "Showcase" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "theme", label: "Theme" },
  { id: "seo", label: "SEO" },
];

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [tab, setTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("Saved! Refresh the site to see changes.");
    } catch {
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

  function updateAbout(field: keyof PortfolioData["about"], value: string | string[]) {
    setData((d) => ({ ...d, about: { ...d.about, [field]: value } }));
  }

  function updateTheme(field: keyof PortfolioData["theme"], value: string) {
    setData((d) => ({ ...d, theme: { ...d.theme, [field]: value } }));
  }

  function updateSeo(field: keyof PortfolioData["seo"], value: string) {
    setData((d) => ({ ...d, seo: { ...d.seo, [field]: value } }));
  }

  function updateProject(index: number, field: keyof Project, value: string | boolean | string[]) {
    setData((d) => {
      const projects = [...d.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...d, projects };
    });
  }

  function addProject() {
    setData((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: String(Date.now()),
          title: "New Project",
          company: "",
          description: "",
          highlights: [],
          tags: [],
          url: "",
          linkLabel: "",
          featured: false,
        },
      ],
    }));
  }

  function removeProject(index: number) {
    setData((d) => ({
      ...d,
      projects: d.projects.filter((_, i) => i !== index),
    }));
  }

  function updateSkill(index: number, field: keyof Skill, value: string | number) {
    setData((d) => {
      const skills = [...d.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...d, skills };
    });
  }

  function addSkill() {
    setData((d) => ({
      ...d,
      skills: [...d.skills, { name: "New Skill", level: 50 }],
    }));
  }

  function removeSkill(index: number) {
    setData((d) => ({
      ...d,
      skills: d.skills.filter((_, i) => i !== index),
    }));
  }

  function updateExperience(index: number, field: keyof Experience, value: string) {
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
        {
          id: String(Date.now()),
          company: "",
          role: "",
          period: "",
          description: "",
        },
      ],
    }));
  }

  function removeExperience(index: number) {
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="container-narrow px-5 py-8 md:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl">
            Customize Portfolio
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Edit content, projects, and neo-brutalist theme colors.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="brutal-btn brutal-btn-primary disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {message && (
        <p
          className={`mb-6 border-[3px] border-[var(--color-ink)] px-4 py-3 text-sm font-semibold ${
            message.includes("Failed")
              ? "bg-[var(--color-primary)] text-[var(--color-bg)]"
              : "bg-[var(--color-accent)]"
          }`}
          role="status"
        >
          {message}
        </p>
      )}

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`brutal-btn px-4 py-2 text-xs ${
              tab === t.id ? "brutal-btn-primary" : "brutal-btn-ghost"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="brutal-card p-6 md:p-8">
        {tab === "profile" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={data.profile.name} onChange={(v) => updateProfile("name", v)} />
            <Field label="Title" value={data.profile.title} onChange={(v) => updateProfile("title", v)} />
            <Field label="Tagline" value={data.profile.tagline} onChange={(v) => updateProfile("tagline", v)} className="sm:col-span-2" />
            <Field label="Email" value={data.profile.email} onChange={(v) => updateProfile("email", v)} />
            <Field label="Phone" value={data.profile.phone} onChange={(v) => updateProfile("phone", v)} />
            <Field label="Location" value={data.profile.location} onChange={(v) => updateProfile("location", v)} />
            <Field label="Current company" value={data.profile.currentCompany ?? ""} onChange={(v) => updateProfile("currentCompany", v)} />
            <Field label="Current role" value={data.profile.currentRole ?? ""} onChange={(v) => updateProfile("currentRole", v)} />
            <Field label="Total experience" value={data.profile.totalExperience ?? ""} onChange={(v) => updateProfile("totalExperience", v)} placeholder="2 years 6 months" />
            <ResumeUpload
              resumeUrl={data.profile.resumeUrl}
              onUrlChange={(url) => updateProfile("resumeUrl", url)}
            />
            <Field label="GitHub" value={data.social.github} onChange={(v) => updateSocial("github", v)} />
            <Field label="LinkedIn" value={data.social.linkedin} onChange={(v) => updateSocial("linkedin", v)} />
            <Field label="Twitter" value={data.social.twitter} onChange={(v) => updateSocial("twitter", v)} />
            <Field label="Website" value={data.social.website} onChange={(v) => updateSocial("website", v)} />
          </div>
        )}

        {tab === "about" && (
          <div className="space-y-4">
            <Field label="Headline" value={data.about.headline} onChange={(v) => updateAbout("headline", v)} />
            <div>
              <label className="brutal-label">Bio</label>
              <textarea
                value={data.about.bio}
                onChange={(e) => updateAbout("bio", e.target.value)}
                rows={5}
                className="brutal-input resize-y"
              />
            </div>
            <div>
              <label className="brutal-label">Highlights (one per line)</label>
              <textarea
                value={data.about.highlights.join("\n")}
                onChange={(e) => updateAbout("highlights", e.target.value.split("\n").filter(Boolean))}
                rows={4}
                className="brutal-input resize-y"
              />
            </div>
          </div>
        )}

        {tab === "showcase" && (
          <div className="space-y-4">
            {(data.showcase ?? []).map((stat, i) => (
              <div key={stat.id} className="grid gap-3 border-b-2 border-[var(--color-ink)]/20 pb-4 sm:grid-cols-3">
                <Field label="Value" value={stat.value} onChange={(v) => {
                  const showcase = [...(data.showcase ?? [])];
                  showcase[i] = { ...showcase[i], value: v };
                  setData((d) => ({ ...d, showcase }));
                }} />
                <Field label="Label" value={stat.label} onChange={(v) => {
                  const showcase = [...(data.showcase ?? [])];
                  showcase[i] = { ...showcase[i], label: v };
                  setData((d) => ({ ...d, showcase }));
                }} />
                <button type="button" onClick={() => setData((d) => ({ ...d, showcase: (d.showcase ?? []).filter((_, j) => j !== i) }))} className="self-end text-xs font-semibold text-[var(--color-primary)] pb-2">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setData((d) => ({ ...d, showcase: [...(d.showcase ?? []), { id: String(Date.now()), value: "0", label: "New stat" }] }))} className="brutal-btn brutal-btn-accent text-xs">
              + Add stat
            </button>
          </div>
        )}

        {tab === "projects" && (
          <div className="space-y-6">
            {data.projects.map((project, i) => (
              <div key={project.id} className="border-[3px] border-[var(--color-ink)] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase">Project {i + 1}</span>
                  <button type="button" onClick={() => removeProject(i)} className="text-xs font-semibold text-[var(--color-primary)]">
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title" value={project.title} onChange={(v) => updateProject(i, "title", v)} />
                  <Field label="Company" value={project.company ?? ""} onChange={(v) => updateProject(i, "company", v)} />
                  <Field label="URL" value={project.url} onChange={(v) => updateProject(i, "url", v)} />
                  <Field label="Link label" value={project.linkLabel ?? ""} onChange={(v) => updateProject(i, "linkLabel", v)} placeholder="Live Website" />
                  <Field label="Tags (comma-separated)" value={project.tags.join(", ")} onChange={(v) => updateProject(i, "tags", v.split(",").map((t) => t.trim()).filter(Boolean))} className="sm:col-span-2" />
                  <div className="sm:col-span-2">
                    <label className="brutal-label">Description</label>
                    <textarea value={project.description} onChange={(e) => updateProject(i, "description", e.target.value)} rows={3} className="brutal-input resize-y" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="brutal-label">Highlights (one per line)</label>
                    <textarea
                      value={(project.highlights ?? []).join("\n")}
                      onChange={(e) =>
                        updateProject(
                          i,
                          "highlights",
                          e.target.value.split("\n").filter(Boolean),
                        )
                      }
                      rows={4}
                      className="brutal-input resize-y"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input type="checkbox" checked={project.featured} onChange={(e) => updateProject(i, "featured", e.target.checked)} className="size-4 border-2 border-[var(--color-ink)]" />
                    Featured project
                  </label>
                </div>
              </div>
            ))}
            <button type="button" onClick={addProject} className="brutal-btn brutal-btn-accent text-xs">
              + Add Project
            </button>
          </div>
        )}

        {tab === "skills" && (
          <div className="space-y-4">
            {data.skills.map((skill, i) => (
              <div key={skill.name + i} className="flex flex-wrap items-end gap-3 border-b-2 border-[var(--color-ink)]/20 pb-4">
                <Field label="Skill" value={skill.name} onChange={(v) => updateSkill(i, "name", v)} className="flex-1 min-w-[140px]" />
                <div className="w-32">
                  <label className="brutal-label">Level ({skill.level}%)</label>
                  <input type="range" min={0} max={100} value={skill.level} onChange={(e) => updateSkill(i, "level", Number(e.target.value))} className="w-full" />
                </div>
                <button type="button" onClick={() => removeSkill(i)} className="text-xs font-semibold text-[var(--color-primary)] pb-2">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addSkill} className="brutal-btn brutal-btn-accent text-xs">
              + Add Skill
            </button>
          </div>
        )}

        {tab === "experience" && (
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="border-[3px] border-[var(--color-ink)] p-4">
                <div className="mb-4 flex justify-between">
                  <span className="text-xs font-bold uppercase">Role {i + 1}</span>
                  <button type="button" onClick={() => removeExperience(i)} className="text-xs font-semibold text-[var(--color-primary)]">
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Role" value={exp.role} onChange={(v) => updateExperience(i, "role", v)} />
                  <Field label="Company" value={exp.company} onChange={(v) => updateExperience(i, "company", v)} />
                  <Field label="Period" value={exp.period} onChange={(v) => updateExperience(i, "period", v)} />
                  <div className="sm:col-span-2">
                    <label className="brutal-label">Description</label>
                    <textarea value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} rows={2} className="brutal-input resize-y" />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="brutal-btn brutal-btn-accent text-xs">
              + Add Experience
            </button>
          </div>
        )}

        {tab === "education" && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">Education</h3>
              <div className="space-y-4">
                {(data.education ?? []).map((edu, i) => (
                  <div key={edu.id} className="border-[3px] border-[var(--color-ink)] p-4">
                    <div className="mb-3 flex justify-between">
                      <span className="text-xs font-bold uppercase">Entry {i + 1}</span>
                      <button type="button" onClick={() => setData((d) => ({ ...d, education: (d.education ?? []).filter((_, j) => j !== i) }))} className="text-xs font-semibold text-[var(--color-primary)]">Remove</button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Degree" value={edu.degree} onChange={(v) => { const education = [...(data.education ?? [])]; education[i] = { ...education[i], degree: v }; setData((d) => ({ ...d, education })); }} className="sm:col-span-2" />
                      <Field label="Institution" value={edu.institution} onChange={(v) => { const education = [...(data.education ?? [])]; education[i] = { ...education[i], institution: v }; setData((d) => ({ ...d, education })); }} />
                      <Field label="Period" value={edu.period} onChange={(v) => { const education = [...(data.education ?? [])]; education[i] = { ...education[i], period: v }; setData((d) => ({ ...d, education })); }} />
                      <Field label="Location" value={edu.location} onChange={(v) => { const education = [...(data.education ?? [])]; education[i] = { ...education[i], location: v }; setData((d) => ({ ...d, education })); }} className="sm:col-span-2" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setData((d) => ({ ...d, education: [...(d.education ?? []), { id: String(Date.now()), degree: "", institution: "", location: "", period: "" }] }))} className="brutal-btn brutal-btn-accent text-xs">+ Add Education</button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase">Certifications</h3>
              <div className="space-y-4">
                {(data.certifications ?? []).map((cert, i) => (
                  <div key={cert.id} className="border-[3px] border-[var(--color-ink)] p-4">
                    <div className="mb-3 flex justify-between">
                      <span className="text-xs font-bold uppercase">Cert {i + 1}</span>
                      <button type="button" onClick={() => setData((d) => ({ ...d, certifications: (d.certifications ?? []).filter((_, j) => j !== i) }))} className="text-xs font-semibold text-[var(--color-primary)]">Remove</button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Name" value={cert.name} onChange={(v) => { const certifications = [...(data.certifications ?? [])]; certifications[i] = { ...certifications[i], name: v }; setData((d) => ({ ...d, certifications })); }} className="sm:col-span-2" />
                      <Field label="Issuer" value={cert.issuer} onChange={(v) => { const certifications = [...(data.certifications ?? [])]; certifications[i] = { ...certifications[i], issuer: v }; setData((d) => ({ ...d, certifications })); }} />
                      <Field label="Year" value={cert.year} onChange={(v) => { const certifications = [...(data.certifications ?? [])]; certifications[i] = { ...certifications[i], year: v }; setData((d) => ({ ...d, certifications })); }} />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setData((d) => ({ ...d, certifications: [...(d.certifications ?? []), { id: String(Date.now()), name: "", issuer: "", year: "" }] }))} className="brutal-btn brutal-btn-accent text-xs">+ Add Certification</button>
              </div>
            </div>
          </div>
        )}

        {tab === "theme" && (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-muted)]">
              Use OKLCH color values. Changes apply site-wide after save + refresh.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["primary", "Primary (crimson CTAs)"],
                  ["accent", "Accent (yellow highlights)"],
                  ["background", "Background"],
                  ["surface", "Surface (cards)"],
                  ["ink", "Ink (text & borders)"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="brutal-label">{label}</label>
                  <div className="flex gap-2">
                    <input
                      value={data.theme[key]}
                      onChange={(e) => updateTheme(key, e.target.value)}
                      className="brutal-input flex-1 font-mono text-xs"
                    />
                    <span
                      className="brutal-border size-11 shrink-0"
                      style={{ background: data.theme[key] }}
                      aria-hidden
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="brutal-border p-4" style={{ background: data.theme.background }}>
              <p style={{ color: data.theme.ink }} className="font-semibold">
                Preview text on background
              </p>
              <button
                type="button"
                className="mt-3 px-4 py-2 text-sm font-bold uppercase"
                style={{
                  background: data.theme.primary,
                  color: data.theme.background,
                  border: `3px solid ${data.theme.ink}`,
                  boxShadow: `4px 4px 0 ${data.theme.ink}`,
                }}
              >
                Primary Button
              </button>
            </div>
          </div>
        )}

        {tab === "seo" && (
          <div className="space-y-4">
            <Field label="Page Title" value={data.seo.title} onChange={(v) => updateSeo("title", v)} />
            <div>
              <label className="brutal-label">Meta Description</label>
              <textarea value={data.seo.description} onChange={(e) => updateSeo("description", e.target.value)} rows={3} className="brutal-input resize-y" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className = "",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label className="brutal-label">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="brutal-input"
      />
    </div>
  );
}

function ResumeUpload({
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

      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body,
      });
      const json = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        throw new Error(json.error ?? "Upload failed");
      }

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

  return (
    <div className="sm:col-span-2 space-y-3 border-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] p-4">
      <p className="brutal-label mb-0">Resume</p>
      <p className="text-xs text-[var(--color-muted)]">
        Upload a PDF / DOC / DOCX (max 5 MB). Uploading a new file deletes the previous one.
      </p>

      {resumeUrl ? (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            View current resume
          </a>
          <span className="truncate text-xs text-[var(--color-muted)] max-w-[240px]">
            {resumeUrl}
          </span>
        </div>
      ) : (
        <p className="text-sm text-[var(--color-muted)]">No resume on file.</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="brutal-btn brutal-btn-accent text-xs cursor-pointer">
          {uploading ? "Uploading…" : "Upload resume"}
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              void handleUpload(file);
              e.target.value = "";
            }}
          />
        </label>
        {resumeUrl && (
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={uploading}
            className="brutal-btn brutal-btn-ghost text-xs disabled:opacity-60"
          >
            Remove
          </button>
        )}
        {fileName && !status.includes("removed") && (
          <span className="text-xs text-[var(--color-muted)]">{fileName}</span>
        )}
      </div>

      <Field
        label="Or paste external URL"
        value={resumeUrl}
        onChange={onUrlChange}
        placeholder="/uploads/resume.pdf or https://…"
      />

      {status && (
        <p
          className={`text-xs font-semibold ${
            status.toLowerCase().includes("fail") ||
            status.toLowerCase().includes("only") ||
            status.toLowerCase().includes("large") ||
            status.toLowerCase().includes("invalid")
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-ink)]"
          }`}
          role="status"
        >
          {status}
        </p>
      )}
    </div>
  );
}

