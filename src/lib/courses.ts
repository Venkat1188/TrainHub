export type CourseFormat = "online" | "classroom" | "hybrid";

export type Course = {
  slug: string;
  title: string;
  category: string;
  durationDays: number;
  location: string;
  format: CourseFormat;
  feeUSD: number;
  skills: string[];
  shortDescription: string;
  featured?: boolean;
  latest?: boolean;
};

export const COURSES: Course[] = [
  {
    slug: "data-analytics-with-power-bi",
    title: "Data Analytics with Power BI",
    category: "Research & Data Analysis",
    durationDays: 5,
    location: "Nairobi, Kenya",
    format: "hybrid",
    feeUSD: 1200,
    skills: ["Power BI", "DAX", "Data Modeling", "Dashboarding"],
    shortDescription:
      "Build interactive dashboards and turn raw business data into clear, decision-ready insights using Microsoft Power BI.",
    featured: true,
    latest: true,
  },
  {
    slug: "project-management-professional-prep",
    title: "Project Management Professional (PMP)® Exam Prep",
    category: "Project Management",
    durationDays: 5,
    location: "Dubai, UAE",
    format: "classroom",
    feeUSD: 1450,
    skills: ["Scope", "Schedule", "Risk", "Stakeholders"],
    shortDescription:
      "Structured preparation for the PMP® exam covering predictive, agile and hybrid approaches with practice questions and mock exams.",
    featured: true,
  },
  {
    slug: "monitoring-evaluation-and-learning",
    title: "Monitoring, Evaluation & Learning (MEL)",
    category: "Research & Data Analysis",
    durationDays: 10,
    location: "Kigali, Rwanda",
    format: "hybrid",
    feeUSD: 1800,
    skills: ["Theory of Change", "Logframes", "Indicators", "Evaluation Design"],
    shortDescription:
      "End-to-end MEL design for development programs — from theory of change and indicator selection to data collection and reporting.",
    featured: true,
    latest: true,
  },
  {
    slug: "financial-management-for-ngos",
    title: "Financial Management for NGOs",
    category: "Finance",
    durationDays: 5,
    location: "Online",
    format: "online",
    feeUSD: 950,
    skills: ["Budgeting", "Donor Reporting", "Internal Controls", "Audit"],
    shortDescription:
      "Practical financial management for grant-funded organizations: budgeting, donor compliance, internal controls and audit readiness.",
    featured: true,
  },
  {
    slug: "gis-and-spatial-analysis-with-qgis",
    title: "GIS & Spatial Analysis with QGIS",
    category: "Information Technology",
    durationDays: 5,
    location: "Online",
    format: "online",
    feeUSD: 1100,
    skills: ["QGIS", "Cartography", "Geoprocessing", "Spatial Analysis"],
    shortDescription:
      "Hands-on training in open-source GIS using QGIS — covering map design, geoprocessing workflows and spatial analysis techniques.",
    latest: true,
  },
  {
    slug: "field-epidemiology-and-disease-surveillance",
    title: "Field Epidemiology & Disease Surveillance",
    category: "Public Health",
    durationDays: 10,
    location: "Addis Ababa, Ethiopia",
    format: "classroom",
    feeUSD: 1700,
    skills: ["Outbreak Investigation", "Surveillance", "Field Methods", "Reporting"],
    shortDescription:
      "Applied training for public-health professionals on outbreak investigation, surveillance systems and field data collection.",
    latest: true,
  },
  {
    slug: "agricultural-extension-and-advisory-services",
    title: "Agricultural Extension & Advisory Services",
    category: "Agriculture",
    durationDays: 5,
    location: "Kampala, Uganda",
    format: "hybrid",
    feeUSD: 1050,
    skills: ["Extension Methods", "Farmer Outreach", "Climate-Smart Agriculture"],
    shortDescription:
      "Strengthen extension delivery with modern advisory approaches, farmer engagement techniques and climate-smart practices.",
  },
  {
    slug: "grant-proposal-writing-and-fundraising",
    title: "Grant Proposal Writing & Fundraising",
    category: "Business",
    durationDays: 5,
    location: "Online",
    format: "online",
    feeUSD: 900,
    skills: ["Proposal Design", "Logframes", "Budgeting", "Donor Mapping"],
    shortDescription:
      "Write fundable proposals: donor mapping, logframe design, narrative writing and realistic budgeting that wins grants.",
    latest: true,
  },
  {
    slug: "introduction-to-machine-learning-with-python",
    title: "Introduction to Machine Learning with Python",
    category: "Information Technology",
    durationDays: 10,
    location: "Online",
    format: "online",
    feeUSD: 1600,
    skills: ["Python", "scikit-learn", "Pandas", "Model Evaluation"],
    shortDescription:
      "A practical introduction to supervised machine learning in Python — from data preparation to model training and evaluation.",
    featured: true,
  },
  {
    slug: "leadership-and-strategic-management",
    title: "Leadership & Strategic Management",
    category: "Business",
    durationDays: 5,
    location: "Cape Town, South Africa",
    format: "classroom",
    feeUSD: 1350,
    skills: ["Strategy", "Change Management", "Coaching", "Decision Making"],
    shortDescription:
      "Develop the leadership skills and strategic thinking required to lead high-performing teams through complexity and change.",
  },
  {
    slug: "construction-project-management",
    title: "Construction Project Management",
    category: "Project Management",
    durationDays: 10,
    location: "Doha, Qatar",
    format: "classroom",
    feeUSD: 1850,
    skills: ["Planning", "Contracts", "Cost Control", "Site Safety"],
    shortDescription:
      "Plan, schedule and control construction projects effectively — covering contracts, cost management and site safety.",
  },
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "Information Technology",
    durationDays: 5,
    location: "Online",
    format: "online",
    feeUSD: 1300,
    skills: ["Network Security", "Threat Modeling", "Hardening", "Incident Response"],
    shortDescription:
      "A foundation in cybersecurity for IT professionals — threats, defensive controls, hardening and incident response basics.",
    latest: true,
  },
  {
    slug: "human-resources-for-modern-workplaces",
    title: "Human Resources for Modern Workplaces",
    category: "Human Resources",
    durationDays: 5,
    location: "Online",
    format: "online",
    feeUSD: 1050,
    skills: ["Talent Acquisition", "Performance", "L&D", "Employee Relations"],
    shortDescription:
      "Modern HR practice covering talent acquisition, performance management, learning & development and employee engagement.",
  },
];

export const CATEGORIES = Array.from(new Set(COURSES.map((c) => c.category)));

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
