"use client";

import React from "react";
import { motion } from "motion/react";
import { PROJECTS } from "../../data/portfolioData";
import { Project } from "../../types";
import { ArrowUpRight, Layers } from "lucide-react";
import TiltedCard from "../reactbits/TiltedCard";
import { DecryptedText } from "../reactbits/DecryptedText";
import { ShinyText } from "../reactbits/ShinyText";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen overflow-hidden px-4 py-28 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              [ 05 · SELECTED ARCHITECTURE &amp; PRODUCTION PLATFORMS ]
            </span>
            <div className="h-px w-16 bg-white/20" />
          </motion.div>

          <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl">
            Engineering Milestones <br />
            <span className="text-white/50">&amp; Production Platforms.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/70 sm:text-lg"
          >
            Each system was engineered to solve complex operational challenges
            with precision, speed, and clean modular code architecture.
          </motion.p>
        </div>

        {/* No ParallaxLayer here — parent transforms flatten nested preserve-3d */}
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12">
          {PROJECTS.map((project) => (
            <TiltedCard
              key={project.id}
              captionText={project.title}
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={16}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip
              onClick={() => onSelectProject(project)}
              className="min-h-[30rem] sm:min-h-[32rem]"
            >
              <div className="tilted-project-surface min-h-[30rem] sm:min-h-[32rem]">
                <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                  <div className="tilted-pop tilted-pop--meta mb-5 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-cyan-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <DecryptedText
                        text={`SYSTEM // ${project.number}`}
                        speed={25}
                      />
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="tilted-pop tilted-pop--title mb-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                    {project.title}
                  </h3>

                  <p className="tilted-pop tilted-pop--body mb-8 font-mono text-xs leading-relaxed text-white/70 sm:text-sm">
                    {project.tagline}
                  </p>

                  <div className="mb-8 grid grid-cols-2 gap-3" style={{ transformStyle: "preserve-3d" }}>
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div
                        key={i}
                        className="tilted-pop tilted-pop--chip rounded-xl border border-white/10 bg-[#030303]/90 p-4"
                      >
                        <div className="font-mono text-lg font-black text-white sm:text-xl">
                          <ShinyText text={m.value} speed={3} />
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                  <div className="tilted-pop tilted-pop--stack mb-6 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="tilted-pop tilted-pop--cta flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-bold uppercase tracking-widest text-white/70">
                    <span className="flex items-center gap-2 text-cyan-400">
                      <Layers className="h-4 w-4" />
                      <span>Inspect Deep Specs</span>
                    </span>
                    <div className="tilted-pop-btn flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
      <SectionEdgeBlur />
    </section>
  );
};
