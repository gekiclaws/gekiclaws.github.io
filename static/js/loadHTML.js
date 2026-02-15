// loadHTML.js
function includeHTML() {
    const elements = document.querySelectorAll("[data-include-html]");
    const fetchPromises = []; // Keep track of all fetch operations

    elements.forEach(function (element) {
        const file = element.getAttribute("data-include-html");
        if (file) {
            const fetchPromise = fetch(file)
                .then((response) => {
                    if (response.ok) return response.text();
                    throw new Error("Error loading " + file);
                })
                .then((data) => {
                    element.innerHTML = data;
                    element.removeAttribute("data-include-html");
                })
            fetchPromises.push(fetchPromise); // Add the promise to the list
        }
    });

    Promise.all(fetchPromises).then(() => {
        highlightActiveLink(); // Ensure all HTML injection is complete before highlighting links
        loadWebflowScript(); // Dynamically load Webflow script after injection is done
    });
}

// Function to highlight the active link
function highlightActiveLink() {
    const navLinks = Array.from(document.querySelectorAll("nav a"));
    const current = normalizePath(window.location.pathname);

    // Pick the best match (longest prefix). Special-case "/" so it doesn't always win.
    let best = null;
    let bestLen = -1;
    for (const link of navLinks) {
        const rawHref = link.getAttribute("href") || "";
        if (!rawHref || /^https?:\/\//i.test(rawHref)) continue;

        const hrefPath = normalizePath(new URL(rawHref, window.location.origin).pathname);
        const isRoot = hrefPath === "/";
        const matches =
            (!isRoot && (current === hrefPath || current.startsWith(hrefPath))) ||
            (isRoot && (current === "/" || current === "/index.html"));

        if (!matches) continue;
        if (hrefPath.length > bestLen) {
            best = link;
            bestLen = hrefPath.length;
        }
    }

    if (best) best.classList.add("w--current");
}

function normalizePath(p) {
    let s = (p || "").trim();
    if (!s.startsWith("/")) s = "/" + s;
    // Normalize "/archive/index.html" or "/archive.html" -> "/archive/"
    if (s.endsWith("/index.html")) s = s.slice(0, -("index.html".length));
    // Ensure trailing slash for non-root paths
    if (s !== "/" && !s.endsWith("/")) s += "/";
    return s;
}

// Function to dynamically load the Webflow JS after injection
function loadWebflowScript() {
    const script = document.createElement("script");
    // Root-relative so this works from subpaths like /archive/
    script.src = "/static/js/webflow.5b0765584.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", includeHTML);
