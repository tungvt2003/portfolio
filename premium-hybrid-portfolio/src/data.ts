import { Project, Experience, Education, SkillCategory } from "./types";

export const PORTFOLIO_DATA = {
  profile: {
    name: "Van Thien Tung",
    title: "Frontend Developer",
    email: "thientung57203@gmail.com",
    phone: "+1 (205) 255-6778",
    location: "Hanoi, Vietnam",
    bio: "Build scalable and user-friendly web apps with React and Next.js, with an unwavering focus on high performance, clean architecture, and practical visual UI/UX craftsmanship.",
    cvUrl: "#",
    experienceYears: "1+",
    keyProjectsCount: "3",
    technologiesCount: "10+",
    avatar: "/src/assets/images/developer_avatar_1779339371574.png",
    logo: "/src/assets/images/vt_logo_1779339354563.png",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      telegram: "https://telegram.org"
    }
  },
  
  projects: [
    {
      id: "fastcare",
      title: "FastCare - Phone & Laptop Repair System",
      subtitle: "Enterprise Technical Operations Coordinator",
      description: "A visually styled point-of-sale and technical status lifecycle tracking system crafted to coordinate devices servicing, ticketing backlog management, and real-time user notification flows.",
      fullDescription: "FastCare is a high-performance system created to bridge the operational gap between repair technicians, customers, and business administrators. It offers an responsive dashboard tracking system diagnostic pipelines, automatic client notifications on order milestones, and robust reporting modules to analyze team service velocities.",
      image: "/src/assets/images/project_fastcare_1779339390431.png",
      tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "TypeScript"],
      demoUrl: "https://fastcare.example.com",
      githubUrl: "https://github.com",
      features: [
        "Interactive Ticket Pipeline: Double-drag kanban board for managing active repairs.",
        "Automatic Client Notifications: Integrated SMS/Email notification on status milestones.",
        "Secure Inventory Checking: Real-time telemetry log for available mechanical and electrical replacement parts.",
        "Multi-role Auth structure: Separate client support desks, technical engineer portals, and owner views."
      ],
      challenges: "Synchronizing status transitions among multiple technicians in real-time caused race conditions and dashboard locks.",
      solutions: "Configured optimistic client state updates backed by an append-only transaction queue, with elegant retry banners when connections flicker."
    },
    {
      id: "tamda-express",
      title: "Tamda Express - Logistics Management System",
      subtitle: "Real-time Tracker & Delivery Hub",
      description: "A glowing futuristic logistics dashboard built to monitor fleets locations, dispatch orders, automate delivery routings, and catalog warehouses inventory status.",
      fullDescription: "Tamda Express is a comprehensive, production-tested logistics platform designed to optimize short-haul and long-haul courier coordinates. Utilizing clean interactive layouts, dispatchers can visualize active routes, manage drivers load limits, and analyze delivery turn-around times.",
      image: "/src/assets/images/project_tamda_1779339407391.png",
      tags: ["React.js", "Tailwind CSS", "Mapbox GL", "Node.js"],
      demoUrl: "https://tamda.example.com",
      githubUrl: "https://github.com",
      features: [
        "Live Fleet Telemetry: Real-time geometric mapping tracking delivery fleet vehicles.",
        "Dynamic Routing algorithms: Automated route sorting to compress delivery cycles by 18%.",
        "Digital Load Checklist: Mobile-friendly digital verification forms to cross-verify physical parcel status on dispatch.",
        "Client Notification Hub: Live ETA sharing links for recipient client portals."
      ],
      challenges: "Intermittent mobile signals from transit vehicles caused messy fragmented tracking logs and UI flickering.",
      solutions: "Implemented offline-first IndexedDB buffer loops capturing coordinate points locally, batch-syncing them with time-series optimization queries on reconnected intervals."
    },
    {
      id: "skyline-edu",
      title: "Skyline Edu - Educational Website & CMS",
      subtitle: "Dynamic E-Learning Portal",
      description: "An intuitive web learning academy providing multimedia lectures delivery, student progress dashboards, interactive quizzes, and content publishing panels.",
      fullDescription: "Skyline Edu consolidates active school curriculums into a modular digital portal. Instructors can drag-and-drop course schedules, live stream classes, issue automated self-checking quizzes, and communicate with students directly via integrated group forums.",
      image: "/src/assets/images/project_skyline_1779339427282.png",
      tags: ["Next.js", "Tailwind CSS", "Strapi CMS", "PostgreSQL"],
      demoUrl: "https://skyline.example.com",
      githubUrl: "https://github.com",
      features: [
        "Rich-text Curriculum Writer: Drag-and-drop syllabus organizer with embedded media capabilities.",
        "Student Analytics Dashboard: Fluid visual progressions charting finished lessons, scores, and active class hours.",
        "Self-grading Quiz Engine: Configurable multi-type question pools with automated score calculation.",
        "Direct Class Discussion Panels: Group forum rooms with real-time markdown answers parsing."
      ],
      challenges: "High-latency video loads and heavy PDF syllabus reading caused high dropout rates for low-bandwidth mobile readers.",
      solutions: "Configured aggressive server-side static page hydration, lazy-loaded non-critical components, and utilized edge caching networks."
    }
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      role: "Frontend Developer",
      company: "BAREOLUTIONS Technology Co., Ltd.",
      period: "06/2024 - Present",
      points: [
        "Responsible for designing, implementing, and maintaining highly scalable web applications and pristine responsive user interfaces.",
        "Collaborate with multi-disciplinary engineering and product design teams to map high-fidelity mockups into high-performance web components.",
        "Optimize overall core performance footprint, reducing initial load files and improving rendering speed for key core pages by 32%.",
        "Adopt and build reusable system libraries and internal tools, significantly amplifying developer velocity and overall codebase scalability."
      ]
    },
    {
      id: "exp-2",
      role: "IT Tutor / Teaching Assistant",
      company: "GREEN ACADEMY",
      period: "06/2022 - 05/2024",
      points: [
        "Ran core training sessions and mentored young software trainees on essential frontend methodologies (HTML, CSS, React, and JavaScript layouting).",
        "Assisted principal lecturers in designing grading criteria, creating mock test portfolios, and evaluating student final term projects.",
        "Guided individual trainees through coding logic blocks and tutored foundational web architectures, raising first-round submission success by 20%."
      ]
    }
  ] as Experience[],

  education: [
    {
      id: "edu-1",
      institution: "Academy of Cryptography Techniques (KMA)",
      major: "Information Security Management",
      period: "2020 - 2024",
      gpa: "3.29 / 4.0"
    }
  ] as Education[],

  skills: [
    {
      id: "skill-frontend",
      name: "Frontend Development",
      description: "Crafting highly aesthetic, adaptive and reliable client experiences.",
      level: "High",
      iconType: "frontend",
      items: [
        { name: "React.js / Next.js", percentage: 95 },
        { name: "TypeScript", percentage: 90 },
        { name: "Tailwind CSS & CSS Grid", percentage: 95 },
        { name: "State Managers (Zustand/Redux)", percentage: 85 }
      ]
    },
    {
      id: "skill-backend",
      name: "Backend & Storage",
      description: "Structuring high-integrity APIs and query logistics.",
      level: "High",
      iconType: "backend",
      items: [
        { name: "Node.js / Express / NestJS", percentage: 80 },
        { name: "REST APIs / GraphQL", percentage: 85 },
        { name: "PostgreSQL & MySQL", percentage: 80 },
        { name: "Firebase / Firestore", percentage: 75 }
      ]
    },
    {
      id: "skill-devops",
      name: "DevOps & Testing",
      description: "Managing continuous deployments and code quality assurance.",
      level: "Medium",
      iconType: "devops",
      items: [
        { name: "Docker & Containerization", percentage: 75 },
        { name: "CI/CD & GitHub Actions", percentage: 80 },
        { name: "Jest & React Testing Library", percentage: 75 },
        { name: "Cloud Server Deployment", percentage: 80 }
      ]
    },
    {
      id: "skill-tools",
      name: "Tools & Methodologies",
      description: "Driving development velocity with modern standards.",
      level: "High",
      iconType: "tools",
      items: [
        { name: "Figma UI/UX Translation", percentage: 90 },
        { name: "Git & Collaborative Flow", percentage: 95 },
        { name: "Postman API Workspaces", percentage: 90 },
        { name: "Agile / Scrum Methodologies", percentage: 85 }
      ]
    }
  ] as SkillCategory[]
};
