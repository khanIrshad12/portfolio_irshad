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
import { PROJECTS } from '../../data/portfolioData';
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

const TailCursor = dynamic(
  () => import("../reactbits/TailCursor"),
  { ssr: false },
);

function PortfolioExperienceInner() {
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
          const scrollY = window.scrollY;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

          if (canvasRef.current) {
            canvasRef.current.setScrollProgress(progress);
          }

          const sections = ['hero', 'about', 'skills', 'realtime', 'projects', 'contact'];
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateSelect = (stateId: ParticleStateId) => {
    if (canvasRef.current) {
      canvasRef.current.forceState(stateId);
    }
    setActiveParticleState(stateId);

    const stateSectionMap: Record<ParticleStateId, string> = {
      0: 'hero',
      1: 'about',
      2: 'realtime',
      3: 'projects',
      4: 'contact',
      5: 'contact'
    };
    const targetSection = stateSectionMap[stateId];
    if (targetSection) {
      scrollToSection(targetSection);
    }
  };

  const handleTriggerShockwave = useCallback(() => {
    canvasRef.current?.triggerShockwave();
  }, []);

  const handleTriggerNetworkPulse = () => {
    if (canvasRef.current) {
      canvasRef.current.triggerNetworkPulse();
      canvasRef.current.triggerShockwave(0, -0.4, 0);
    }
  };

  const handleInspectAirfield = () => {
    const airfieldProject = PROJECTS.find(p => p.id === 'airport-lighting-system') || PROJECTS[0];
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
    <div className="cinematic-root relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-blue-500 selection:text-white">
      {showPreloader && (
        <Preloader key="sys-preloader" onComplete={handlePreloaderComplete} />
      )}

      <PageScanner
        active={scanActive}
        durationMs={1100}
        onComplete={() => setScanActive(false)}
      />

      {!reducedMotion && entered && <TailCursor color="#38bdf8" />}

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
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <main className="relative z-10">
          <HeroAboutBridge>
            <HeroSection
              onExploreClick={() => scrollToSection('about')}
              onProjectsClick={() => scrollToSection('projects')}
              onTriggerShockwave={handleTriggerShockwave}
            />
            <ChapterReveal veil={false}>
              <AboutSection />
            </ChapterReveal>
          </HeroAboutBridge>

          <ContinuitySection>
            <SkillsSection />
          </ContinuitySection>

          <ContinuitySection>
            <RealtimeSection
              onTriggerPulse={handleTriggerNetworkPulse}
              onInspectSystem={handleInspectAirfield}
            />
          </ContinuitySection>

          <ContinuitySection>
            <ProjectsSection
              onSelectProject={setSelectedProject}
            />
          </ContinuitySection>

          <ContinuitySection>
            <ContactSection
              onShockwave={handleTriggerShockwave}
            />
          </ContinuitySection>
        </main>

        <Footer
          onBackToTop={() => scrollToSection('hero')}
        />

        <ParticleControllerUI
          fps={fps}
          activeState={activeParticleState}
          particleCount={particleCount}
          qualityTier={qualityTier}
          onStateSelect={handleStateSelect}
          onShockwave={handleTriggerShockwave}
        />
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export const PortfolioExperience: React.FC = () => {
  return (
    <SmoothScroll>
      <PortfolioExperienceInner />
    </SmoothScroll>
  );
};
