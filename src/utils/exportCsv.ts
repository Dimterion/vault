import { type Activity } from "../features/activities/data";
import type { JobApplication } from "../data/applications";

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(csv: string, fileName: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
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

  const csv = activitiesToCsv(activities);
  const fileName = `activities_${new Date().toISOString().slice(0, 10)}.csv`;

  downloadCsv(csv, fileName);
}

export function exportApplicationsCsv(applications: JobApplication[]): void {
  if (applications.length === 0) return;

  const csv = applicationsToCsv(applications);
  const fileName = `applications_${new Date().toISOString().slice(0, 10)}.csv`;

  downloadCsv(csv, fileName);
}
