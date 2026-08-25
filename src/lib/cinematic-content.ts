import type {
  PortfolioData,
  AboutSectionMeta,
  AboutStatCard,
  PhilosophyPillar,
  SystemStatus,
  Education,
  Certification,
} from "./types";

/** Live-site defaults from cinematic portfolioData.ts */
export const CINEMATIC_ABOUT_SECTION: AboutSectionMeta = {
  displayHeadline: "Engineering Precision & Creative Code",
  trueFocusSentence: "ENGINEERING PRECISION & CREATIVE CODE",
  summary:
    "Web developer enthusiast exploring modern web frameworks and UI development stacks. Specializing in high-performance React/Next.js interfaces, real-time industrial telemetry dashboards, 3D WebGL/Canvas graphics, and resilient full-stack architectures.",
};

export const CINEMATIC_ABOUT_STATS: AboutStatCard[] = [
  {
    id: "experience",
    label: "Total Experience",
    value: "2 Years 9 Months",
    sublabel: "Front-End Developer",
  },
  {
    id: "location",
    label: "Primary Location",
    value: "Mumbai",
    sublabel: "Maharashtra, India",
  },
  {
    id: "degree",
    label: "Degree",
    value: "B.E. Computer",
    sublabel: "University of Mumbai",
  },
  {
    id: "focus",
    label: "Domain Focus",
    value: "Real-Time UI",
    sublabel: "Modbus TCP & WebSockets",
  },
];

export const CINEMATIC_PILLARS: PhilosophyPillar[] = [
  {
    id: "pillar-1",
    number: "01",
    title: "Real-Time Reliability & Industrial Speed",
    description:
      "Whether controlling airport airfield fixtures over Modbus TCP or synchronizing high-concurrency booking engines, sub-second latency and 24/7 failover stability are paramount.",
  },
  {
    id: "pillar-2",
    number: "02",
    title: "Component Architecture & Accessible UX",
    description:
      "Building 95+ modular, accessible components with Radix UI, Shadcn, and Tailwind CSS creates design systems that scale effortlessly without visual or technical debt.",
  },
  {
    id: "pillar-3",
    number: "03",
    title: "Creative WebGL & 3D Mathematics",
    description:
      "Fusing 3D modeling, texturing, lighting, and GPU shaders with clean React code enables immersive spatial storytelling while maintaining 60 FPS performance.",
  },
];

export const CINEMATIC_SYSTEM_STATUS: SystemStatus = {
  isAvailable: true,
  statusText: "Open to Hire — Roles & Freelance",
  location: "Mumbai, India · Remote-friendly worldwide",
  currentFocus: "React / Next.js, Real-Time Systems & Creative WebGL",
  activeClientSlots: "2y 9m experience · Available now",
};

export const CINEMATIC_EDUCATION: Education[] = [
  {
    id: "edu-be",
    degree: "Bachelors of Computer Engineering",
    institution: "University of Mumbai",
    location: "Maharashtra, India",
    period: "2020 — 2023",
    details:
      "Graduated with strong foundations in Computer Engineering, Algorithms, Distributed Systems, Database Management, and Software Architecture.",
  },
  {
    id: "edu-diploma",
    degree: "Diploma of Information Technology",
    institution: "Maharashtra State Board of Technical Education (MSBTE)",
    location: "Maharashtra, India",
    period: "2018 — 2020",
    details:
      "Comprehensive technical coursework in Web Technologies, Core Java, Networking, System Programming, and Information Systems.",
  },
];

export const CINEMATIC_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-react",
    name: "Front End Development Libraries (React.js)",
    issuer: "freeCodeCamp",
    year: "2023",
  },
  {
    id: "cert-js",
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp.com",
    year: "2022",
  },
];

export function mergeCinematicContent(data: PortfolioData): PortfolioData {
  return {
    ...data,
    aboutSection: data.aboutSection ?? CINEMATIC_ABOUT_SECTION,
    aboutStats:
      data.aboutStats && data.aboutStats.length > 0
        ? data.aboutStats
        : CINEMATIC_ABOUT_STATS,
    philosophyPillars:
      data.philosophyPillars && data.philosophyPillars.length > 0
        ? data.philosophyPillars
        : CINEMATIC_PILLARS,
    systemStatus: data.systemStatus ?? CINEMATIC_SYSTEM_STATUS,
    education:
      data.education && data.education.length > 0
        ? data.education.map((e, i) => ({
            ...e,
            details:
              e.details ??
              CINEMATIC_EDUCATION.find((c) => c.id === e.id)?.details ??
              CINEMATIC_EDUCATION[i]?.details ??
              "",
          }))
        : CINEMATIC_EDUCATION,
    certifications:
      data.certifications && data.certifications.length > 0
        ? data.certifications
        : CINEMATIC_CERTIFICATIONS,
  };
}
