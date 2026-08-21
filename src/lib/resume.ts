import fs from "fs/promises";
import path from "path";

export const RESUME_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
export const RESUME_PUBLIC_PREFIX = "/uploads/";

const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

export function isAllowedResume(file: {
  name: string;
  type: string;
  size: number;
}): { ok: true; ext: string } | { ok: false; error: string } {
  if (file.size <= 0) return { ok: false, error: "Empty file" };
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: "File too large (max 5 MB)" };
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return { ok: false, error: "Only PDF, DOC, or DOCX allowed" };
  }

  // Some browsers send empty type — trust extension in that case
  if (file.type && !ALLOWED_MIME.has(file.type) && file.type !== "application/octet-stream") {
    return { ok: false, error: "Invalid file type" };
  }

  return { ok: true, ext };
}

/** Map a public URL like /uploads/resume-123.pdf → absolute disk path, or null if external */
export function resumeUrlToDiskPath(resumeUrl: string | undefined | null): string | null {
  if (!resumeUrl) return null;
  try {
    const pathname = resumeUrl.startsWith("http")
      ? new URL(resumeUrl).pathname
      : resumeUrl.split("?")[0];
    if (!pathname.startsWith(RESUME_PUBLIC_PREFIX)) return null;
    const relative = pathname.slice(RESUME_PUBLIC_PREFIX.length);
    if (!relative || relative.includes("..") || path.isAbsolute(relative)) {
      return null;
    }
    return path.join(RESUME_UPLOAD_DIR, relative);
  } catch {
    return null;
  }
}

export async function ensureUploadDir(): Promise<void> {
  await fs.mkdir(RESUME_UPLOAD_DIR, { recursive: true });
}

/** Delete a previous local resume file if it lives under public/uploads */
export async function deleteLocalResume(resumeUrl: string | undefined | null): Promise<void> {
  const diskPath = resumeUrlToDiskPath(resumeUrl);
  if (!diskPath) return;
  try {
    await fs.unlink(diskPath);
  } catch {
    // already gone
  }
}

/** Remove any leftover resume-* files in uploads (keeps folder tidy) */
export async function purgeOldResumeFiles(keepFileName?: string): Promise<void> {
  try {
    await ensureUploadDir();
    const entries = await fs.readdir(RESUME_UPLOAD_DIR);
    await Promise.all(
      entries.map(async (name) => {
        if (keepFileName && name === keepFileName) return;
        const lower = name.toLowerCase();
        if (
          lower.startsWith("resume") &&
          (lower.endsWith(".pdf") ||
            lower.endsWith(".doc") ||
            lower.endsWith(".docx"))
        ) {
          try {
            await fs.unlink(path.join(RESUME_UPLOAD_DIR, name));
          } catch {
            // ignore
          }
        }
      }),
    );
  } catch {
    // ignore
  }
}
