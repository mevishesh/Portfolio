// ===== Default data (first time load) =====
const defaultData = {
    "name": "Vishesh Waghmore",
    "role": "Student",
    "about": "I am a passionate student who loves building web apps, solving problems, and exploring new technologies.",
    "location": "Pune, Maharashtra, India",
    "email": "visheshwaghmore01@gmail.com",
    "phone": "+91-8149365202",
    "avatarUrl": "photo.jpg",
    "resumeUrl": "VISHESH_RESUME.pdf",
    "skills": [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "C",
        "C++",
        "Java",
        "Cloud Computing",
        "Cyber Security",
        "Mobile Application Development"
    ],
    "skillMeters": [
        {
            "label": "Frontend",
            "level": 80
        },
        {
            "label": "Backend",
            "level": 60
        },
        {
            "label": "Databases",
            "level": 55
        },
        {
            "label": "Python / Scripts",
            "level": 75
        }
    ],
    "education": [
        {
            "degree": "Diploma In Computer Engineering",
            "school": "Government Polytechnic Pune",
            "year": "2023-2026",
            "details": ""
        }
    ],
    "projects": [
        {
            "title": "Smart & Secure Attendance System",
            "tech": [
                "Python",
                "OpenCV",
                "SQLite"
            ],
            "description": "Face recognition-based attendance system with admin panel and notification features.",
            "github": "",
            "liveDemo": ""
        }
    ],
    "social": {
        "github": "https://github.com/mevishesh",
        "linkedin": "https://www.linkedin.com/in/vishesh-waghmore-5588372b2/",
        "instagram": "https://www.instagram.com/visheshwaghmore/",
        "twitter": ""
    }
};

// ---- Safe clone (avoid structuredClone) ----
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// ===== Load + Save from localStorage (for data) =====
function loadData() {
    try {
        const stored = localStorage.getItem("portfolioData");
        if (stored) {
            const parsed = JSON.parse(stored);
            // Merge with defaults so new fields don't break old data
            return Object.assign(deepClone(defaultData), parsed);
        }
    } catch (e) {
        console.error("Error reading localStorage", e);
    }
    return deepClone(defaultData);
}

function saveData() {
    try {
        localStorage.setItem("portfolioData", JSON.stringify(data));
    } catch (e) {
        console.error("Error saving to localStorage", e);
    }
}

// Data object
let data = loadData();

// ===== Helpers =====
function byId(id) {
    return document.getElementById(id);
}

