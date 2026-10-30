/**
 * DEVVERSE Portfolio Data Configuration
 * Primary Source of Truth: Akshatha's Verified Resume
 */

export const LINKEDIN_URL = "https://www.linkedin.com/in/akshatha-shridhar-hande-5697b4343/";
export const RESUME_PATH = "/resume.pdf";
export const EMAIL_ADDRESS = "akshatha2820@gmail.com";
export const PHONE_NUMBER = "+91 9731735430";
export const LOCATION = "Byndoor, Karnataka, India";

export const PERSONAL_INFO = {
  name: "Akshatha",
  fullName: "Akshatha Shridhar Hande",
  eyebrow: "WELCOME TO MY UNIVERSE",
  title: "MCA Student | Aspiring Software Developer & Cloud Engineer",
  shortIntro: "Building resilient full-stack architectures, native Android ecosystems, and intelligent cloud-ready applications with algorithmic precision.",
  fullSummary: "Results-driven MCA student and aspiring Software Developer & Cloud Engineer with a strong foundation in Python, Java, web development, cloud computing concepts, and Natural Language Processing (NLP). Proven track record in building scalable full-stack applications, implementing secure API integrations, and designing robust algorithmic workflows. Eager to deliver high-performance software and cloud solutions in a dynamic engineering environment.",
  currentStatus: "Available for Internships & Entry-Level Software Engineering Opportunities",
  educationHighlight: "Poornaprajna Institute of Management (MCA 9.02 CGPA) | BCA 8.95 CGPA",
  certificationHighlight: "NPTEL Certified in Cloud Computing (2026)",
  awardHighlight: "Rajya Puraskar Awardee — The Bharat Scouts & Guides"
};

export const ABOUT_HIGHLIGHTS = [
  {
    id: "software-dev",
    title: "Software Development",
    icon: "Code2",
    badge: "Full-Stack & Mobile",
    description: "Crafting end-to-end full-stack web platforms and native Android mobile applications. Experienced with modular architectures, reactive state management, and real-time database synchronization.",
    tags: ["Java", "Python", "PHP", "React", "Android Studio", "MySQL"]
  },
  {
    id: "problem-solving",
    title: "Problem Solving & Core CS",
    icon: "Cpu",
    badge: "Algorithmic Precision",
    description: "Grounding development in rigorous computer science principles: Data Structures & Algorithms, Object-Oriented Design, Database Normalization, Operating Systems, and Network Protocols.",
    tags: ["DSA", "OOP", "DBMS", "Haversine Formula", "Risk Algorithms"]
  },
  {
    id: "cloud-learning",
    title: "Cloud & Technology Learning",
    icon: "Cloud",
    badge: "NPTEL Certified 2026",
    description: "Actively expanding into distributed cloud computing paradigms, API-first architecture, and Natural Language Processing (NLP) to build resilient, automated modern software solutions.",
    tags: ["Cloud Computing", "NLP", "Firebase", "Git / GitHub", "REST APIs"]
  }
];

