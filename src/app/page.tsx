import { getPortfolioData } from "@/lib/portfolio";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { Showcase } from "@/components/portfolio/Showcase";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ThemeCursor } from "@/components/portfolio/ThemeCursor";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <>
      <ThemeCursor />
      <Navigation profile={data.profile} social={data.social} />
      <main>
        <Hero profile={data.profile} social={data.social} />
        <Showcase stats={data.showcase} />
        <About about={data.about} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Education
          education={data.education}
          certifications={data.certifications}
        />
        <Contact profile={data.profile} social={data.social} />
      </main>
      <Footer profile={data.profile} social={data.social} />
    </>
  );
}
