import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  ApplicationStatus,
  JobApplication,
} from "../../data/applications";
import { APPLICATION_STATUS_COLORS } from "../../data/applications";

type ApplicationFormData = Omit<JobApplication, "id" | "number">;

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (application: ApplicationFormData) => void;
  onDelete?: () => void;
  initialData?: JobApplication;
};

const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const EMPTY_FORM: ApplicationFormData = {
  company: "",
  role: "",
  date: "",
  status: "Applied",
  notes: "",
};

export default function AddApplicationModal({
  open,
  onClose,
  onSave,
  onDelete,
  initialData,
}: Props) {
  const isEditing = !!initialData;

  const initialForm: ApplicationFormData = initialData
    ? {
        company: initialData.company,
        role: initialData.role,
        date: initialData.date,
        status: initialData.status,
        notes: initialData.notes,
      }
    : EMPTY_FORM;

  const [form, setForm] = useState<ApplicationFormData>(initialForm);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function updateField<K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.company.trim() || !form.role.trim() || !form.date.trim()) return;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(form.date)) {
      window.alert("Please use the date format YYYY-MM-DD, e.g. 2026-04-12.");
      return;
    }

    onSave({
      company: form.company.trim(),
      role: form.role.trim(),
      date: form.date.trim(),
      status: form.status,
      notes: form.notes.trim(),
    });

    onClose();
  }

  function handleDelete() {
    if (!onDelete) return;

    const confirmed = window.confirm(`Remove ${form.company} — ${form.role}?`);
    if (!confirmed) return;

    onDelete();
    onClose();
  }

  if (!open) return null;

  const isSaveDisabled =
    !form.company.trim() || !form.role.trim() || !form.date.trim();

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-end justify-center bg-black/45 px-4 py-6 sm:items-center"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
      >
        <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-gray-300 sm:hidden" />

        <div className="max-h-[90vh] overflow-y-auto px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2
              id="application-modal-title"
              className="text-xl font-bold text-gray-900"
            >
              {isEditing ? "Edit Application" : "New Application"}
            </h2>

            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Delete
              </button>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="application-company"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Company *
              </label>
              <input
                id="application-company"
                type="text"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="application-role"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Role *
              </label>
              <input
                id="application-role"
                type="text"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="application-date"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Date *
              </label>
              <input
                id="application-date"
                type="text"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                placeholder="YYYY-MM-DD"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <span className="mb-2 block text-sm font-semibold text-gray-800">
                Status
              </span>

              <div className="flex flex-wrap gap-2">
                {APPLICATION_STATUSES.map((status) => {
                  const isActive = form.status === status;

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => updateField("status", status)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor:
                                APPLICATION_STATUS_COLORS[status] ?? "#6b7280",
                            }
                          : undefined
                      }
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="application-notes"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Notes
              </label>
              <textarea
                id="application-notes"
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Any extra details..."
                rows={5}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaveDisabled}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
