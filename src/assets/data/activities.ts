export type ActivityStatus = "Active" | "Completed" | "Canceled" | "Paused";

export type Activity = {
  id: string;
  number: number;
  activity: string;
  date: string;
  status: ActivityStatus;
  notes: string;
};

const STORAGE_KEY = "vault_activities";

export const ACTIVITY_STATUS_COLORS: Record<ActivityStatus, string> = {
  Active: "#1d4ed8",
  Completed: "#166534",
  Canceled: "#991b1b",
  Paused: "#6b7280",
};

export async function loadActivities(): Promise<Activity[]> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveActivities(activities: Activity[]): Promise<boolean> {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error("Failed to save activities:", error);
    return false;
  }
}
