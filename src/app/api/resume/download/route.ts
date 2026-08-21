import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getPortfolioData } from "@/lib/portfolio";
import { resumeUrlToDiskPath } from "@/lib/resume";

function downloadFileName(profileName: string, ext: string): string {
  const base =
    profileName
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "Resume";
  return `${base}-Resume${ext}`;
}

function mimeForExt(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".pdf":
      return "application/pdf";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}

/** Public download — forces save dialog instead of opening in a new tab */
export async function GET() {
  try {
    const data = await getPortfolioData();
    const resumeUrl = data.profile.resumeUrl?.trim();

    if (!resumeUrl) {
      return NextResponse.json({ error: "No resume available" }, { status: 404 });
    }

    const diskPath = resumeUrlToDiskPath(resumeUrl);

    if (diskPath) {
      const file = await fs.readFile(diskPath);
      const ext = path.extname(diskPath) || ".pdf";
      const fileName = downloadFileName(data.profile.name, ext);

      return new NextResponse(file, {
        status: 200,
        headers: {
          "Content-Type": mimeForExt(ext),
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Cache-Control": "private, no-cache",
        },
      });
    }

    // External URL — fetch and re-serve as attachment when possible
    if (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")) {
      const upstream = await fetch(resumeUrl, { cache: "no-store" });
      if (!upstream.ok) {
        return NextResponse.json({ error: "Resume not reachable" }, { status: 502 });
      }

      const ext =
        path.extname(new URL(resumeUrl).pathname) ||
        (upstream.headers.get("content-type")?.includes("pdf") ? ".pdf" : ".pdf");
      const fileName = downloadFileName(data.profile.name, ext);
      const buffer = Buffer.from(await upstream.arrayBuffer());
      const contentType =
        upstream.headers.get("content-type") ?? mimeForExt(ext);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Cache-Control": "private, no-cache",
        },
      });
    }

    // Same-origin path outside /uploads (e.g. /resume.pdf in public/)
    const publicPath = path.join(
      process.cwd(),
      "public",
      resumeUrl.replace(/^\//, "").split("?")[0],
    );
    try {
      const file = await fs.readFile(publicPath);
      const ext = path.extname(publicPath) || ".pdf";
      const fileName = downloadFileName(data.profile.name, ext);
      return new NextResponse(file, {
        status: 200,
        headers: {
          "Content-Type": mimeForExt(ext),
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Cache-Control": "private, no-cache",
        },
      });
    } catch {
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
