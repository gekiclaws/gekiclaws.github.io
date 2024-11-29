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
                .catch((error) => console.error(error));
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
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
        if (window.location.pathname.includes(link.getAttribute("href"))) {
            link.classList.add("w--current");
        }
    });
}

// Function to dynamically load the Webflow JS after injection
function loadWebflowScript() {
    // console.log("Loading Webflow script...");
    const script = document.createElement("script");
    script.src = "./resources/webflow.5b0765584.js"; // Update the path as needed
    script.type = "text/javascript";
    // script.onload = () => console.log("Webflow script successfully loaded.");
    // script.onerror = (err) => console.error("Failed to load Webflow script:", err);
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", includeHTML);