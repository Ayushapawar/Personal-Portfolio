// Technical Skills Array
const skills = [
  "Java",
  "SQL",
  "Git",
  "HTML",
  "CSS",
  "Reactjs",
  "AI",
  "JavaScript",
  "Python"
];

// Mapping skills to FontAwesome icons
const skillIcons = {
  "Java": "fa-brands fa-java",
  "SQL": "fa-solid fa-database",
  "Git": "fa-brands fa-git-alt",
  "HTML": "fa-brands fa-html5",
  "CSS": "fa-brands fa-css3-alt",
  "JavaScript": "fa-brands fa-js",
  "Python": "fa-brands fa-python",
  "Reactjs": "fa-brands fa-react",
  "AI": "fa-solid fa-robot"
};

// DOM Elements
const skillsGrid = document.getElementById("skills-grid");
const showAllBtn = document.getElementById("show-all");
const filterProgrammingBtn = document.getElementById("filter-programming");
const contactForm = document.getElementById("contact-form");
const navToggle = document.getElementById("nav-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

/* --- 1. Dynamic Skills Rendering & Filtering --- */

// Function to render skills to the grid
function renderSkills(skillsList) {
  skillsGrid.innerHTML = "";

  if (skillsList.length === 0) {
    skillsGrid.innerHTML = `<div class="no-skills">No skills match the selected filter.</div>`;
    return;
  }

  skillsList.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.setAttribute("data-skill", skill);

    // Get corresponding icon or fallback to default
    const iconClass = skillIcons[skill] || "fa-solid fa-screwdriver-wrench";

    card.innerHTML = `
      <div class="skill-icon-box">
        <i class="${iconClass}"></i>
      </div>
      <span>${skill}</span>
    `;

    skillsGrid.appendChild(card);
  });
}

// Programming languages definition
// Filters Java and JavaScript (plus Python if ever added)
const programmingLanguages = ["Java", "JavaScript", "Python"];

// Filter event handlers
filterProgrammingBtn.addEventListener("click", () => {
  filterProgrammingBtn.classList.add("active");
  showAllBtn.classList.remove("active");

  // Filter the array
  const filtered = skills.filter(skill => programmingLanguages.includes(skill));
  renderSkills(filtered);
});

showAllBtn.addEventListener("click", () => {
  showAllBtn.classList.add("active");
  filterProgrammingBtn.classList.remove("active");

  renderSkills(skills);
});

/* --- 2. Mobile Responsive Navigation --- */

// Toggle mobile menu
navToggle.addEventListener("click", () => {
  navbar.classList.toggle("open");
  const icon = navToggle.querySelector("i");
  if (navbar.classList.contains("open")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

// Close mobile menu when nav link clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    navToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

/* --- 3. Scroll Spy (Highlight active nav link on scroll) --- */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  // Header scroll appearance
  if (window.scrollY > 50) {
    header.style.padding = "0.5rem 0";
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
  } else {
    header.style.padding = "0";
    header.style.boxShadow = "none";
  }

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset standard scroll position for accuracy
    if (window.scrollY >= (sectionTop - 150)) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* --- 4. Form Validation & Submission --- */

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formFeedback = document.getElementById("form-feedback");
const submitBtn = document.getElementById("contact-submit");

// Simple email regex validation
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Reset error state
function clearErrors() {
  const groups = document.querySelectorAll(".form-group");
  groups.forEach(group => group.classList.remove("error"));
  formFeedback.style.display = "none";
  formFeedback.className = "form-feedback";
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let hasErrors = false;

  // Name Validation
  if (nameInput.value.trim() === "") {
    nameInput.closest(".form-group").classList.add("error");
    hasErrors = true;
  }

  // Email Validation
  if (!validateEmail(emailInput.value.trim())) {
    emailInput.closest(".form-group").classList.add("error");
    hasErrors = true;
  }

  // Message Validation
  if (messageInput.value.trim() === "") {
    messageInput.closest(".form-group").classList.add("error");
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  // Simulated success feedback
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Show success message
    formFeedback.innerHTML = `Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been sent successfully.`;
    formFeedback.className = "form-feedback success";
    formFeedback.style.display = "block";

    // Clear form fields
    contactForm.reset();
  }, 1200);
});

// Initial skills render on load
document.addEventListener("DOMContentLoaded", () => {
  renderSkills(skills);
});
