import { useEffect, useState } from "react";
import AddActivityModal from "../features/activities/AddActivityModal";
import {
  ACTIVITY_STATUS_COLORS,
  type Activity,
  loadActivities,
  saveActivities,
} from "../features/activities/data";
import { exportActivitiesCsv } from "../utils/exportCsv";

const COLUMNS = [
  { key: "number", label: "#", width: "64px" },
  { key: "activity", label: "Activity", width: "180px" },
  { key: "date", label: "Date", width: "140px" },
  { key: "status", label: "Status", width: "140px" },
  { key: "notes", label: "Notes", width: "260px" },
] as const;

function renumber(list: Activity[]): Activity[] {
  return list.map((act, index) => ({ ...act, number: index + 1 }));
}

type ActivityFormData = Omit<Activity, "id" | "number">;

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAct, setSelectedAct] = useState<Activity | undefined>();

  useEffect(() => {
    async function fetchActivities() {
      const data = await loadActivities();
      setActivities(data);
      setLoading(false);
    }

    fetchActivities();
  }, []);

  async function handleAdd(entry: ActivityFormData) {
    const newAct: Activity = {
      ...entry,
      id: crypto.randomUUID(),
      number: activities.length + 1,
    };

    const updated = renumber([...activities, newAct]);
    setActivities(updated);
    await saveActivities(updated);
  }

  async function handleEdit(entry: ActivityFormData) {
    if (!selectedAct) return;

    const updated = renumber(
      activities.map((act) =>
        act.id === selectedAct.id ? { ...act, ...entry } : act,
      ),
    );

    setActivities(updated);
    await saveActivities(updated);
  }

  async function handleDelete(id: string) {
    const updated = renumber(activities.filter((act) => act.id !== id));
    setActivities(updated);
    await saveActivities(updated);
  }

  function openAdd() {
    setSelectedAct(undefined);
    setModalOpen(true);
  }

  function openEdit(act: Activity) {
    setSelectedAct(act);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedAct(undefined);
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

        {activities.length > 0 ? (
          <button
            type="button"
            onClick={() => exportActivitiesCsv(activities)}
            className="rounded-2xl border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Export CSV
          </button>
        ) : null}
      </div>

      <p className="mb-5 text-sm text-gray-500">
        Click an activity row to edit or delete it.
      </p>

      {activities.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            No activities yet
          </h2>
          <p className="max-w-md text-sm leading-6 text-gray-500">
            Click &quot;Add entry&quot; to start tracking your activities.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-195 border-collapse">
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
              {activities.map((act, index) => (
                <tr
                  key={act.id}
                  onClick={() => openEdit(act)}
                  className={`cursor-pointer border-t border-gray-200 align-top transition hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {act.number}
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    <div className="line-clamp-2 min-h-10">{act.activity}</div>
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {act.date}
                  </td>

                  <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-900">
                    <span
                      className="inline-flex min-w-25 justify-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{
                        backgroundColor:
                          ACTIVITY_STATUS_COLORS[act.status] ?? "#6b7280",
                      }}
                    >
                      {act.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="15 line-clamp-3">{act.notes || "—"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddActivityModal
        key={selectedAct?.id ?? "new"}
        open={modalOpen}
        onClose={closeModal}
        onSave={selectedAct ? handleEdit : handleAdd}
        onDelete={selectedAct ? () => handleDelete(selectedAct.id) : undefined}
        initialData={selectedAct}
      />
    </div>
  );
}