function createEl(tag, className = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

// ===== Theme handling =====
function getSavedTheme() {
    try {
        return localStorage.getItem("portfolioTheme") || "dark";
    } catch {
        return "dark";
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem("portfolioTheme", theme);
    } catch { }
}

function applyTheme(theme) {
    const body = document.body;
    const icon = byId("themeIcon");
    if (theme === "light") {
        body.classList.add("theme-light");
        icon.textContent = "☀️";
    } else {
        body.classList.remove("theme-light");
        icon.textContent = "🌙";
    }
}

// ===== Typing effect =====
function startTypingEffect() {
    const el = byId("heroRole");
    const text = data.role || "";
    let idx = 0;
    let deleting = false;

    function tick() {
        if (!el) return;
        if (!deleting) {
            el.textContent = text.slice(0, idx + 1);
            idx++;
            if (idx === text.length) {
                setTimeout(() => {
                    deleting = true;
                }, 1500);
            }
        } else {
            el.textContent = text.slice(0, idx - 1);
            idx--;
            if (idx === 0) {
                deleting = false;
            }
        }
        const delay = deleting ? 60 : 100;
        setTimeout(tick, delay);
    }

    tick();
}

// ===== Rendering =====
function renderBasic() {
    byId("navName").textContent = data.name;
    byId("heroName").textContent = data.name;
    byId("heroNameCard").textContent = data.name;
    byId("heroRoleCard").textContent = data.role;
    // heroRole text controlled by typing effect

    byId("heroAbout").textContent = data.about;
    byId("aboutText").textContent = data.about;

    byId("heroLocation").textContent = data.location;
    byId("heroPhone").textContent = data.phone;
    byId("contactLocation").textContent = data.location;
    byId("contactPhone").textContent = data.phone;

    const heroEmail = byId("heroEmail");
    heroEmail.textContent = data.email;
    heroEmail.href = `mailto:${data.email}`;

    const contactEmail = byId("contactEmail");
    contactEmail.textContent = data.email;
    contactEmail.href = `mailto:${data.email}`;

    byId("footerYear").textContent = new Date().getFullYear();
    byId("footerName").textContent = data.name;

    // Avatar
    const avatarImg = byId("avatarImg");
    const avatarEmoji = byId("avatarEmoji");
    if (data.avatarUrl && data.avatarUrl.trim() !== "") {
        avatarImg.src = data.avatarUrl;
        avatarImg.style.display = "block";
        avatarEmoji.style.display = "none";
    } else {
        avatarImg.style.display = "none";
        avatarEmoji.style.display = "inline-block";
    }

    // Resume button
    const resumeBtn = byId("resumeBtn");
    if (data.resumeUrl && data.resumeUrl.trim() !== "") {
        resumeBtn.href = data.resumeUrl;
        resumeBtn.style.display = "inline-flex";
    } else {
        resumeBtn.style.display = "none";
    }

    // Quick contact buttons
    const quickMail = byId("quickMail");
    const quickWhatsApp = byId("quickWhatsApp");
    quickMail.href = `mailto:${data.email}`;
    const waNumber = data.phone.replace(/[^0-9]/g, "");
    if (waNumber) {
        quickWhatsApp.href = `https://wa.me/91${waNumber.slice(-10)}`;
    } else {
        quickWhatsApp.href = "#";
    }
}

function renderSkills() {
    const skillsList = byId("skillsList");
    skillsList.innerHTML = "";
    data.skills.forEach((skill) => {
        const li = createEl("li", "chip");
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    const skillsEditable = byId("skillsEditable");
    skillsEditable.innerHTML = "";
    data.skills.forEach((skill, index) => {
        const li = createEl("li", "chip");
        li.textContent = skill;
        li.title = "Click to remove";
        li.addEventListener("click", () => {
            if (confirm(`Remove skill "${skill}"?`)) {
                data.skills.splice(index, 1);
                saveData();
                renderAll();
            }
        });
        skillsEditable.appendChild(li);
    });
}

function renderSkillMeters() {
    const container = byId("skillMeterList");
    container.innerHTML = "";
    const meters = data.skillMeters || [];
    meters.forEach((m) => {
        const card = createEl("div", "meter-card reveal");
        const top = createEl("div", "meter-top");
        const label = createEl("span");
        label.textContent = m.label;
        const val = createEl("span");
        val.textContent = (m.level || 0) + "%";
        top.appendChild(label);
        top.appendChild(val);

        const bar = createEl("div", "meter-bar");
        const fill = createEl("div", "meter-fill");
        fill.style.width = "0"; // start at 0, will animate when in view
        bar.appendChild(fill);

        card.appendChild(top);
        card.appendChild(bar);
        container.appendChild(card);
    });
}

function renderEducation() {
    const eduContainer = byId("educationList");
    eduContainer.innerHTML = "";
    data.education.forEach((edu) => {
        const item = createEl("div", "timeline-item reveal");
        const dot = createEl("div", "timeline-dot");
        const card = createEl("div", "timeline-card");

        const h3 = createEl("h3");
        h3.textContent = edu.degree;
        const school = createEl("p");
        school.innerHTML = `<strong>${edu.school}</strong>`;
        const year = createEl("p");
        year.textContent = edu.year;
        const details = createEl("p");
        details.textContent = edu.details;

        card.appendChild(h3);
        card.appendChild(school);
        card.appendChild(year);
        card.appendChild(details);

        item.appendChild(dot);
        item.appendChild(card);
        eduContainer.appendChild(item);
    });

    // Editable list
    const eduEditable = byId("eduEditable");
    eduEditable.innerHTML = "";
    data.education.forEach((edu, index) => {
        const li = createEl("li");
        const span = createEl("span");
        span.textContent = `${edu.degree} – ${edu.school} (${edu.year})`;
        const btn = createEl("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => {
            if (confirm("Delete this education entry?")) {
                data.education.splice(index, 1);
                saveData();
                renderAll();
            }
        });
        li.appendChild(span);
        li.appendChild(btn);
        eduEditable.appendChild(li);
    });
}

// ===== Project modal helpers =====
let currentProjectIndex = null;

function openProjectModal(index) {
    const modal = byId("projectModal");
    if (!data.projects[index]) return;
    const project = data.projects[index];

    byId("modalProjectTitle").textContent = project.title;
    byId("modalProjectTech").textContent =
        project.tech && project.tech.length ? project.tech.join(" • ") : "";
    byId("modalProjectDesc").textContent = project.description || "";

    const linksDiv = byId("modalProjectLinks");
    linksDiv.innerHTML = "";
    if (project.github) {
        const g = createEl("a");
        g.href = project.github;
        g.target = "_blank";
        g.rel = "noopener";
        g.textContent = "GitHub";
        linksDiv.appendChild(g);
    }
    if (project.liveDemo) {
        const l = createEl("a");
        l.href = project.liveDemo;
        l.target = "_blank";
        l.rel = "noopener";
        l.textContent = "Live Demo";
        linksDiv.appendChild(l);
    }

    modal.classList.remove("hidden");
    currentProjectIndex = index;
}

function closeProjectModal() {
    byId("projectModal").classList.add("hidden");
    currentProjectIndex = null;
}

function renderProjects() {
    const projContainer = byId("projectsList");
    projContainer.innerHTML = "";

    data.projects.forEach((project, index) => {
        const card = createEl("div", "card reveal");

        const title = createEl("h3");
        title.textContent = project.title;

        const tech = createEl("p", "muted");
        tech.textContent = project.tech && project.tech.length ? project.tech.join(" • ") : "";

        const desc = createEl("p");
        desc.textContent = project.description || "";

        const linksDiv = createEl("div", "card-links");
        if (project.github) {
            const g = createEl("a");
            g.href = project.github;
            g.target = "_blank";
            g.rel = "noopener";
            g.textContent = "GitHub";
            linksDiv.appendChild(g);
        }
        if (project.liveDemo) {
            const l = createEl("a");
            l.href = project.liveDemo;
            l.target = "_blank";
            l.rel = "noopener";
            l.textContent = "Live Demo";
            linksDiv.appendChild(l);
        }

        card.appendChild(title);
        if (tech.textContent) card.appendChild(tech);
        if (desc.textContent) card.appendChild(desc);
        if (linksDiv.children.length) card.appendChild(linksDiv);

        // Click to open modal
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            // don't trigger if they click the links
            if (e.target.tagName.toLowerCase() === "a") return;
            openProjectModal(index);
        });

        projContainer.appendChild(card);
    });

    const projEditable = byId("projEditable");
    projEditable.innerHTML = "";
    data.projects.forEach((project, index) => {
        const li = createEl("li");
        const span = createEl("span");
        span.textContent = project.title;
        const btn = createEl("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => {
            if (confirm(`Delete project "${project.title}"?`)) {
                data.projects.splice(index, 1);
                saveData();
                renderAll();
            }
        });
        li.appendChild(span);
        li.appendChild(btn);
        projEditable.appendChild(li);
    });
}

