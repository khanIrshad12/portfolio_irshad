import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio";
import type { PortfolioData } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getPortfolioData();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PortfolioData;
    await savePortfolioData(body);
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/admin", "layout");
    revalidatePath("/admin");
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const partial = (await request.json()) as Partial<PortfolioData>;
    const current = await getPortfolioData();
    const updated: PortfolioData = {
      ...current,
      ...partial,
      profile: partial.profile ? { ...current.profile, ...partial.profile } : current.profile,
      social: partial.social ? { ...current.social, ...partial.social } : current.social,
      theme: partial.theme ? { ...current.theme, ...partial.theme } : current.theme,
      seo: partial.seo ? { ...current.seo, ...partial.seo } : current.seo,
      aboutSection: partial.aboutSection
        ? { ...current.aboutSection, ...partial.aboutSection }
        : current.aboutSection,
      skillsSection: partial.skillsSection
        ? { ...current.skillsSection, ...partial.skillsSection }
        : current.skillsSection,
      systemStatus: partial.systemStatus
        ? { ...current.systemStatus, ...partial.systemStatus }
        : current.systemStatus,
      experience: partial.experience ?? current.experience,
      projects: partial.projects ?? current.projects,
      skillCategories: partial.skillCategories ?? current.skillCategories,
      education: partial.education ?? current.education,
      certifications: partial.certifications ?? current.certifications,
      philosophyPillars: partial.philosophyPillars ?? current.philosophyPillars,
      aboutStats: partial.aboutStats ?? current.aboutStats,
      showcase: partial.showcase ?? current.showcase,
    };

    await savePortfolioData(updated);
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/admin", "layout");
    revalidatePath("/admin");
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PATCH portfolio error:", err);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
