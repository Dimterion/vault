import { useEffect, useState } from "react";
import AddApplicationModal from "../components/Applications/AddApplicationModal";
import {
  APPLICATION_STATUS_COLORS,
  type JobApplication,
  loadApplications,
  saveApplications,
} from "../data/applications";
import { exportApplicationsCsv } from "../utils/exportCsv";

const COLUMNS = [
  { key: "number", label: "#", width: "64px" },
  { key: "company", label: "Company", width: "180px" },
  { key: "role", label: "Role", width: "180px" },
  { key: "date", label: "Date", width: "140px" },
  { key: "status", label: "Status", width: "140px" },
  { key: "notes", label: "Notes", width: "260px" },
] as const;

function renumber(list: JobApplication[]): JobApplication[] {
  return list.map((app, index) => ({ ...app, number: index + 1 }));
}

type ApplicationFormData = Omit<JobApplication, "id" | "number">;

export default function TrackerPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | undefined>();

  useEffect(() => {
    async function fetchApplications() {
      const data = await loadApplications();
      setApplications(data);
      setLoading(false);
    }

    fetchApplications();
  }, []);

  async function handleAdd(entry: ApplicationFormData) {
    const newApp: JobApplication = {
      ...entry,
      id: crypto.randomUUID(),
      number: applications.length + 1,
    };

    const updated = renumber([...applications, newApp]);
    setApplications(updated);
    await saveApplications(updated);
  }

  async function handleEdit(entry: ApplicationFormData) {
    if (!selectedApp) return;

    const updated = renumber(
      applications.map((app) =>
        app.id === selectedApp.id ? { ...app, ...entry } : app,
      ),
    );

    setApplications(updated);
    await saveApplications(updated);
  }

  async function handleDelete(id: string) {
    const updated = renumber(applications.filter((app) => app.id !== id));
    setApplications(updated);
    await saveApplications(updated);
  }

  function openAdd() {
    setSelectedApp(undefined);
    setModalOpen(true);
  }

  function openEdit(app: JobApplication) {
    setSelectedApp(app);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedApp(undefined);
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-full w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={openAdd}
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Add entry
        </button>

        {applications.length > 0 ? (
          <button
            type="button"
            onClick={() => exportApplicationsCsv(applications)}
            className="rounded-2xl border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Export CSV
          </button>
        ) : null}
      </div>

      <p className="mb-5 text-sm text-gray-500">
        Click an application row to edit or delete it.
      </p>

      {applications.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            No applications yet
          </h2>
          <p className="max-w-md text-sm leading-6 text-gray-500">
            Click &quot;Add entry&quot; to start tracking your job search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-240 border-collapse">
            <thead className="bg-gray-900">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="border-r border-gray-700 px-4 py-4 text-left text-xs font-bold tracking-wide text-white uppercase last:border-r-0"
                    style={{ width: col.width }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app.id}
                  onClick={() => openEdit(app)}
                  className={`cursor-pointer border-t border-gray-200 align-top transition hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {app.number}
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    <div className="line-clamp-2 min-h-10">{app.company}</div>
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    <div className="line-clamp-2 min-h-10">{app.role}</div>
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {app.date}
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    <span
                      className="inline-flex min-w-25 justify-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{
                        backgroundColor:
                          APPLICATION_STATUS_COLORS[app.status] ?? "#6b7280",
                      }}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="line-clamp-3">{app.notes || "—"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddApplicationModal
        key={selectedApp?.id ?? "new"}
        open={modalOpen}
        onClose={closeModal}
        onSave={selectedApp ? handleEdit : handleAdd}
        onDelete={selectedApp ? () => handleDelete(selectedApp.id) : undefined}
        initialData={selectedApp}
      />
    </div>
  );
}
