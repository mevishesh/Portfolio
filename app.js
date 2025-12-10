// ===== Default data (first time load) =====
const defaultData = {
    "name": "Vishesh Waghmore",
    "role": "Student",
    "intro": "I am a passionate student who loves building web apps, solving problems, and exploring new technologies.",
    "about": "Dedicated and ambitious Diplomastudent in Computer Science with a strong interest in Development, Artificial Intelligence and Machine Learning. Seeking an internship opportunity to enhance technical expertise, strengthen problem-solving skills, gain practical knowledge, and contribute meaningfully to real-world projects. Eager to work in a professional environment that values innovation, teamwork, and continuous learning.",
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
        "Git",
        "DBMS",
        "OOPS",
        "Operating System",
        "Cloud Computing",
        "Mobile Application Development",
        "Cyber Security"
    ],
    "skillMeters": [
        {
            "label": "Frontend",
            "level": 60
        },
        {
            "label": "Backend",
            "level": 30
        },
        {
            "label": "Python",
            "level": 50
        },
        {
            "label": "DSA",
            "level": 20
        }
    ],
    "education": [
        {
            "degree": "Diploma",
            "school": "Government Polytechnic Pune",
            "year": "2023-2026",
            "details": "Diploma in Computer Engineering"
        }
    ],
    "projects": [
        {
            "title": "Smart AttendX",
            "tech": [
                "Html",
                "Css",
                "Js",
                "Python",
                "Open CV",
                "Face-recognition",
                "SQLite"
            ],
            "description": "This system provides advanced attendance management using face and voice recognition.\nAn admin panel is included for user management and tracking records (GUI/web panel design, database management). Admin can start/stop attendance, view attendance, register student, send notification, change profile, change settings, etc.",
            "github": "https://github.com/mevishesh/SmartAttendX",
            "liveDemo": ""
        },
        {
            "title": "Shield+",
            "tech": [
                "Android Studio"
            ],
            "description": "A smart safety application designed to detect emergency situations and send real-time alerts to guardians or authorities. Can send Sos message by clicking button or shaking device, can edit emergency contacts, nearby emergency places and emergency contacts.",
            "github": "https://github.com/mevishesh/Shield_Plus",
            "liveDemo": "https://github.com/mevishesh/Shield_Plus/app"
        },
        {
            "title": "Notes",
            "tech": [
                "Html",
                "Css",
                "Js"
            ],
            "description": "The application's structure is built using HTML. Its visual appearance and theme toggles are defined by CSS. All interactive functionality, including creating, editing, and deleting notes, and managing data persistence, is handled by JavaScript and localStorage.",
            "github": "https://github.com/mevishesh/Notes",
            "liveDemo": "https://notes-377e5.web.app/"
        }
    ],
    "services": [
        {
            "title": "Web Development",
            "description": "Building responsive, modern websites using HTML, CSS and JavaScript."
        },
        {
            "title": "Python & Automation",
            "description": "Scripts and tools to automate repetitive tasks and simplify workflows."
        },
        {
            "title": "Academic & Mini Projects",
            "description": "Smart projects suitable for diplomas, internships and learning."
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

// ===== Typing effect (restartable when role changes) =====
let typingVersion = 0;

function startTypingEffect() {
    const el = byId("heroRole");
    if (!el) return;

    const localVersion = ++typingVersion;
    let idx = 0;
    let deleting = false;

    function tick() {
        if (localVersion !== typingVersion) return; // stop old loop when new one starts
        const text = data.role || "";

        if (!deleting) {
            el.textContent = text.slice(0, idx + 1);
            idx++;
            if (idx >= text.length) {
                setTimeout(() => {
                    if (localVersion === typingVersion) deleting = true;
                }, 1500);
            }
        } else {
            el.textContent = text.slice(0, Math.max(idx - 1, 0));
            idx--;
            if (idx <= 0) {
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
    // heroRole text is animated by typing effect

    // Short intro in hero (fallback to about)
    byId("heroAbout").textContent = data.intro || data.about || "";

    // Full about section
    byId("aboutText").textContent = data.about || "";

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
    const waNumber = data.phone ? data.phone.replace(/[^0-9]/g, "") : "";
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
        fill.style.width = "0";
        bar.appendChild(fill);

        card.appendChild(top);
        card.appendChild(bar);
        container.appendChild(card);
    });

    // Editable list for meters
    const metersEditable = byId("metersEditable");
    metersEditable.innerHTML = "";
    meters.forEach((m, index) => {
        const li = createEl("li");
        const span = createEl("span");
        span.textContent = `${m.label} – ${m.level}%`;
        const btn = createEl("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => {
            if (confirm(`Delete strength "${m.label}"?`)) {
                data.skillMeters.splice(index, 1);
                saveData();
                renderAll();
            }
        });
        li.appendChild(span);
        li.appendChild(btn);
        metersEditable.appendChild(li);
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

        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
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

function renderServices() {
    const container = byId("servicesList");
    container.innerHTML = "";
    const services = data.services || [];
    services.forEach((svc) => {
        const card = createEl("article", "card reveal");
        const h3 = createEl("h3");
        h3.textContent = svc.title;
        const p = createEl("p");
        p.textContent = svc.description || "";
        card.appendChild(h3);
        card.appendChild(p);
        container.appendChild(card);
    });

    const servicesEditable = byId("servicesEditable");
    servicesEditable.innerHTML = "";
    services.forEach((svc, index) => {
        const li = createEl("li");
        const span = createEl("span");
        span.textContent = svc.title;
        const btn = createEl("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => {
            if (confirm(`Delete service "${svc.title}"?`)) {
                data.services.splice(index, 1);
                saveData();
                renderAll();
            }
        });
        li.appendChild(span);
        li.appendChild(btn);
        servicesEditable.appendChild(li);
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
    byId("inputIntro").value = data.intro || "";
    byId("inputAbout").value = data.about || "";
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

let scrollObserver = null;

function renderAll() {
    renderBasic();
    renderSkills();
    renderSkillMeters();
    renderEducation();
    renderProjects();
    renderServices();
    renderSocial();
    renderAdminForms();
    setupScrollReveal();
}

// ===== Scroll reveal (IntersectionObserver) =====
function setupScrollReveal() {
    if (scrollObserver) {
        scrollObserver.disconnect();
    }

    const revealEls = document.querySelectorAll(".reveal, .meter-card, .timeline-item, .card");
    const meters = document.querySelectorAll(".meter-card");

    scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    scrollObserver.unobserve(entry.target);

                    if (entry.target.classList.contains("meter-card")) {
                        const fill = entry.target.querySelector(".meter-fill");
                        const idx = Array.from(meters).indexOf(entry.target);
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

    revealEls.forEach((el) => scrollObserver.observe(el));
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

        if (avatar && !/\.(jpe?g|png)$/i.test(avatar) && !avatar.startsWith("http")) {
            alert("Profile image must be .jpg or .png (or a full https URL).");
            return;
        }
        if (resume && !/\.pdf$/i.test(resume) && !resume.startsWith("http")) {
            alert("Resume must be a .pdf file (or a full https URL).");
            return;
        }

        data.name = byId("inputName").value.trim() || data.name;
        const newRole = byId("inputRole").value.trim();
        if (newRole) data.role = newRole;

        data.intro = byId("inputIntro").value.trim();
        const newAbout = byId("inputAbout").value.trim();
        if (newAbout) data.about = newAbout;

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
        startTypingEffect(); // restart typing on role change
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

    // Add skill meter
    byId("meterForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const label = byId("inputMeterLabel").value.trim();
        const levelStr = byId("inputMeterLevel").value.trim();
        if (!label) return;
        let level = parseInt(levelStr, 10);
        if (isNaN(level)) level = 0;
        if (level < 0) level = 0;
        if (level > 100) level = 100;

        data.skillMeters.push({ label, level });
        byId("inputMeterLabel").value = "";
        byId("inputMeterLevel").value = "";
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

    // Add service
    byId("serviceForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = byId("inputServiceTitle").value.trim();
        const description = byId("inputServiceDesc").value.trim();
        if (!title) return;

        data.services.push({ title, description });
        byId("inputServiceTitle").value = "";
        byId("inputServiceDesc").value = "";
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

// ===== Mobile nav toggle =====
function setupNavToggle() {
    const btn = byId("navToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        document.body.classList.toggle("nav-open");
    });

    // Close menu when clicking any nav link
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((a) => {
        a.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
        });
    });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);

    renderAll();
    setupAdmin();
    setupProjectModalEvents();
    setupThemeToggle();
    setupNavToggle();
    startTypingEffect();
});
