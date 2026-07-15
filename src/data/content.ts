/**
 * Central place for portfolio copy and links.
 * Edit this file to personalize the site without digging through components.
 */

export const site = {
  name: "Zuha Waseem",
  title: "Web Developer / Designer",
  tagline:
    "I craft clean, thoughtful interfaces and bring ideas to life on the web.",
  email: "zuha.waseem@example.com",
  location: "Pakistan",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://x.com/",
  },
};

export const about = {
  paragraphs: [
    "I'm a Computer Science student who fell in love with the point where design meets code. Building for the web lets me solve problems visually and technically at the same time — and that's where I feel most at home.",
    "My current focus is modern frontend development with React and Next.js, paired with solid fundamentals in TypeScript, accessibility, and clean UI systems. I care about interfaces that feel calm, readable, and intentional.",
    "Outside of coursework, I'm constantly shipping small projects, refining my craft, and learning how great products balance beauty with usability.",
  ],
};

export const skillGroups = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "HTML", "CSS", "Python", "SQL"],
  },
  {
    category: "Frameworks",
    skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express"],
  },
  {
    category: "Tools & Concepts",
    skills: [
      "Git & GitHub",
      "REST APIs",
      "Responsive Design",
      "Figma",
      "Prisma",
      "Supabase",
    ],
  },
] as const;

export const projects = [
  {
    title: "Shop.co Storefront",
    description:
      "A responsive fashion e-commerce UI with product browsing, cart flows, and a polished shopping experience.",
    tech: ["React", "Tailwind CSS", "Vite"],
    liveUrl: "#",
    githubUrl: "https://github.com/",
  },
  {
    title: "TaskFlow Dashboard",
    description:
      "A personal productivity board with clear hierarchy, status filters, and a calm focus on daily priorities.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "#",
    githubUrl: "https://github.com/",
  },
  {
    title: "Campus Connect",
    description:
      "A student community concept for sharing events, notes, and resources with simple, accessible navigation.",
    tech: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/",
  },
  {
    title: "Portfolio Studio",
    description:
      "This site — a personal portfolio with a contact system, admin dashboard, and production-ready auth flow.",
    tech: ["Next.js", "Prisma", "Supabase"],
    liveUrl: "#",
    githubUrl: "https://github.com/",
  },
] as const;

export const timeline = [
  {
    type: "education" as const,
    title: "B.S. Computer Science",
    organization: "University",
    period: "2022 — Present",
    description:
      "Coursework in data structures, web development, databases, and software engineering. Building real projects alongside academic work.",
  },
  {
    type: "experience" as const,
    title: "Freelance Web Developer",
    organization: "Independent",
    period: "2024 — Present",
    description:
      "Designing and developing responsive websites for small clients — focusing on clear UX, performance, and maintainable code.",
  },
  {
    type: "experience" as const,
    title: "Frontend Practice Projects",
    organization: "Personal",
    period: "2023 — Present",
    description:
      "A growing collection of UI experiments and full-stack prototypes exploring React patterns, APIs, and design systems.",
  },
];
