import { PortfolioExperience } from "@/cinematic/components/experience/PortfolioExperience";
import { getPortfolioData } from "@/lib/portfolio";

export default async function HomePage() {
  const data = await getPortfolioData();
  return (
    <PortfolioExperience
      theme={data.theme}
      experiences={data.experience}
      skillCategories={data.skillCategories}
      skillsSection={data.skillsSection}
      totalTenureLabel={data.profile.totalExperience}
      aboutSection={data.aboutSection}
      aboutStats={data.aboutStats}
      philosophyPillars={data.philosophyPillars}
      education={data.education}
      certifications={data.certifications}
      profile={data.profile}
      social={data.social}
      systemStatus={data.systemStatus}
      projects={data.projects}
    />
  );
}