function renderSocial() {
    const socialList = byId("socialLinks");
    socialList.innerHTML = "";

    function addLink(label, url) {
        if (!url) return;
        const li = createEl("li");
        const a = createEl("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = label;
        li.appendChild(a);
        socialList.appendChild(li);
    }

    addLink("GitHub", data.social.github);
    addLink("LinkedIn", data.social.linkedin);
    addLink("Instagram", data.social.instagram);
    addLink("Twitter", data.social.twitter);
}

function renderAdminForms() {
    byId("inputName").value = data.name;
    byId("inputRole").value = data.role;
    byId("inputAbout").value = data.about;
    byId("inputLocation").value = data.location;
    byId("inputEmail").value = data.email;
    byId("inputPhone").value = data.phone;

    byId("inputAvatar").value = data.avatarUrl || "";
    byId("inputResume").value = data.resumeUrl || "";

    byId("inputGithub").value = data.social.github;
    byId("inputLinkedin").value = data.social.linkedin;
    byId("inputInstagram").value = data.social.instagram;
    byId("inputTwitter").value = data.social.twitter;
}

function renderAll() {
    renderBasic();
    renderSkills();
    renderSkillMeters();
    renderEducation();
    renderProjects();
    renderSocial();
    renderAdminForms();
    setupScrollReveal(); // re-init for new elements
}

// ===== Scroll reveal (IntersectionObserver) =====
function setupScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal, .meter-card, .timeline-item, .card");
    const meters = document.querySelectorAll(".meter-fill");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);

                    // If this is a meter card fill, animate inner bar
                    if (entry.target.classList.contains("meter-card")) {
                        const fill = entry.target.querySelector(".meter-fill");
                        const idx = Array.from(document.querySelectorAll(".meter-card")).indexOf(entry.target);
                        const meter = (data.skillMeters || [])[idx];
                        if (fill && meter) {
                            fill.style.width = (meter.level || 0) + "%";
                        }
                    }
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
}

