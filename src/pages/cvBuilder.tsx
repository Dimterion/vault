import { useEffect, useRef, useState } from "react";
import SectionHeader from "../features/cv/SectionHeader";
import {
  type CvData,
  type EducationEntry,
  type WorkEntry,
  EMPTY_CV,
  loadCv,
  makeEducationEntry,
  makeWorkEntry,
  saveCv,
} from "../features/cv/data";
import { exportCvPdf } from "../utils/exportPdf";

type SectionKey =
  | "personal"
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "links";

export default function CvBuilderPage() {
  const [cv, setCv] = useState<CvData>(EMPTY_CV);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    personal: true,
    summary: false,
    skills: false,
    experience: false,
    education: false,
    links: false,
  });

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadCv().then((data) => {
      setCv(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  function updateCv(patch: Partial<CvData>) {
    const updated = { ...cv, ...patch };
    setCv(updated);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveCv(updated);
    }, 600);
  }

  function toggleSection(key: SectionKey) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function addExperience() {
    const entry = makeWorkEntry({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    updateCv({ experience: [...cv.experience, entry] });
  }

  function updateExperience(id: string, patch: Partial<WorkEntry>) {
    updateCv({
      experience: cv.experience.map((e) =>
        e.id === id ? { ...e, ...patch } : e,
      ),
    });
  }

  function removeExperience(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this experience entry? This cannot be undone.",
    );
    if (!confirmed) return;

    updateCv({ experience: cv.experience.filter((e) => e.id !== id) });
  }

  function addEducation() {
    const entry = makeEducationEntry({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    updateCv({ education: [...cv.education, entry] });
  }

  function updateEducation(id: string, patch: Partial<EducationEntry>) {
    updateCv({
      education: cv.education.map((e) =>
        e.id === id ? { ...e, ...patch } : e,
      ),
    });
  }

  function removeEducation(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this education entry? This cannot be undone.",
    );
    if (!confirmed) return;

    updateCv({ education: cv.education.filter((e) => e.id !== id) });
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-[#f5f7fb]">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your changes are saved automatically.
          </p>
        </div>

        <SectionHeader
          title="Personal Info"
          expanded={expanded.personal}
          onToggle={() => toggleSection("personal")}
        />
        {expanded.personal && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <Field
              label="Full Name"
              value={cv.name}
              onChange={(v) => updateCv({ name: v })}
              placeholder="e.g. Jane Smith"
            />
            <Field
              label="Job Title"
              value={cv.title}
              onChange={(v) => updateCv({ title: v })}
              placeholder="e.g. Frontend Developer"
            />
            <Field
              label="Email"
              value={cv.email}
              onChange={(v) => updateCv({ email: v })}
              placeholder="e.g. jane@email.com"
              type="email"
            />
            <Field
              label="Phone"
              value={cv.phone}
              onChange={(v) => updateCv({ phone: v })}
              placeholder="e.g. +33 6 12 34 56 78"
              type="tel"
            />
            <Field
              label="Address"
              value={cv.address}
              onChange={(v) => updateCv({ address: v })}
              placeholder="e.g. Paris, France"
              last
            />
          </div>
        )}

        <SectionHeader
          title="Summary"
          expanded={expanded.summary}
          onToggle={() => toggleSection("summary")}
        />
        {expanded.summary && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <Field
              label="Summary"
              value={cv.summary}
              onChange={(v) => updateCv({ summary: v })}
              placeholder="A brief description of yourself..."
              multiline
              last
            />
          </div>
        )}

        <SectionHeader
          title="Skills"
          expanded={expanded.skills}
          onToggle={() => toggleSection("skills")}
        />
        {expanded.skills && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <Field
              label="Skills"
              value={cv.skills}
              onChange={(v) => updateCv({ skills: v })}
              placeholder="e.g. React, TypeScript, Node.js"
              multiline
              last
            />
          </div>
        )}

        <SectionHeader
          title="Work Experience"
          expanded={expanded.experience}
          onToggle={() => toggleSection("experience")}
        />
        {expanded.experience && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            {cv.experience.map((entry) => (
              <div
                key={entry.id}
                className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="flex-1 text-sm font-semibold text-gray-900">
                    {entry.role || "New Entry"}
                    {entry.company ? ` — ${entry.company}` : ""}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeExperience(entry.id)}
                    className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-800 transition hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>

                <Field
                  label="Company"
                  value={entry.company}
                  onChange={(v) => updateExperience(entry.id, { company: v })}
                  placeholder="e.g. Acme Corp"
                />
                <Field
                  label="Role"
                  value={entry.role}
                  onChange={(v) => updateExperience(entry.id, { role: v })}
                  placeholder="e.g. Frontend Developer"
                />
                <Field
                  label="Start Date"
                  value={entry.startDate}
                  onChange={(v) => updateExperience(entry.id, { startDate: v })}
                  placeholder="e.g. 01-2023"
                />
                <Field
                  label="End Date"
                  value={entry.endDate}
                  onChange={(v) => updateExperience(entry.id, { endDate: v })}
                  placeholder="e.g. 03-2026 or Present"
                />
                <Field
                  label="Description"
                  value={entry.description}
                  onChange={(v) =>
                    updateExperience(entry.id, { description: v })
                  }
                  placeholder="Key responsibilities and achievements..."
                  multiline
                  last
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full rounded-xl border border-dashed border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              + Add experience
            </button>
          </div>
        )}

        <SectionHeader
          title="Education"
          expanded={expanded.education}
          onToggle={() => toggleSection("education")}
        />
        {expanded.education && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            {cv.education.map((entry) => (
              <div
                key={entry.id}
                className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="flex-1 text-sm font-semibold text-gray-900">
                    {entry.degree || "New Entry"}
                    {entry.institution ? ` — ${entry.institution}` : ""}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeEducation(entry.id)}
                    className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-800 transition hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>

                <Field
                  label="Institution"
                  value={entry.institution}
                  onChange={(v) =>
                    updateEducation(entry.id, { institution: v })
                  }
                  placeholder="e.g. University of Paris"
                />
                <Field
                  label="Degree"
                  value={entry.degree}
                  onChange={(v) => updateEducation(entry.id, { degree: v })}
                  placeholder="e.g. BSc Computer Science"
                />
                <Field
                  label="Start Date"
                  value={entry.startDate}
                  onChange={(v) => updateEducation(entry.id, { startDate: v })}
                  placeholder="e.g. 09-2019"
                />
                <Field
                  label="End Date"
                  value={entry.endDate}
                  onChange={(v) => updateEducation(entry.id, { endDate: v })}
                  placeholder="e.g. 06-2022 or Present"
                />
                <Field
                  label="Description"
                  value={entry.description}
                  onChange={(v) =>
                    updateEducation(entry.id, { description: v })
                  }
                  placeholder="Relevant coursework, achievements..."
                  multiline
                  last
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full rounded-xl border border-dashed border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              + Add education
            </button>
          </div>
        )}

        <SectionHeader
          title="Links"
          expanded={expanded.links}
          onToggle={() => toggleSection("links")}
        />
        {expanded.links && (
          <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <Field
              label="LinkedIn"
              value={cv.linkedin}
              onChange={(v) => updateCv({ linkedin: v })}
              placeholder="https://linkedin.com/in/yourname"
              type="url"
            />
            <Field
              label="GitHub"
              value={cv.github}
              onChange={(v) => updateCv({ github: v })}
              placeholder="https://github.com/yourname"
              type="url"
            />
            <Field
              label="Website"
              value={cv.website}
              onChange={(v) => updateCv({ website: v })}
              placeholder="https://yoursite.com"
              type="url"
              last
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => exportCvPdf(cv)}
          className="mt-2 w-full rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
  last?: boolean;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  type = "text",
  last,
}: FieldProps) {
  return (
    <div className={last ? "" : "mb-3.5"}>
      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="min-h-22.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoCapitalize={
            type === "email" || type === "url" ? "none" : "sentences"
          }
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      )}
    </div>
  );
}
