export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type JobApplication = {
  id: string;
  number: number;
  company: string;
  role: string;
  date: string;
  status: ApplicationStatus;
  notes: string;
};

const STORAGE_KEY = "pathfinder_applications";

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  Applied: "#1d4ed8",
  Interview: "#b45309",
  Offer: "#166534",
  Rejected: "#991b1b",
  Withdrawn: "#6b7280",
};

export async function loadApplications(): Promise<JobApplication[]> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveApplications(
  applications: JobApplication[],
): Promise<boolean> {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch (error) {
    console.error("Failed to save applications:", error);
    return false;
  }
}
