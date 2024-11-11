// loadHTML.js
function includeHTML() {
    const elements = document.querySelectorAll("[data-include-html]");
    elements.forEach(function(element) {
        const file = element.getAttribute("data-include-html");
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error('Error loading ' + file);
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute("data-include-html");
                    highlightActiveLink();
                })
                .catch(error => console.error(error));
        }
    });
}

// Function to highlight the active link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            link.classList.add('w--current');
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);