export const PROJECTS = [
  {
    id: "microfinance-system",
    title: "Microfinance Loan Approval & Risk-Based Management System",
    subtitle: "Automated Lending Lifecycle with Geospatial Branch Routing & Risk Assessment",
    timeline: "Dec 2025 – Feb 2026",
    category: "Full-Stack Web Application",
    featured: true,
    accentColor: "#FF7A00",
    illustrationType: "microfinance",
    linkedinUrl: LINKEDIN_URL,
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "OpenStreetMap API", "Razorpay"],
    summary: "A comprehensive full-stack platform designed to automate end-to-end microfinance loan lifecycles, incorporating geo-based branch assignment using OpenStreetMap API and SQL Haversine formula calculations.",
    problemAddressed: "Conventional microfinance workflows struggle with slow manual verification, subjective credit risk appraisal, inefficient geographic allocation of regional applicants to branch offices, and cumbersome paper documentation.",
    solution: "Engineered an automated digital loan portal featuring real-time geospatial branch assignment, algorithmic risk scoring, multi-tier approval hierarchies, and secure financial processing.",
    keyFeatures: [
      "Geospatial Branch Routing: Automated calculation of nearest branch coordinates via OpenStreetMap API and SQL Haversine spherical distance formulas.",
      "Algorithmic Risk Scoring: Evaluates applicant creditworthiness, debt-to-income ratios, and tenure parameters to generate automated risk tiers.",
      "Hierarchical Approval Pipeline: Role-based authorization separating applicant submissions, Loan Officer scrutiny, and Branch Manager final sanctions.",
      "Dynamic Financial Computations: Real-time EMI schedule calculations with detailed principal and interest amortization breakdowns.",
      "Security & Payments: Integrated SMS/OTP verification workflows, Razorpay test payment integration for processing fees, and dynamic PDF sanction letter generation."
    ],
    technicalHighlights: [
      "SQL Haversine distance computations optimized for sub-second spatial queries.",
      "State-machine driven loan lifecycle states (Submitted -> Under Review -> Officer Approved -> Manager Sanctioned -> Disbursed).",
      "Dynamic server-side PDF document compilation for official sanction documentation."
    ]
  },
  {
    id: "forkroute-restaurant",
    title: "ForkRoute — Smart Restaurant Management System",
    subtitle: "Real-Time Mobile Ecosystem for Dining Operations, Kitchen Workflow & Analytics",
    timeline: "May 2026 – Aug 2026",
    category: "Native Android Application",
    featured: true,
    accentColor: "#38BDF8",
    illustrationType: "forkroute",
    linkedinUrl: LINKEDIN_URL,
    technologies: ["Java", "Android Studio", "Firebase Realtime DB", "XML Layouts", "Razorpay"],
    summary: "A native Android mobile application orchestrating table reservations, QR code check-ins, live kitchen order synchronization, and role-based operational intelligence.",
    problemAddressed: "Traditional restaurant operations suffer from communication friction between front-of-house guests, waitstaff, and kitchen preparation stations, leading to table turnover delays and lack of centralized sales analytics.",
    solution: "Designed a multi-role native Android ecosystem linking Customers, Kitchen Staff, and Administrators in real time through synchronized Firebase event streams.",
    keyFeatures: [
      "Tri-Role Architecture: Granular interfaces tailored for Customers (menu discovery, booking, checkout), Kitchen Teams (live ticket queues), and Admins (floor monitoring & metrics).",
      "Real-Time Kitchen Sync: Powered by Firebase Realtime Database to push customer orders instantaneously to kitchen display lines without latency.",
      "QR-Based Table Check-Ins: Expedited customer physical seating verification and live table occupancy tracking (Vacant, Reserved, Dining).",
      "Integrated Digital Checkout: Integrated Razorpay test payment gateway for smooth, cashless in-app settlements.",
      "Business Intelligence Module: Executive analytics dashboard tracking Key Performance Indicators (KPIs), visual charts, and automated PDF/CSV report exports."
    ],
    technicalHighlights: [
      "Asynchronous Firebase event listeners with lifecycle-aware Android architecture components.",
      "Modular, responsive XML layout hierarchy supporting diverse Android screen densities.",
      "Comprehensive data export utilities generating structured PDF summaries and CSV datasets."
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Programming Languages",
    icon: "Terminal",
    skills: [
      { name: "Java", level: "Core", desc: "Object-oriented programming, Android development, algorithms" },
      { name: "Python", level: "Core", desc: "Scripting, algorithmic workflows, NLP exploration" },
      { name: "PHP", level: "Applied", desc: "Server-side scripting, full-stack systems, API development" }
    ]
  },
  {
    name: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "React", level: "Modern", desc: "Component architecture, hooks, responsive SPAs" },
      { name: "JavaScript (ES6+)", level: "Core", desc: "Async/await, DOM manipulation, client-side logic" },
      { name: "HTML5 & CSS3", level: "Core", desc: "Semantic markup, flexbox, CSS grid, keyframe motion" },
      { name: "Bootstrap", level: "Applied", desc: "Rapid responsive styling, grid systems, utility classes" }
    ]
  },
  {
    name: "Backend & Databases",
    icon: "Database",
    skills: [
      { name: "MySQL", level: "Core", desc: "Relational schema design, SQL queries, Haversine formula" },
      { name: "Firebase", level: "Applied", desc: "Realtime Database, mobile sync, event streams" },
      { name: "RESTful APIs", level: "Applied", desc: "HTTP endpoints, JSON communication, secure integrations" }
    ]
  },
  {
    name: "Development Tools & Integrations",
    icon: "Wrench",
    skills: [
      { name: "Android Studio", level: "Applied", desc: "Native Android development, Gradle, XML layouts" },
      { name: "Git & GitHub", level: "Workflow", desc: "Version control, branching, repository management" },
      { name: "VS Code", level: "Primary IDE", desc: "Development environment, linting, debugging" },
      { name: "OpenStreetMap API", level: "Integration", desc: "Geospatial queries, coordinate calculations" },
      { name: "Razorpay Integration", level: "Integration", desc: "Payment workflows, secure test transactions" }
    ]
  },
  {
    name: "Core Computer Science",
    icon: "Cpu",
    skills: [
      { name: "Data Structures & Algorithms", level: "Foundational", desc: "Arrays, lists, trees, graphs, sorting, searching" },
      { name: "Object-Oriented Programming (OOP)", level: "Foundational", desc: "Encapsulation, inheritance, polymorphism, abstraction" },
      { name: "Database Management Systems (DBMS)", level: "Foundational", desc: "Normalization, ACID properties, indexing, transactions" },
      { name: "Operating Systems", level: "Foundational", desc: "Process scheduling, memory management, concurrency" },
      { name: "Computer Networks", level: "Foundational", desc: "OSI model, TCP/IP protocols, client-server models" }
    ]
  },
  {
    name: "Cloud & Learning Interests",
    icon: "CloudRain",
    skills: [
      { name: "Cloud Computing", level: "NPTEL Certified (2026)", desc: "Virtualization, cloud architectures, service models (IaaS/PaaS/SaaS)" },
      { name: "Natural Language Processing (NLP)", level: "Active Interest", desc: "Text processing, algorithmic language models, syntax analysis" }
    ]
  }
];

