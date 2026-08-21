import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
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

    await ensureUploadDir();

    const fileName = `resume-${Date.now()}${check.ext}`;
    const diskPath = path.join(RESUME_UPLOAD_DIR, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(diskPath, buffer);

    // New file is safe — remove previous local resume + leftovers
    await deleteLocalResume(previousUrl);
    await purgeOldResumeFiles(fileName);

    const publicUrl = `${RESUME_PUBLIC_PREFIX}${fileName}`;
    data.profile.resumeUrl = publicUrl;
    await savePortfolioData(data);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getPortfolioData();
    const previousUrl = data.profile.resumeUrl;

    await deleteLocalResume(previousUrl);
    await purgeOldResumeFiles();

    data.profile.resumeUrl = "";
    await savePortfolioData(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
