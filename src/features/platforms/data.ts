export type PlatformLink = {
  label: string;
  url: string;
};

export type PlatformImageKey = "linkedin" | "welcometothejungle" | "glassdoor";

export type JobPlatform = {
  id: string;
  title: string;
  websiteUrl: string;
  description: string;
  imageKey?: PlatformImageKey;
  tags?: string[];
  extraLinks?: PlatformLink[];
};

// Images are optional and can be added as:
// imageKey: "linkedin",

export const platforms: JobPlatform[] = [
  {
    id: "linkedin",
    title: "LinkedIn",
    websiteUrl: "https://www.linkedin.com",
    description:
      "Use LinkedIn primarily for professional networking, finding roles through your existing contacts, and researching companies and recruiters. It is especially useful for keeping your profile visible to employers and for reaching out directly about opportunities. Treat job applications as one part of a broader strategy: engage with relevant companies, follow recruiters, and use referrals where possible.",
    tags: ["Networking", "Jobs", "Company Research"],
    extraLinks: [
      {
        label: "Help Center",
        url: "https://www.linkedin.com/help/linkedin",
      },
    ],
  },
  {
    id: "welcome_to_the_jungle",
    title: "Welcome to the Jungle",
    websiteUrl: "https://www.welcometothejungle.com",
    description:
      "Use Welcome to the Jungle mainly to discover companies through their culture, values, teams, and working environment before applying. It is particularly helpful when you want more context than a standard job listing provides, especially for roles at startups and scale-ups. Browse company profiles first, then use the job search to find openings that match your interests.",
    tags: ["Jobs", "Company Research", "Startup"],
    extraLinks: [
      {
        label: "Help Center",
        url: "https://help.welcometothejungle.com",
      },
    ],
  },
  {
    id: "glassdoor",
    title: "Glassdoor",
    websiteUrl: "https://www.glassdoor.com",
    description:
      "Use Glassdoor primarily for company research before applying or interviewing. Check employee reviews, salary ranges, interview experiences, and company ratings to understand what a workplace may be like. It is most valuable as a due-diligence tool rather than as your main source of job listings.",
    tags: ["Company Research", "Salaries", "Interviews"],
    extraLinks: [
      {
        label: "Help Center",
        url: "https://help.glassdoor.com",
      },
    ],
  },
  {
    id: "google_jobs",
    title: "Google Jobs",
    websiteUrl: "https://www.google.com/search?q=jobs",
    description:
      "Use Google Jobs to quickly aggregate job listings from many sources in one search. It is best for getting a broad overview of available roles, comparing titles and locations, and finding listings that may not appear on a single platform. Use it for discovery, then apply through the original employer or job board whenever possible.",
    tags: ["Jobs", "Search", "Aggregator"],
  },
];
