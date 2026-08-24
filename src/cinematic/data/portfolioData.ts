import { Project, SkillCategory, ExperienceItem, EducationItem, CertificateItem, ParticleStateConfig, SystemStatus } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Irshad Alam Abdul Shakur Khan',
  shortName: 'Irshad Khan',
  headline: 'Front-End & Creative Full-Stack Developer',
  location: 'Mumbai, Maharashtra, India',
  email: 'irshadkhance@gmail.com',
  secondaryEmail: 'khanirshad14312345@gmail.com',
  phone: '+91 7715043438',
  github: 'https://github.com/khanIrshad12',
  portfolioUrl: 'https://portfolioirshad.vercel.app/',
  totalExperience: '2 Years 9 Months',
  summary: 'Web developer enthusiast exploring modern web frameworks and UI development stacks. Specializing in high-performance React/Next.js interfaces, real-time industrial telemetry dashboards, 3D WebGL/Canvas graphics, and resilient full-stack architectures.'
};

export const PARTICLE_STATES: ParticleStateConfig[] = [
  {
    id: 0,
    name: 'Cosmic Field',
    subtitle: 'Organic Exploration & Identity',
    themeColor: '#38bdf8', // Cyan
    cameraZ: 6.5,
    cameraY: 0.2,
    rotationSpeed: 0.12,
    particleSize: 2.8,
    description: 'Drifting organic stardust field with procedural curl turbulence and orbital breathing.'
  },
  {
    id: 1,
    name: 'Digital Wave Grid',
    subtitle: 'Frontend Engineering & UI Systems',
    themeColor: '#818cf8', // Indigo
    cameraZ: 5.5,
    cameraY: 0.5,
    rotationSpeed: 0.08,
    particleSize: 2.5,
    description: 'Structured planar wave grid and UI matrix symbolizing dynamic interface components.'
  },
  {
    id: 2,
    name: 'Real-Time Network',
    subtitle: 'Airport Runway Lighting & Modbus Telemetry',
    themeColor: '#22d3ee', // Bright Cyan / Electric Blue
    cameraZ: 6.0,
    cameraY: 0.4,
    rotationSpeed: 0.15,
    particleSize: 3.2,
    description: 'High-frequency telemetry nodes, runway approach vectors, and pulse signaling pathways.'
  },
  {
    id: 3,
    name: 'Project Constellation',
    subtitle: 'Production Applications & Systems',
    themeColor: '#f59e0b', // Amber / Gold
    cameraZ: 7.0,
    cameraY: 0.0,
    rotationSpeed: 0.1,
    particleSize: 2.6,
    description: 'Discrete gravitationally bonded star clusters representing major engineering milestones.'
  },
  {
    id: 4,
    name: 'Neural Attractor',
    subtitle: 'AI, 3D Shaders & Future Technologies',
    themeColor: '#a855f7', // Violet
    cameraZ: 6.2,
    cameraY: 0.3,
    rotationSpeed: 0.2,
    particleSize: 2.9,
    description: 'Clifford-Lorenz strange attractor with fluid energy loops and emergent geometric complexity.'
  },
  {
    id: 5,
    name: 'Calm Horizon',
    subtitle: 'Expansion, Connection & Contact',
    themeColor: '#ec4899', // Rose / Silver
    cameraZ: 7.5,
    cameraY: 0.1,
    rotationSpeed: 0.06,
    particleSize: 2.2,
    description: 'Harmonic dispersion into an infinite calm starlight ring.'
  }
];

export const SYSTEM_STATUS: SystemStatus = {
  isAvailable: true,
  statusText: 'Open to Hire — Roles & Freelance',
  location: 'Mumbai, India · Remote-friendly worldwide',
  currentFocus: 'React / Next.js, Real-Time Systems & Creative WebGL',
  activeClientSlots: '2y 9m experience · Available now'
};

