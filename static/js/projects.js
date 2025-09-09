// Strict yyyy/mm/dd parser
function parseYMD(s) {
  const m = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(s);
  if (!m) throw new Error(`Invalid date format: ${s} (expected yyyy/mm/dd)`);
  const y = Number(m[1]), mo = Number(m[2]) - 1, d = Number(m[3]);
  return new Date(y, mo, d);
}

function fmtDateYMD(s) {
  const dt = parseYMD(s);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const day = String(dt.getDate()).padStart(2, "0");
  return `${months[dt.getMonth()]} ${day}, ${dt.getFullYear()}`;
}

function esc(s) {
  const div = document.createElement("div");
  div.textContent = s ?? "";
  return div.innerHTML;
}

function projectItemHTML(p) {
  const bg = `style="background-image: url('${esc(p.image)}');"`;
  const href = esc(p.href);
  const title = esc(p.title);
  const date = fmtDateYMD(p.date);
  const summary = esc(p.summary);
  return `
    <div class="w-dyn-item">
      <div class="post-wrapper">
        <div class="post-content">
          <div class="w-row">
            <div class="w-col w-col-4 w-col-medium-4">
              <a class="blog-image w-inline-block" href="${href}" ${bg} target="_blank" rel="noopener"></a>
            </div>
            <div class="w-col w-col-8 w-col-medium-8">
              <a class="blog-title-link w-inline-block" href="${href}" target="_blank" rel="noopener">
                <h2 class="blog-title">${title}</h2>
              </a>
              <div class="details-wrapper">
                <div class="post-info">Posted: ${date}</div>
              </div>
              <div class="post-summary-wrapper">
                <h4 class="post-summary">${summary}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function setLoading(el) {
  el.innerHTML = `
    <div class="text-muted small">Loading projects...</div>
  `;
}

function setError(el, msg) {
  el.innerHTML = `
    <div class="alert alert-danger" role="alert">
      Failed to load projects: ${esc(msg)}
    </div>
  `;
}

async function loadProjects() {
  const root = document.getElementById("projects-list");
  if (!root) return;
  setLoading(root);

  try {
    const res = await fetch("./projects.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const items = await res.json();

    // Validate minimally and drop bad rows
    const valid = items.filter(p => {
      try { parseYMD(p.date); return p.title && p.href && p.summary; }
      catch { return false; }
    });

    valid.sort((a, b) => parseYMD(b.date) - parseYMD(a.date));
    root.innerHTML = valid.map(projectItemHTML).join("");

    if (valid.length === 0) {
      root.innerHTML = `<div class="text-muted small">No projects to display.</div>`;
    }
  } catch (err) {
    setError(root, err.message || String(err));
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
