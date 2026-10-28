
//fon navigation

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");
    menuIcon.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
        menuIcon.setAttribute("aria-label", "Open menu");
    });
});


// tempat on off dark mode

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const html = document.documentElement;

function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (theme === "dark") {
        themeIcon.className = "bx bx-sun";
        themeLabel.textContent = "Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
        themeIcon.className = "bx bx-moon";
        themeLabel.textContent = "Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
}
}


let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {

}

const preferredTheme = window.matchMedia &&
 window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

applyTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

try {
        localStorage.setItem("portfolio-theme", newTheme);
    } catch (error) {
        
    }
});


// utk navi scroll

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
});

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
     );
    });
});

// utk job title

const jobTitle = document.querySelector(".text-animation span");

const titles = [
    "Multimedia Computing Student",
    "UI/UX Design Enthusiast",
    "Game Development Learner"
];

let titleIndex = 0;

function changeTitle() {
if (!jobTitle) return;

    jobTitle.textContent = titles[titleIndex];
titleIndex = (titleIndex + 1) % titles.length;
}

changeTitle();
setInterval(changeTitle, 2500);

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

const name = document.querySelector("#contact-name").value.trim();
const email = document.querySelector("#contact-email").value.trim();
const phone = document.querySelector("#contact-phone").value.trim();
const subject = document.querySelector("#contact-subject").value.trim();
const message = document.querySelector("#contact-message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please complete all required fields.");
        return;
    }

    const recipient = "nathanaelhardineleston2001@gmail.com";

    const emailSubject = encodeURIComponent(subject);
const emailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || "Not provided"}\n\n` +
        `Message:\n${message}`
    );

window.location.href =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});
