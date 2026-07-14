import type { CvData } from "../assets/data/cv";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function optional(value: string, render: (v: string) => string): string {
  return value.trim() ? render(value.trim()) : "";
}

function buildHtml(cv: CvData): string {
  const skills = cv.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const experienceHtml = cv.experience
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${escapeHtml(e.role)}</span>
          <span class="entry-meta">${escapeHtml(e.company)}${
            e.startDate || e.endDate
              ? ` &nbsp;·&nbsp; ${escapeHtml(e.startDate)} – ${escapeHtml(e.endDate)}`
              : ""
          }</span>
        </div>
        ${optional(e.description, (d) => `<p class="entry-desc">${escapeHtml(d)}</p>`)}
      </div>`,
    )
    .join("");

  const educationHtml = cv.education
    .map(
      (e) => `
      <div class="entry">
        <div class="entry-header">
          <span class="entry-title">${escapeHtml(e.degree)}</span>
          <span class="entry-meta">${escapeHtml(e.institution)}${
            e.startDate || e.endDate
              ? ` &nbsp;·&nbsp; ${escapeHtml(e.startDate)} – ${escapeHtml(e.endDate)}`
              : ""
          }</span>
        </div>
        ${optional(e.description, (d) => `<p class="entry-desc">${escapeHtml(d)}</p>`)}
      </div>`,
    )
    .join("");

  const links = [
    cv.linkedin && `<a href="${escapeHtml(cv.linkedin)}">LinkedIn</a>`,
    cv.github && `<a href="${escapeHtml(cv.github)}">GitHub</a>`,
    cv.website && `<a href="${escapeHtml(cv.website)}">Website</a>`,
  ]
    .filter(Boolean)
    .join(" &nbsp;·&nbsp; ");

  const contactLine = [cv.email, cv.phone, cv.address]
    .map((v) => v.trim())
    .filter(Boolean)
    .map(escapeHtml)
    .join(" &nbsp;·&nbsp; ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CV Export</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 11pt;
      color: #111;
      padding: 48px 56px;
      max-width: 780px;
      margin: 0 auto;
      line-height: 1.5;
      background: #fff;
    }
    .header { margin-bottom: 20px; }
    .header h1 { font-size: 22pt; font-weight: bold; margin-bottom: 2px; }
    .header .job-title { font-size: 12pt; color: #444; margin-bottom: 8px; }
    .header .contact { font-size: 9.5pt; color: #555; }
    .header .links { font-size: 9.5pt; margin-top: 4px; }
    .header .links a { color: #1a0dab; text-decoration: none; }
    hr { border: none; border-top: 1px solid #ccc; margin: 16px 0; }
    .section { margin-bottom: 20px; }
    .section-title {
      font-size: 10.5pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #111;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
    }
    .skills { font-size: 10.5pt; line-height: 1.6; }
    .summary { font-size: 10.5pt; line-height: 1.6; color: #222; }
    .entry { margin-bottom: 14px; }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
      gap: 12px;
    }
    .entry-title { font-weight: bold; font-size: 10.5pt; }
    .entry-meta { font-size: 9.5pt; color: #555; text-align: right; }
    .entry-desc { font-size: 10pt; color: #333; margin-top: 3px; line-height: 1.5; }

    @media print {
      body { padding: 24px 32px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(cv.name || "Your Name")}</h1>
    ${optional(cv.title, (t) => `<div class="job-title">${escapeHtml(t)}</div>`)}
    ${contactLine ? `<div class="contact">${contactLine}</div>` : ""}
    ${links ? `<div class="links">${links}</div>` : ""}
  </div>

  <hr />

  ${optional(
    cv.summary,
    () => `
    <div class="section">
      <div class="section-title">Summary</div>
      <p class="summary">${escapeHtml(cv.summary)}</p>
    </div>
    <hr />`,
  )}

  ${
    skills.length > 0
      ? `
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="skills">${skills.map(escapeHtml).join(" &nbsp;·&nbsp; ")}</div>
    </div>
    <hr />`
      : ""
  }

  ${
    cv.experience.length > 0
      ? `
    <div class="section">
      <div class="section-title">Work Experience</div>
      ${experienceHtml}
    </div>
    <hr />`
      : ""
  }

  ${
    cv.education.length > 0
      ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${educationHtml}
    </div>`
      : ""
  }
</body>
</html>`;
}

export async function exportCvPdf(cv: CvData): Promise<void> {
  if (!cv.name.trim()) {
    window.alert("Please enter your name before exporting.");
    return;
  }

  const html = buildHtml(cv);
  const printWindow = window.open("", "_blank", "width=900,height=1200");

  if (!printWindow) {
    window.alert("Pop-up blocked. Please allow pop-ups to export the CV.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 250);
}
