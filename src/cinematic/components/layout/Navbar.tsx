"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, GitBranch as Github } from "lucide-react";
import { ShinyText } from "../reactbits/ShinyText";
import { StaggeredMenu } from "../reactbits/StaggeredMenu";
import { PERSONAL_INFO } from "../../data/portfolioData";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", num: "01", label: "Identity" },
  { id: "about", num: "02", label: "Vision" },
  { id: "skills", num: "03", label: "Matrix" },
  { id: "realtime", num: "04", label: "Systems" },
  { id: "projects", num: "05", label: "Projects" },
  { id: "contact", num: "06", label: "Contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastYRef = useRef(0);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const update = (y: number) => {
      const prev = lastYRef.current;
      const delta = y - prev;

      setIsScrolled(y > 24);

      // Always show near the top
      if (y < 80) {
        setNavHidden(false);
      } else if (delta > 6) {
        // scrolling down → hide
        setNavHidden(true);
      } else if (delta < -6) {
        // scrolling up → show
        setNavHidden(false);
      }

      lastYRef.current = y;
    };

    update(typeof window !== "undefined" ? window.scrollY : 0);

    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => update(scroll);
      lenis.on("scroll", onLenisScroll);
      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    }

    const onWindowScroll = () => update(window.scrollY);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [lenis]);

  const menuItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        label: item.label,
        ariaLabel: `Go to ${item.label}`,
        onSelect: () => onNavigate(item.id),
      })),
    [onNavigate],
  );

  const socialItems = useMemo(
    () => [
      { label: "GitHub", link: PERSONAL_INFO.github },
      { label: "Portfolio", link: PERSONAL_INFO.portfolioUrl },
      { label: "Email", link: `mailto:${PERSONAL_INFO.email}` },
    ],
    [],
  );

  const mobileMenuClass = [
    isScrolled ? "sm-scrolled" : "",
    navHidden ? "sm-nav-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Progress stays visible even when nav hides */}
      <motion.div
        style={{ scaleX }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2.5px] origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      />

      {/* Desktop sticky nav — hide on scroll down, show on scroll up */}
      <motion.header
        initial={false}
        animate={{ y: navHidden ? "-120%" : "0%" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[110] hidden px-3 py-3 sm:px-6 lg:block lg:px-10"
      >
        <div
          className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-xl border px-5 py-2.5 transition-all duration-300 ${
            isScrolled
              ? "border-white/10 bg-[#060606]/92 shadow-2xl shadow-black/80 backdrop-blur-2xl"
              : "border-white/5 bg-[#080808]/55 backdrop-blur-md"
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className="group flex cursor-pointer items-center gap-3 text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/60 shadow-inner transition-colors group-hover:border-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-transform group-hover:scale-125" />
            </div>
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-colors group-hover:text-cyan-400">
                <span>IRSHAD KHAN</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-wider text-white/40 sm:block">
                <ShinyText text="FRONT-END & SYSTEMS" speed={4} />
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.03] p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative cursor-pointer rounded-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-md border border-white/15 bg-white/10 shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[9px] ${isActive ? "text-cyan-400" : "text-white/30"}`}
                    >
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 transition-all hover:border-white/30 hover:text-white"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="group relative flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-white to-gray-200 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-lg transition-all hover:shadow-cyan-500/20"
            >
              <span className="relative z-10 flex items-center gap-1 transition-colors group-hover:text-white">
                <span>Hire Me</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
              <div className="absolute inset-0 translate-y-full bg-cyan-600 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile StaggeredMenu — same hide/show behavior */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          logoLabel="IRSHAD KHAN"
          logoSubLabel="FRONT-END"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#22d3ee"
          changeMenuColorOnOpen
          colors={["#083344", "#22d3ee"]}
          accentColor="#22d3ee"
          closeOnClickAway
          onLogoClick={() => onNavigate("hero")}
          className={mobileMenuClass || undefined}
        />
      </div>
    </>
  );
};
