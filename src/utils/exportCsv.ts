import { type Activity } from "../features/activities/types";
import { type JobApplication } from "../features/applications/data";

const UTF8_BOM = "\uFEFF";

function escapeCsvValue(value: string | number): string {
  const str = String(value);

  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

function getDateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

function downloadCsv(csv: string, fileName: string): void {
  const blob = new Blob([`${UTF8_BOM}${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function activitiesToCsv(activities: Activity[]): string {
  const headers = ["#", "Activity", "Date", "Status", "Notes"];
  const headerRow = headers.join(",");

  const dataRows = activities.map((activity) =>
    [
      activity.number,
      activity.activity,
      activity.date,
      activity.status,
      activity.notes || "",
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  return [headerRow, ...dataRows].join("\n");
}

function applicationsToCsv(applications: JobApplication[]): string {
  const headers = ["#", "Company", "Role", "Date", "Status", "Notes"];
  const headerRow = headers.join(",");

  const dataRows = applications.map((app) =>
    [app.number, app.company, app.role, app.date, app.status, app.notes || ""]
      .map(escapeCsvValue)
      .join(","),
  );

  return [headerRow, ...dataRows].join("\n");
}

export function exportActivitiesCsv(activities: Activity[]): void {
  if (activities.length === 0) return;

  try {
    const csv = activitiesToCsv(activities);

    downloadCsv(csv, `activities_${getDateStamp()}.csv`);
  } catch {
    window.alert("Export failed. Please try again.");
  }
}

export function exportApplicationsCsv(applications: JobApplication[]): void {
  if (applications.length === 0) return;

  try {
    const csv = applicationsToCsv(applications);

    downloadCsv(csv, `applications_${getDateStamp()}.csv`);
  } catch {
    window.alert("Export failed. Please try again.");
  }
}
