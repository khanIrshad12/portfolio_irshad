"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import "@/cinematic/index.css";
import { ParticleCanvas, ParticleCanvasHandle } from '../canvas/ParticleCanvas';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { RealtimeSection } from '../sections/RealtimeSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ContactSection } from '../sections/ContactSection';
import { ParticleControllerUI } from '../ui/ParticleControllerUI';
import { ProjectModal } from '../ui/ProjectModal';
import { Project, ParticleStateId } from '../../types';
import { HeroAboutBridge } from '../reactbits/HeroAboutBridge';
import { ChapterReveal, ContinuitySection } from '../reactbits/ScrollReveal';
import { PageScanner } from '../reactbits/PageScanner';
import { StickyPageBlur } from '../reactbits/StickyPageBlur';
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  SmoothScroll,
  useLenisHtmlClass,
  useSmoothScrollTo,
} from "../providers/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { EASE_OUT_EXPO } from "@/cinematic/lib/motion";
import { themeToCinematicCssVars } from "@/lib/cinematic-theme";
import type {
  Theme,
  Experience,
  SkillCategory,
  SkillsSectionMeta,
  Profile,
  SocialLinks,
  AboutSectionMeta,
  AboutStatCard,
  PhilosophyPillar,
  Education,
  Certification,
  SystemStatus,
  Project as PortfolioProject,
} from "@/lib/types";
import { experiencesToCinematicItems } from "@/lib/experience-map";
import { projectsToCinematic } from "@/lib/projects";
import {
  SECTION_ORDER,
  SECTION_TO_STATE,
  STATE_TO_SECTION,
  scrollProgressForState,
  type SectionId,
} from "@/lib/particle-nav";
import { PROJECTS as FALLBACK_PROJECTS } from "../../data/portfolioData";

const TailCursor = dynamic(
  () => import("../reactbits/TailCursor"),
  { ssr: false },
);

