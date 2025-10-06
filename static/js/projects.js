function parseYMD(s) {
  const m = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(s || "");
  if (!m) throw new Error(`Invalid date format: ${s} (expected yyyy/mm/dd)`);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d);
}

function fmtDateYMD(s) {
  const dt = parseYMD(s);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = String(dt.getDate()).padStart(2, "0");
  return `${months[dt.getMonth()]} ${day}, ${dt.getFullYear()}`;
}

function esc(s) {
  const div = document.createElement("div");
  div.textContent = s == null ? "" : String(s);
  return div.innerHTML;
}

function safeTagName(tag) {
  return /^[a-zA-Z][a-zA-Z0-9-]*$/.test(tag) ? tag : "p";
}

function setLoading(el, text) {
  el.innerHTML = `<div class="text-muted small">${esc(text || "Loading...")}</div>`;
}

function setEmpty(el, text) {
  el.innerHTML = `<div class="text-muted small">${esc(text || "Nothing to display.")}</div>`;
}

function setError(el, msg) {
  el.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${esc(msg)}
    </div>
  `;
}

function projectButtonsHTML(item, titleText) {
  const buttons = [];
  const website = (item.website || "").trim();
  const href = (item.href || "").trim();
  const isPrivate = item.private === true;
  const hasHref = Boolean(href);

  if (website) {
    const aria = esc(`View website for ${titleText}`);
    buttons.push(
      `<a class="btn btn-primary btn-sm mr-2 mb-2" href="${esc(website)}" target="_blank" rel="noopener" aria-label="${aria}">View Website</a>`
    );
  }

  if (isPrivate) {
    const aria = esc(`Learn why ${titleText} codebase is private`);
    buttons.push(
      `<button type="button" class="btn btn-outline-secondary btn-sm mr-2 mb-2" onclick="handlePrivateClick(event)" aria-label="${aria}">Private Codebase</button>`
    );
  }
  
  if (hasHref) {
    const aria = esc(`View codebase for ${titleText}`);
    buttons.push(
      `<a class="btn btn-outline-secondary btn-sm mr-2 mb-2" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${aria}">View Codebase</a>`
    );
  }

  if (buttons.length === 0) return "";

  return `<div class="mt-3 d-flex flex-wrap">${buttons.join("")}</div>`;
}

