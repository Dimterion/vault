export type WorkEntry = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type LinkEntry = {
  id: string;
  label: string;
  url: string;
};

export type CvData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  skills: string;
  experience: WorkEntry[];
  education: EducationEntry[];
  links: LinkEntry[];
};

export const EMPTY_CV: CvData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  skills: "",
  experience: [],
  education: [],
  links: [],
};

export function makeWorkEntry(partial: Omit<WorkEntry, "id">): WorkEntry {
  return { ...partial, id: crypto.randomUUID() };
}

export function makeEducationEntry(
  partial: Omit<EducationEntry, "id">,
): EducationEntry {
  return { ...partial, id: crypto.randomUUID() };
}

export function makeLinkEntry(partial: Omit<LinkEntry, "id">): LinkEntry {
  return { ...partial, id: crypto.randomUUID() };
}

const STORAGE_KEY = "pathfinder_cv";

export async function loadCv(): Promise<CvData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return EMPTY_CV;
    }

    const parsed = JSON.parse(raw) as Partial<CvData> & {
      linkedin?: string;
      github?: string;
      website?: string;
    };

    const existingLinks = Array.isArray(parsed.links) ? parsed.links : [];

    const legacyLinks: LinkEntry[] = [];

    if (parsed.linkedin?.trim()) {
      legacyLinks.push(
        makeLinkEntry({
          label: "LinkedIn",
          url: parsed.linkedin.trim(),
        }),
      );
    }

    if (parsed.github?.trim()) {
      legacyLinks.push(
        makeLinkEntry({
          label: "GitHub",
          url: parsed.github.trim(),
        }),
      );
    }

    if (parsed.website?.trim()) {
      legacyLinks.push(
        makeLinkEntry({
          label: "Website",
          url: parsed.website.trim(),
        }),
      );
    }

    return {
      ...EMPTY_CV,
      ...parsed,
      links: existingLinks.length > 0 ? existingLinks : legacyLinks,
    };
  } catch {
    return EMPTY_CV;
  }
}

export async function saveCv(cv: CvData): Promise<boolean> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
    return true;
  } catch (error) {
    console.error("Failed to save CV:", error);
    return false;
  }
}
