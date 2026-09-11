import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { put, del } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";
import {
  RESUME_PUBLIC_PREFIX,
  RESUME_UPLOAD_DIR,
  deleteLocalResume,
  ensureUploadDir,
  isAllowedResume,
  purgeOldResumeFiles,
} from "@/lib/resume";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("resume");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const check = isAllowedResume({
      name: file.name,
      type: file.type,
      size: file.size,
    });
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 400 });
    }

    const data = await getPortfolioData();
    const previousUrl = data.profile.resumeUrl;
    const fileName = `resume-${Date.now()}${check.ext}`;

    let publicUrl = "";

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      if (previousUrl && previousUrl.includes("vercel-storage.com")) {
        try {
          await del(previousUrl);
        } catch {
          // ignore
        }
      }
      const blob = await put(`resumes/${fileName}`, file, {
        access: "public",
      });
      publicUrl = blob.url;
    } else {
      try {
        await ensureUploadDir();
        const diskPath = path.join(RESUME_UPLOAD_DIR, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(diskPath, buffer);

        await deleteLocalResume(previousUrl);
        await purgeOldResumeFiles(fileName);

        publicUrl = `${RESUME_PUBLIC_PREFIX}${fileName}`;
      } catch (fsErr) {
        console.error("Local disk upload failed:", fsErr);
        return NextResponse.json(
          {
            error:
              "Server filesystem is read-only. Please connect Vercel Blob Storage in your Vercel Dashboard (or paste an external URL).",
          },
          { status: 500 }
        );
      }
    }

    data.profile.resumeUrl = publicUrl;
    await savePortfolioData(data);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Upload failed";
    console.error("Resume upload error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getPortfolioData();
    const previousUrl = data.profile.resumeUrl;

    if (previousUrl && previousUrl.includes("vercel-storage.com") && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await del(previousUrl);
      } catch {
        // ignore
      }
    } else {
      await deleteLocalResume(previousUrl);
      await purgeOldResumeFiles();
    }

    data.profile.resumeUrl = "";
    await savePortfolioData(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

