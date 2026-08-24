export interface StoryChapter {
  id: string;
  chapterNumber: string;
  year: string;
  title: string;
  subtitle: string;
  quote: string;
  narrative: string[];
  metrics: { label: string; value: string }[];
  skills: string[];
  icon: string;
  highlightAction?: {
    label: string;
    actionType: "shockwave" | "telemetry" | "project" | "navigate";
    target?: string;
  };
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "foundation",
    chapterNumber: "01",
    year: "2018 — 2022",
    title: "The Algorithmic Foundation",
    subtitle: "Computer Engineering @ Mumbai University",
    quote:
      '"Great engineering begins where algorithmic rigor meets creative curiosity."',
    narrative: [
      "Irshad Khan began his journey earning a Bachelor of Engineering in Computer Engineering from Mumbai University, graduating with First Class Honors.",
      "Immersing deeply in data structures, computer networks, operating system concurrency, and compiler theory, he laid the architectural bedrock that distinguishes real software engineers from surface-level coders.",
      "Early explorations spanned low-level C++, JavaScript engines, and relational database normalization, sparking a relentless passion for building high-performance, resilient user interfaces.",
    ],
    metrics: [
      { label: "Degree", value: "B.E. Computer Engineering" },
      { label: "Institution", value: "Mumbai University" },
      { label: "Core Focus", value: "Data Structures & Concurrency" },
    ],
    skills: [
      "C++",
      "JavaScript / ES6+",
      "Data Structures",
      "Database Engineering",
      "Algorithm Design",
    ],
    icon: "GraduationCap",
    highlightAction: {
      label: "Explore Matrix Skills",
      actionType: "navigate",
      target: "skills",
    },
  },
  {
    id: "airfield-scada",
    chapterNumber: "02",
    year: "2023 — Present",
    title: "The Crucible: Mission-Critical SCADA",
    subtitle: "Industrial Airfield Lighting (ALCMS) & Modbus TCP",
    quote:
      '"When an aircraft approaches at 160 knots in dense fog, latency is not a metric — it is a life-or-death constraint."',
    narrative: [
      "Stepping into the industrial engineering arena at Youkta Solutions & Kenmark ITanSolutions, Irshad engineered real-time Airfield Ground Lighting Control & Monitoring Systems (ALCMS).",
      "He designed high-throughput WebSocket communication layers, parsed raw Modbus TCP binary registers from airfield PLCs and Constant Current Regulators (CCRs), and created interactive HTML5 canvas airfields rendering multi-thousand fixtures in real-time.",
      "He engineered dual-server automatic failover and fault detection mechanisms, maintaining uninterrupted 24/7 operational reliability across runway, taxiway, PAPI, and approach circuits.",
    ],
    metrics: [
      { label: "Protocol", value: "Modbus TCP & Socket.IO" },
      { label: "Refresh Rate", value: "60 FPS Batched Streams" },
      { label: "System Uptime", value: "24/7 Mission-Critical" },
    ],
    skills: [
      "Modbus TCP",
      "Socket.IO",
      "Industrial SCADA",
      "HTML5 Canvas",
      "Fault Telemetry",
      "Failover Systems",
    ],
    icon: "Radio",
    highlightAction: {
      label: "Simulate Telemetry Pulse",
      actionType: "telemetry",
    },
  },
  {
    id: "creative-webgl",
    chapterNumber: "03",
    year: "2024 — Present",
    title: "The Creative Dimension: 3D & WebGL",
    subtitle: "Merging Industrial Precision with Immersive GPU Canvas",
    quote:
      '"Code is the canvas of the modern era; mathematical algorithms create breathtaking digital art."',
    narrative: [
      "Refusing to settle for standard flat interfaces, Irshad expanded his domain into custom 3D WebGL rendering, GPU compute shaders, and spatial interactive particles.",
      "By blending Three.js particle simulations, organic Curl noise vectors, and reactive state engines, he created immersive spatial experiences that respond dynamically to user scrolling, cursor velocity, and audio signals.",
      "The result is a distinct engineering signature: interfaces that feel alive, responsive, and tactile without sacrificing sub-millisecond execution speeds.",
    ],
    metrics: [
      { label: "Particle Count", value: "20,000 GPU Nodes" },
      { label: "Rendering Engine", value: "Three.js / WebGL2" },
      { label: "Interactive States", value: "6 Dynamic Formations" },
    ],
    skills: [
      "Three.js",
      "WebGL Shaders",
      "Particle Mathematics",
      "Motion / React",
      "Spatial Interaction",
    ],
    icon: "Sparkles",
    highlightAction: {
      label: "Trigger 3D Shockwave",
      actionType: "shockwave",
    },
  },
  {
    id: "high-scale",
    chapterNumber: "04",
    year: "2025 & Beyond",
    title: "Next-Gen Full-Stack Ecosystems",
    subtitle: "High-Concurrency Platforms & Modern Web Frameworks",
    quote:
      '"Building systems that scale seamlessly from a single terminal to global enterprise distribution."',
    narrative: [
      "Today, Irshad architectures high-concurrency booking engines, responsive micro-frontend portals, and modern web applications leveraging React 19, Next.js 15 App Router, TypeScript, and Tailwind CSS.",
      "With over 2 years and 9 months of specialized engineering experience across industrial telemetry and modern web stacks, he delivers resilient, scalable, and visually captivating solutions for world-class product teams.",
      "He is actively open to high-impact software engineering roles, contract architectural consulting, and collaborative frontier projects.",
    ],
    metrics: [
      { label: "Total Experience", value: "2 Yrs 9 Mos" },
      { label: "Frameworks", value: "React 19 & Next.js 15" },
      { label: "Status", value: "Open for Opportunities" },
    ],
    skills: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Prisma ORM",
      "Tailwind CSS",
      "Micro-Frontends",
    ],
    icon: "Cpu",
    highlightAction: {
      label: "Inspect Featured Projects",
      actionType: "project",
      target: "airport-lighting-system",
    },
  },
];