export const PROJECTS: Project[] = [
  {
    id: 'airport-lighting-system',
    number: '01',
    title: 'Airport Lighting Control System Dashboard',
    category: 'Industrial Control & Real-Time Telemetry',
    tagline: 'Real-time industrial control dashboard for airport runway and taxiway lighting systems using React.js, Socket.IO, and Modbus TCP.',
    overview: 'Developed a mission-critical real-time industrial control dashboard for airport runway, taxiway, PAPI, and approach lighting systems at Kenmark ITanSolutions. Built interactive airport layout visualization with zoom/pan capabilities, real-time status indicators, drag-and-drop device management, and high-frequency WebSocket/Modbus TCP data synchronization.',
    architecture: [
      'Industrial Modbus TCP communication protocols interfacing directly with PLC airfield controllers and CCRs',
      'Optimized WebSocket streaming pipeline with 60 FPS batching and connection health heartbeat monitoring',
      'Interactive HTML5 Canvas / Radix UI map rendering multi-thousand fixture states, zoom/pan vectors, and circuit health',
      'Multi-server domain management architecture with automatic failover to maintain 24/7 operational availability'
    ],
    keyContributions: [
      'Built interactive airport layout visualization with zoom/pan capabilities, real-time status indicators, and drag-and-drop device management',
      'Integrated WebSocket communication for live data streaming with optimized batching (60fps) and connection health monitoring',
      'Created responsive UI components using Canvas, Tailwind CSS, and Radix UI with real-time fault monitoring and remote control',
      'Engineered automatic failover and domain health check mechanics ensuring 24/7 uptime for critical airfield operations'
    ],
    techStack: [
      'React.js',
      'Socket.IO',
      'Modbus TCP',
      'HTML5 Canvas',
      'Tailwind CSS',
      'Radix UI',
      'Node.js',
      'TypeScript'
    ],
    metrics: [
      { label: 'Streaming Cadence', value: '60 FPS' },
      { label: 'Uptime Reliability', value: '24/7 SLA' },
      { label: 'Hardware Protocols', value: 'Modbus TCP' },
      { label: 'Airfield Assets', value: 'Runway / Taxiway / PAPI' }
    ],
    accentColor: '#06b6d4',
    constellationClusterIndex: 0,
    isFeatured: true
  },
  {
    id: 'smaaash-booking-engine',
    number: '02',
    title: 'Smaaash Bookings Engine & Dynamic Storefront',
    category: 'E-Commerce & High-Concurrency Booking',
    tagline: 'Multi-category gaming reservation platform with real-time slot availability, bundles, JWT auth, and state flow.',
    overview: 'Designed and developed a comprehensive gaming booking engine for Smaaash gaming arenas. Handled multi-activity time slot reservations (Bowling, Cricket, Go-Karting), location-specific center selection, custom package bundles with complex validation logic, and secure JWT checkout pipelines.',
    architecture: [
      'Next.js & React.js dynamic routing managing diverse gaming categories with live API availability feeds',
      'React Context API & TanStack data fetching architecture avoiding prop drilling and synchronizing global cart states',
      'Secure JWT authentication handling user credentials, order signing, and protected reservation records',
      'Frictionless popup modals for login verification, bundle configuration, and multi-item checkout'
    ],
    keyContributions: [
      'Designed and developed multiple pages: gaming time slots, checkout, cart, and center-specific offers using React.js and Tailwind CSS',
      'Implemented dynamic routing across Bowling, Cricket, and Go-Karting with real-time slot selection and pricing',
      'Built complex validation logic for multi-tier offers (e.g. family bundles, beverage promotions, center-specific limits)',
      'Integrated front-end to back-end REST microservices for rapid data fetching of user sessions and dynamic inventory'
    ],
    techStack: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'Shadcn UI',
      'TanStack',
      'Context API',
      'JWT Auth',
      'REST APIs'
    ],
    metrics: [
      { label: 'Gaming Categories', value: 'Multi-Track' },
      { label: 'Cart Checkout UX', value: 'Seamless Modal' },
      { label: 'Validation Engine', value: 'Real-Time Slots' },
      { label: 'State Efficiency', value: 'Zero Prop Drill' }
    ],
    accentColor: '#f59e0b',
    constellationClusterIndex: 1,
    isFeatured: true
  },
  {
    id: 'corporate-media-platform',
    number: '03',
    title: 'Corporate & Media Enterprise Platform',
    category: 'Next.js 15 App Router & Enterprise Architecture',
    tagline: 'Full-stack enterprise media platform using Next.js 15, React 19, MySQL, Prisma, and multi-tier RBAC.',
    overview: 'Engineered an enterprise-grade corporate and media platform built on Next.js 15 (App Router), React 19, MySQL, and Prisma. Features 95+ custom components, multi-tier Role-Based Access Control (SUPERADMIN, HR, CONTENT_MANAGER), dynamic SEO tooling (~90/100 score), and automated Sharp.js media processing.',
    architecture: [
      'Next.js 15 App Router & React 19 with 95+ modular components built using Radix UI / Shadcn and Tailwind CSS v4',
      'Granular Role-Based Access Control (RBAC) securing administrative endpoints with JWT in HTTP-only cookies and bcrypt',
      'Enterprise SEO architecture with dynamic sitemap.xml, robots.txt, canonical URLs, and JSON-LD structured data',
      'Sharp.js WebP conversion pipeline with BLOB storage, display-location filtering, and TanStack Query caching'
    ],
    keyContributions: [
      'Built 95+ reusable, accessible UI components with Radix UI, Shadcn, Tailwind CSS v4, and Zustand state store',
      'Implemented RBAC security for admin dashboard supporting SUPERADMIN, HR, and CONTENT_MANAGER privileges',
      'Boosted technical and on-page SEO to ~90/100 through structured schema markup, canonical links, and dynamic sitemaps',
      'Engineered automated media optimization converting assets to WebP via Sharp.js before cloud BLOB distribution'
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'MySQL',
      'Prisma ORM',
      'Zustand',
      'TanStack Query',
      'Tailwind CSS v4',
      'Sharp.js'
    ],
    metrics: [
      { label: 'UI Components', value: '95+ Built' },
      { label: 'Technical SEO', value: '~90 / 100' },
      { label: 'RBAC Security', value: '4 Privilege Roles' },
      { label: 'Media Compression', value: 'Sharp.js WebP' }
    ],
    accentColor: '#3b82f6',
    constellationClusterIndex: 2,
    isFeatured: true
  },
  {
    id: 'creative-webgl-canvas',
    number: '04',
    title: '3D WebGL Particle & Spatial Canvas Lab',
    category: 'Creative Development & 3D Graphics',
    tagline: 'Procedural GPU particle fields, strange mathematical attractors, and 3D interactive animations.',
    overview: 'Creative engineering sandbox showcasing raw WebGL shaders, Three.js BufferGeometry computations, Clifford strange attractors, and interactive audio-reactive physics. Built to push the boundaries of 60 FPS spatial web experiences.',
    architecture: [
      'High-density Three.js GPU particle system rendering 25,000+ vertices at locked 60 FPS',
      'Mathematical attractor algorithms (Lorenz, Clifford, Rossler) running procedurally in real-time',
      'Custom vector field interactions responsive to scroll velocity, device orientation, and cursor physics'
    ],
    keyContributions: [
      'Crafted fluid morphing algorithms across 6 distinct geometry dimensions without frame drops',
      'Designed adaptive quality tiers auto-scaling particle densities based on device GPU benchmarks',
      'Created custom camera interpolation and shockwave dispersion shaders'
    ],
    techStack: [
      'Three.js',
      'WebGL',
      'GLSL Shaders',
      'TypeScript',
      'Framer Motion',
      'HTML5 Canvas'
    ],
    metrics: [
      { label: 'Active Particles', value: '25,000+' },
      { label: 'Render Target', value: '60 FPS' },
      { label: 'Morph Dimensions', value: '6 States' },
      { label: 'Compute Engine', value: 'WebGL / GPU' }
    ],
    accentColor: '#a855f7',
    constellationClusterIndex: 3,
    isFeatured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend-core',
    title: 'Frontend & UI Frameworks',
    shortTitle: 'Frontend',
    subtitle: 'High-Performance Web Applications, Dynamic State & Responsive Design',
    iconName: 'Layout',
    skills: [
      { name: 'React.js & Next.js (App Router)', category: 'Framework', proficiency: 96, highlight: 'Next.js 15, React 19, Server Components, SSR/SSG' },
      { name: 'TypeScript & JavaScript (ESNext)', category: 'Language', proficiency: 95, highlight: 'Strict typing, modern asynchronous patterns, clean architecture' },
      { name: 'Tailwind CSS & Shadcn UI', category: 'Styling', proficiency: 98, highlight: 'Tailwind v4, Radix UI primitives, Material UI, Bootstrap' },
      { name: 'State Management (Zustand / TanStack / Context)', category: 'State', proficiency: 94, highlight: 'TanStack Query caching, Zustand stores, Context API' },
      { name: 'HTML5 Canvas & 3D Animation', category: 'Creative', proficiency: 90, highlight: 'Canvas 2D, Three.js, WebGL, Framer Motion, 3D modeling' },
      { name: 'jQuery & Legacy Migration', category: 'Frontend', proficiency: 90, highlight: 'DOM optimization, responsive refactoring' }
    ]
  },
  {
    id: 'backend-protocols',
    title: 'Backend & Communication Protocols',
    shortTitle: 'Backend',
    subtitle: 'Real-Time Telemetry, Microservices & Hardware Integration',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express.js', category: 'Backend', proficiency: 92, highlight: 'REST APIs, middleware, connection pooling, high throughput' },
      { name: 'Socket.IO & WebSockets', category: 'Network', proficiency: 95, highlight: 'Sub-50ms live streaming, 60fps packet batching, health checks' },
      { name: 'Modbus TCP Protocol', category: 'Industrial', proficiency: 91, highlight: 'Airport lighting registers, CCR control, PLC telemetry polling' },
      { name: 'Auth.js & JWT Authentication', category: 'Security', proficiency: 90, highlight: 'HTTP-only cookies, bcrypt, Role-Based Access Control (RBAC)' },
      { name: 'Selenium & Test Automation', category: 'Testing', proficiency: 85, highlight: 'Automated browser validation, end-to-end UI verification' }
    ]
  },
  {
    id: 'database-orm',
    title: 'Databases, ORM & Languages',
    shortTitle: 'Data & Lang',
    subtitle: 'Relational Schemas, Document Stores & Multi-Language Core',
    iconName: 'Database',
    skills: [
      { name: 'MySQL & Prisma ORM', category: 'Database', proficiency: 92, highlight: 'Schema migrations, indexed queries, relational data models' },
      { name: 'MongoDB', category: 'NoSQL', proficiency: 88, highlight: 'Document collections, aggregation pipelines, dynamic schemas' },
      { name: 'Java (Core Java)', category: 'Language', proficiency: 85, highlight: 'Object-oriented programming, data structures, concurrency' },
      { name: 'Python', category: 'Language', proficiency: 84, highlight: 'Scripting, algorithmic logic, backend utilities' },
      { name: 'Sharp.js & Media Optimization', category: 'Media', proficiency: 88, highlight: 'Automated WebP conversion, BLOB storage pipelines' }
    ]
  },
  {
    id: 'additional-strengths',
    title: 'Creative, Analytical & 3D Skills',
    shortTitle: 'Creative',
    subtitle: 'Design Craft, Problem Solving & Visual Computation',
    iconName: 'Sparkles',
    skills: [
      { name: '3D Modeling, Texturing & Lighting', category: '3D Graphics', proficiency: 90, highlight: 'Spatial scene design, materials, procedural lighting, 3D animation' },
      { name: 'Enterprise SEO & JSON-LD', category: 'Optimization', proficiency: 92, highlight: 'Structured data, dynamic sitemaps, robots.txt, ~90/100 score' },
      { name: 'Problem-Solving & Engineering Precision', category: 'Core', proficiency: 96, highlight: 'Analytical troubleshooting, high-availability failover logic' },
      { name: 'Strong Communication & Teamwork', category: 'Collaboration', proficiency: 95, highlight: 'Cross-functional alignment, client presentation, clear documentation' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-kenmark',
    period: '2022 — Present (2 Years 9 Months)',
    role: 'Front-End Developer',
    company: 'Kenmark ITanSolutions',
    location: 'Mumbai, India',
    type: 'Full-Time',
    summary: 'Lead front-end engineering for mission-critical industrial control dashboards, high-volume consumer booking engines, and scalable corporate enterprise portals.',
    highlights: [
      'Developed real-time industrial control dashboard for airport runway and taxiway lighting systems using React.js, Socket.IO, and Modbus TCP communication protocols',
      'Built interactive airport layout visualization with zoom/pan capabilities, real-time status indicators, and drag-and-drop device management for runway, taxiway, PAPI, and approach lighting',
      'Created responsive UI components using HTML5 Canvas, Tailwind CSS, and Radix UI with real-time data visualization, fault monitoring, and remote control capabilities',
      'Integrated WebSocket communication for live data streaming with optimized batching mechanisms (60fps) and connection health monitoring for continuous operation',
      'Engineered domain management system with automatic failover, health checks, and multi-server architecture to maintain 24/7 operational availability for airport operations',
      'Architected Smaaash Bookings Engine handling dynamic multi-category time slots, checkout modals, bundled promotions, and JWT authentication',
      'Delivered full-stack corporate/media platform with Next.js 15 App Router, React 19, MySQL, Prisma, 95+ custom components, and RBAC permissions'
    ],
    techStack: [
      'React.js',
      'Next.js 15',
      'TypeScript',
      'Modbus TCP',
      'Socket.IO',
      'HTML5 Canvas',
      'Tailwind CSS',
      'Radix UI',
      'Prisma',
      'MySQL',
      'Zustand',
      'TanStack'
    ],
    badge: '2y 9m Experience'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelors of Computer Engineering',
    institution: 'University of Mumbai',
    location: 'Maharashtra, India',
    period: '2020 — 2023',
    details: 'Graduated with strong foundations in Computer Engineering, Algorithms, Distributed Systems, Database Management, and Software Architecture.'
  },
  {
    degree: 'Diploma of Information Technology',
    institution: 'Maharashtra State Board of Technical Education (MSBTE)',
    location: 'Maharashtra, India',
    period: '2018 — 2020',
    details: 'Comprehensive technical coursework in Web Technologies, Core Java, Networking, System Programming, and Information Systems.'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: 'Front End Development Libraries (React.js)',
    issuer: 'freeCodeCamp',
    year: '2023',
    url: 'https://www.freecodecamp.org'
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp.com',
    year: '2022',
    url: 'https://www.freecodecamp.org'
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    number: '01',
    title: 'Real-Time Reliability & Industrial Speed',
    description: 'Whether controlling airport airfield fixtures over Modbus TCP or synchronizing high-concurrency booking engines, sub-second latency and 24/7 failover stability are paramount.'
  },
  {
    number: '02',
    title: 'Component Architecture & Accessible UX',
    description: 'Building 95+ modular, accessible components with Radix UI, Shadcn, and Tailwind CSS creates design systems that scale effortlessly without visual or technical debt.'
  },
  {
    number: '03',
    title: 'Creative WebGL & 3D Mathematics',
    description: 'Fusing 3D modeling, texturing, lighting, and GPU shaders with clean React code enables immersive spatial storytelling while maintaining 60 FPS performance.'
  }
];