function PortfolioExperienceInner({
  theme,
  experiences,
  totalTenureLabel,
  skillCategories,
  skillsSection,
  aboutSection,
  aboutStats,
  philosophyPillars,
  education,
  certifications,
  profile,
  social,
  systemStatus,
  projects: portfolioProjects,
}: {
  theme: Theme;
  experiences: Experience[];
  totalTenureLabel?: string;
  skillCategories: SkillCategory[];
  skillsSection?: SkillsSectionMeta;
  aboutSection?: AboutSectionMeta;
  aboutStats?: AboutStatCard[];
  philosophyPillars?: PhilosophyPillar[];
  education?: Education[];
  certifications?: Certification[];
  profile?: Profile;
  social?: SocialLinks;
  systemStatus?: SystemStatus;
  projects?: PortfolioProject[];
}) {
  const themeVars = themeToCinematicCssVars(theme);
  const cinematicExperiences = experiencesToCinematicItems(experiences);
  const cinematicProjects =
    portfolioProjects && portfolioProjects.length > 0
      ? projectsToCinematic(portfolioProjects)
      : FALLBACK_PROJECTS;
  const canvasRef = useRef<ParticleCanvasHandle | null>(null);
  const reducedMotion = useReducedMotion();
  const scrollToSection = useSmoothScrollTo();
  useLenisHtmlClass();

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeParticleState, setActiveParticleState] = useState<ParticleStateId>(0);
  const [fps, setFps] = useState<number>(60);
  const [particleCount, setParticleCount] = useState<number>(20000);
  const [qualityTier, setQualityTier] = useState<string>('desktop-high');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPreloader, setShowPreloader] = useState(!reducedMotion);
  const [entered, setEntered] = useState(reducedMotion);
  const [scanActive, setScanActive] = useState(false);
  /** While HUD morph navigation is in flight, ignore scroll→particle overwrite */
  const particleNavLockRef = useRef(false);
  const particleNavUnlockTimer = useRef<number | null>(null);
  const lastSyncedSectionRef = useRef<SectionId | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setShowPreloader(false);
      setEntered(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = [...SECTION_ORDER];
          let current: SectionId = "hero";
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45) {
                current = sections[i];
                break;
              }
            }
          }
          setActiveSection(current);

          if (canvasRef.current && !particleNavLockRef.current) {
            const stateForSection = SECTION_TO_STATE[current];
            // Snap morph when section changes so Contact → Calm (05) is immediate
            if (lastSyncedSectionRef.current !== current) {
              lastSyncedSectionRef.current = current;
              canvasRef.current.forceState(stateForSection);
              setActiveParticleState(stateForSection);
            } else {
              canvasRef.current.setScrollProgress(
                scrollProgressForState(stateForSection),
              );
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStateSelect = (stateId: ParticleStateId) => {
    const targetSection = STATE_TO_SECTION[stateId];

    particleNavLockRef.current = true;
    if (particleNavUnlockTimer.current) {
      window.clearTimeout(particleNavUnlockTimer.current);
    }
    particleNavUnlockTimer.current = window.setTimeout(() => {
      particleNavLockRef.current = false;
      particleNavUnlockTimer.current = null;
    }, 1800);

    if (canvasRef.current) {
      canvasRef.current.forceState(stateId);
    }
    setActiveParticleState(stateId);
    setActiveSection(targetSection);
    lastSyncedSectionRef.current = targetSection;

    // Defer one frame so Lenis can resume after HUD wheel-lock
    window.requestAnimationFrame(() => {
      scrollToSection(targetSection);
    });
  };

  const handleTriggerShockwave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Slow readable sequence — ~2.2s between each wave
    canvas.triggerShockwave(0, 0, 0);

    window.setTimeout(() => {
      canvas.triggerNetworkPulse();
    }, 700);

    window.setTimeout(() => {
      canvas.triggerShockwave(1.0, 0.45, 0);
    }, 2200);

    window.setTimeout(() => {
      canvas.triggerShockwave(-0.85, -0.35, 0.1);
    }, 4400);

    window.setTimeout(() => {
      canvas.triggerShockwave(0.3, -0.7, -0.05);
      canvas.triggerNetworkPulse();
    }, 6600);
  }, []);

  const handleTriggerNetworkPulse = () => {
    if (canvasRef.current) {
      canvasRef.current.triggerNetworkPulse();
      canvasRef.current.triggerShockwave(0, -0.4, 0);
    }
  };

  const handleInspectAirfield = () => {
    const airfieldProject =
      cinematicProjects.find(
        (p) =>
          p.id === "nasu-hmi" ||
          p.id === "airport-lighting-system" ||
          p.title.toLowerCase().includes("airport"),
      ) || cinematicProjects[0];
    setSelectedProject(airfieldProject);
  };

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setEntered(true);
    setScanActive(true);
    window.setTimeout(() => {
      canvasRef.current?.triggerShockwave(0, 0, 0);
    }, 280);
  }, []);

  return (
    <div
      className="cinematic-root relative min-h-screen text-[#F5F5F5] selection:bg-blue-500 selection:text-white"
      style={{
        ...themeVars,
        backgroundColor: theme.background,
        color: theme.ink,
      }}
    >
      {showPreloader && (
        <Preloader key="sys-preloader" onComplete={handlePreloaderComplete} />
      )}

      <PageScanner
        active={scanActive}
        durationMs={1100}
        onComplete={() => setScanActive(false)}
      />

      {!reducedMotion && entered && <TailCursor color={theme.primary} />}

      <div className="fixed inset-0 particle-field opacity-20 pointer-events-none z-0" />

      <ParticleCanvas
        ref={canvasRef}
        onFpsUpdate={setFps}
        onStateChange={setActiveParticleState}
        onQualityDetermined={(count, tier) => {
          setParticleCount(count);
          setQualityTier(tier);
        }}
      />

      <StickyPageBlur />

      {/* Outside motion surface — filter/clipPath would break position:fixed */}
      {entered && (
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
      )}

      {entered && (
        <ParticleControllerUI
          fps={fps}
          activeState={activeParticleState}
          particleCount={particleCount}
          qualityTier={qualityTier}
          onStateSelect={handleStateSelect}
          onShockwave={handleTriggerShockwave}
        />
      )}

      <motion.div
        key={entered ? "surface-live" : "surface-boot"}
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 28,
                clipPath: "inset(12% 0 0 0)",
                filter: "blur(8px)",
              }
        }
        animate={
          entered
            ? {
                opacity: 1,
                y: 0,
                clipPath: "inset(0% 0 0 0)",
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: 28,
                clipPath: "inset(12% 0 0 0)",
                filter: "blur(8px)",
              }
        }
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
      >
        <main className="relative z-10">
          <HeroAboutBridge>
            <HeroSection
              onExploreClick={() => scrollToSection('about')}
              onProjectsClick={() => scrollToSection('projects')}
              onTriggerShockwave={handleTriggerShockwave}
            />
            <ChapterReveal veil={false}>
              <AboutSection
                experiences={cinematicExperiences}
                totalTenureLabel={
                  totalTenureLabel
                    ? `${totalTenureLabel} TENURE`
                    : undefined
                }
                aboutSection={aboutSection}
                aboutStats={aboutStats}
                philosophyPillars={philosophyPillars}
                education={education}
                certifications={certifications}
              />
            </ChapterReveal>
          </HeroAboutBridge>

          <ContinuitySection>
            <SkillsSection
              categories={skillCategories}
              headline={skillsSection?.headline}
              headlineAccent={skillsSection?.headlineAccent}
              description={skillsSection?.description}
            />
          </ContinuitySection>

          <ContinuitySection>
            <RealtimeSection
              onTriggerPulse={handleTriggerNetworkPulse}
              onInspectSystem={handleInspectAirfield}
            />
          </ContinuitySection>

          <ContinuitySection>
            <ProjectsSection
              projects={cinematicProjects}
              onSelectProject={setSelectedProject}
            />
          </ContinuitySection>

          <ContinuitySection>
            <ContactSection
              onShockwave={handleTriggerShockwave}
              profile={profile}
              social={social}
              systemStatus={systemStatus}
            />
          </ContinuitySection>
        </main>

        <Footer
          onBackToTop={() => scrollToSection("hero")}
          resumeUrl={profile?.resumeUrl}
        />
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export const PortfolioExperience: React.FC<{
  theme: Theme;
  experiences: Experience[];
  skillCategories: SkillCategory[];
  skillsSection?: SkillsSectionMeta;
  totalTenureLabel?: string;
  aboutSection?: AboutSectionMeta;
  aboutStats?: AboutStatCard[];
  philosophyPillars?: PhilosophyPillar[];
  education?: Education[];
  certifications?: Certification[];
  profile?: Profile;
  social?: SocialLinks;
  systemStatus?: SystemStatus;
  projects?: PortfolioProject[];
}> = ({
  theme,
  experiences,
  skillCategories,
  skillsSection,
  totalTenureLabel,
  aboutSection,
  aboutStats,
  philosophyPillars,
  education,
  certifications,
  profile,
  social,
  systemStatus,
  projects,
}) => {
  return (
    <SmoothScroll>
      <PortfolioExperienceInner
        theme={theme}
        experiences={experiences}
        skillCategories={skillCategories}
        skillsSection={skillsSection}
        totalTenureLabel={totalTenureLabel}
        aboutSection={aboutSection}
        aboutStats={aboutStats}
        philosophyPillars={philosophyPillars}
        education={education}
        certifications={certifications}
        profile={profile}
        social={social}
        systemStatus={systemStatus}
        projects={projects}
      />
    </SmoothScroll>
  );
};