// ===== Admin events =====
function setupAdmin() {
    const adminPanel = byId("adminPanel");
    const overlay = byId("adminOverlay");
    const openBtn = byId("toggleAdminBtn");
    const closeBtn = byId("closeAdminBtn");

    const PASSWORD = "14821659";

    function openPanel() {
        const entered = prompt("Enter admin password:");
        if (entered === null) return;
        if (entered === PASSWORD) {
            adminPanel.classList.remove("hidden");
            overlay.classList.remove("hidden");
        } else {
            alert("Incorrect password.");
        }
    }

    function closePanel() {
        adminPanel.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    openBtn.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);

    // Basic info form
    byId("basicForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const avatar = byId("inputAvatar").value.trim();
        const resume = byId("inputResume").value.trim();

        // Validate formats for local files (if not URL)
        if (avatar && !/\.(jpe?g|png)$/i.test(avatar) && !avatar.startsWith("http")) {
            alert("Profile image must be .jpg or .png (or a full https URL).");
            return;
        }
        if (resume && !/\.pdf$/i.test(resume) && !resume.startsWith("http")) {
            alert("Resume must be a .pdf file (or a full https URL).");
            return;
        }

        data.name = byId("inputName").value.trim() || data.name;
        data.role = byId("inputRole").value.trim() || data.role;
        data.about = byId("inputAbout").value.trim() || data.about;
        data.location = byId("inputLocation").value.trim();
        data.email = byId("inputEmail").value.trim();
        data.phone = byId("inputPhone").value.trim();
        data.avatarUrl = avatar;
        data.resumeUrl = resume;
        data.social.github = byId("inputGithub").value.trim();
        data.social.linkedin = byId("inputLinkedin").value.trim();
        data.social.instagram = byId("inputInstagram").value.trim();
        data.social.twitter = byId("inputTwitter").value.trim();

        saveData();
        renderAll();
        alert("Basic info updated!");
    });

    // Add skill
    byId("skillForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const value = byId("inputSkill").value.trim();
        if (!value) return;
        data.skills.push(value);
        byId("inputSkill").value = "";
        saveData();
        renderAll();
    });

    // Add education
    byId("eduForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const degree = byId("inputEduDegree").value.trim();
        const school = byId("inputEduSchool").value.trim();
        const year = byId("inputEduYear").value.trim();
        const details = byId("inputEduDetails").value.trim();

        if (!degree || !school || !year) return;

        data.education.push({ degree, school, year, details });
        byId("inputEduDegree").value = "";
        byId("inputEduSchool").value = "";
        byId("inputEduYear").value = "";
        byId("inputEduDetails").value = "";
        saveData();
        renderAll();
    });

    // Add project
    byId("projectForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = byId("inputProjTitle").value.trim();
        const techText = byId("inputProjTech").value.trim();
        const description = byId("inputProjDesc").value.trim();
        const github = byId("inputProjGithub").value.trim();
        const liveDemo = byId("inputProjLive").value.trim();

        if (!title) return;

        const tech = techText
            ? techText
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [];

        data.projects.push({ title, tech, description, github, liveDemo });

        byId("inputProjTitle").value = "";
        byId("inputProjTech").value = "";
        byId("inputProjDesc").value = "";
        byId("inputProjGithub").value = "";
        byId("inputProjLive").value = "";
        saveData();
        renderAll();
    });

    // Export data
    byId("exportDataBtn").addEventListener("click", () => {
        const text = JSON.stringify(data, null, 2);
        byId("exportOutput").value = text;
    });

    // Reset data
    byId("resetDataBtn").addEventListener("click", () => {
        if (confirm("Reset everything to default data? This will clear your changes on this device.")) {
            localStorage.removeItem("portfolioData");
            data = deepClone(defaultData);
            renderAll();
            byId("exportOutput").value = "";
            alert("Reset to default data.");
        }
    });
}

// ===== Project modal events =====
function setupProjectModalEvents() {
    const modal = byId("projectModal");
    const backdrop = modal.querySelector(".modal-backdrop");
    const closeBtn = byId("projectModalClose");

    backdrop.addEventListener("click", closeProjectModal);
    closeBtn.addEventListener("click", closeProjectModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeProjectModal();
        }
    });
}

// ===== Theme toggle events =====
function setupThemeToggle() {
    const btn = byId("themeToggle");
    btn.addEventListener("click", () => {
        const current = document.body.classList.contains("theme-light") ? "light" : "dark";
        const next = current === "light" ? "dark" : "light";
        applyTheme(next);
        saveTheme(next);
    });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    // Theme first
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);

    renderAll();
    setupAdmin();
    setupProjectModalEvents();
    setupThemeToggle();
    startTypingEffect();
});