function projectCardHTML(item, config) {
  const bgAttr = item.image ? ` style="background-image: url('${esc(item.image)}');"` : "";
  const title = esc(item.title);
  const date = fmtDateYMD(item.date);
  const summary = esc(item.summary);
  const summaryTag = safeTagName(config.summaryTag || "h4");
  const buttons = projectButtonsHTML(item, item.title || "");

  return `
    <div class="w-dyn-item">
      <div class="post-wrapper">
        <div class="post-content">
          <div class="w-row">
            <div class="w-col w-col-4 w-col-medium-4">
              <div class="blog-image w-inline-block"${bgAttr}></div>
            </div>
            <div class="w-col w-col-8 w-col-medium-8">
              <div class="blog-title-link w-inline-block">
                <h2 class="blog-title">${title}</h2>
              </div>
              <div class="details-wrapper">
                <div class="post-info">Posted: ${date}</div>
              </div>
              <div class="post-summary-wrapper">
                <${summaryTag} class="post-summary">${summary}</${summaryTag}>
              </div>
              ${buttons}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function defaultCardHTML(item, config) {
  const bgAttr = item.image ? ` style="background-image: url('${esc(item.image)}');"` : "";
  const href = esc(item.href);
  const title = esc(item.title);
  const date = fmtDateYMD(item.date);
  const summary = esc(item.summary);
  const summaryTag = safeTagName(config.summaryTag || "h4");
  const linkTarget = config.linkTarget;
  const targetAttr = linkTarget ? ` target="${esc(linkTarget)}"` : "";
  const relValue = config.linkRel || (linkTarget === "_blank" ? "noopener" : "");
  const relAttr = relValue ? ` rel="${esc(relValue)}"` : "";

  return `
    <div class="w-dyn-item">
      <div class="post-wrapper">
        <div class="post-content">
          <div class="w-row">
            <div class="w-col w-col-4 w-col-medium-4">
              <a class="blog-image w-inline-block" href="${href}"${targetAttr}${relAttr}${bgAttr}></a>
            </div>
            <div class="w-col w-col-8 w-col-medium-8">
              <a class="blog-title-link w-inline-block" href="${href}"${targetAttr}${relAttr}>
                <h2 class="blog-title">${title}</h2>
              </a>
              <div class="details-wrapper">
                <div class="post-info">Posted: ${date}</div>
              </div>
              <div class="post-summary-wrapper">
                <${summaryTag} class="post-summary">${summary}</${summaryTag}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function cardItemHTML(item, config) {
  if (config.template === "project") {
    return projectCardHTML(item, config);
  }
  return defaultCardHTML(item, config);
}

function getConfig(el) {
  return {
    source: el.dataset.cardSource,
    summaryTag: el.dataset.cardSummaryTag,
    linkTarget: el.dataset.cardLinkTarget || "_blank",
    linkRel: el.dataset.cardLinkRel,
    loadingText: el.dataset.cardLoadingText,
    emptyText: el.dataset.cardEmptyText,
    sort: (el.dataset.cardSort || "desc").toLowerCase(),
    template: (el.dataset.cardTemplate || "default").toLowerCase()
  };
}

function isValidCardItem(item, template) {
  try {
    if (!item || !item.title || !item.summary || !item.date || !item.image) {
      return false;
    }
    parseYMD(item.date);
    if (template !== "project" && !item.href) {
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Skipping invalid item", item, err);
    return false;
  }
}

function sortItems(items, direction) {
  if (direction === "none") return items;
  if (direction === "asc") {
    return [...items].sort((a, b) => parseYMD(a.date) - parseYMD(b.date));
  }
  return [...items].sort((a, b) => parseYMD(b.date) - parseYMD(a.date));
}

async function loadCardList(el) {
  const config = getConfig(el);
  if (!config.source) {
    setError(el, "Missing data-card-source attribute");
    return;
  }

  setLoading(el, config.loadingText || "Loading projects...");

  try {
    const res = await fetch(config.source, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response payload");
    }

    const valid = data.filter(item => isValidCardItem(item, config.template));

    const sorted = sortItems(valid, config.sort);

    if (sorted.length === 0) {
      setEmpty(el, config.emptyText || "No items to display.");
      return;
    }

    el.innerHTML = sorted.map(item => cardItemHTML(item, config)).join("");
  } catch (err) {
    const message = `Failed to load cards: ${err.message || err}`;
    setError(el, message);
    alert(message);
  }
}

function initDynamicCardLists() {
  const lists = document.querySelectorAll("[data-card-source]");
  lists.forEach(list => { loadCardList(list); });
}

let privateModalInjected = false;

function ensurePrivateModal() {
  if (privateModalInjected) return;
  if (document.getElementById("privateModal")) {
    privateModalInjected = true;
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="modal fade" id="privateModal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="privateModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="privateModalLabel">Private Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            This project's codebase is private due to confidentiality.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;

  const modal = wrapper.firstElementChild;
  if (modal) {
    document.body.appendChild(modal);
    privateModalInjected = true;
  }
}

function showPrivateModal() {
  ensurePrivateModal();

  if (window.jQuery && typeof window.jQuery.fn.modal === "function") {
    window.jQuery("#privateModal").modal("show");
    return;
  }

  if (typeof window.bootstrap !== "undefined" && typeof window.bootstrap.Modal === "function") {
    const modalEl = document.getElementById("privateModal");
    if (modalEl) {
      const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
      return;
    }
  }

  alert("This project's codebase is private due to confidentiality.");
}

function handlePrivateClick(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }
  showPrivateModal();
}

window.handlePrivateClick = handlePrivateClick;

document.addEventListener("DOMContentLoaded", () => {
  ensurePrivateModal();
  initDynamicCardLists();
});