export const JOURNEY_MILESTONES = [
  {
    id: "mca",
    period: "2025 — 2027",
    title: "Master of Computer Applications (MCA)",
    institution: "Poornaprajna Institute of Management, Udupi",
    badge: "CGPA: 9.02 / 10",
    type: "education",
    highlight: true,
    description: "Pursuing advanced studies in software architecture, cloud computing paradigms, distributed databases, and high-performance engineering."
  },
  {
    id: "cloud-cert",
    period: "2026",
    title: "Cloud Computing Certification",
    institution: "NPTEL (National Programme on Technology Enhanced Learning)",
    badge: "NPTEL Certified",
    type: "certification",
    highlight: true,
    description: "Rigorous certification covering cloud computing architectures, virtualization, resource provisioning, security models, and cloud storage systems."
  },
  {
    id: "bca",
    period: "2022 — 2025",
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Bhandarkars' Arts & Science College, Kundapura",
    badge: "CGPA: 8.95 / 10",
    type: "education",
    highlight: false,
    description: "Built strong foundations in programming fundamentals (Java, Python, C++), relational databases, web development, and algorithmic thinking."
  },
  {
    id: "rajya-puraskar",
    period: "Jun 2019",
    title: "Rajya Puraskar Awardee (Governor's Award)",
    institution: "The Bharat Scouts & Guides",
    badge: "State-Level Honor",
    type: "achievement",
    highlight: true,
    description: "Conferred state-level honors for demonstrated excellence in leadership, community service, discipline, and organized youth development."
  }
];

export const LANGUAGES = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Kannada", level: "Native / Bilingual" },
  { name: "Telugu", level: "Conversational" },
  { name: "Hindi", level: "Conversational" }
];
