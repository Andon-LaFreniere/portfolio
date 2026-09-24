import "./styles/main.css";
import { createScene } from "./scene";
import { setupScroll } from "./scroll";
import { education, experience, involvement, profile, projects, skills } from "./content/content";

const link = (href: string, label: string) => href.startsWith("[") ? `<span class="todo">${label} · TODO</span>` : `<a href="${href}" target="_blank" rel="noreferrer">${label} ↗</a>`;
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <canvas id="fractal-canvas" aria-hidden="true"></canvas>
  <div class="webgl-fallback" id="webgl-fallback" hidden aria-hidden="true"><svg viewBox="0 0 240 160" role="img" aria-label="Geometric line art"><path d="M20 130 120 20l100 110-100-38zM20 130l100-38 100 38M120 20v72"/></svg></div>
  <div class="hero-noise" aria-hidden="true"></div>
  <header class="hero" id="top"><p class="eyebrow">Portfolio / 2026</p><h1>${profile.name}</h1><p class="scroll-cue"><span>Scroll to explore</span><i></i></p></header>
  <nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a class="nav-name" href="#top">${profile.name}</a><div>${["about", "experience", "projects", "education", "skills", "involvement", "contact"].map((item) => `<a href="#${item}">${item}</a>`).join("")}</div></nav>
  <main class="content">
    <section id="about" class="section reveal"><p class="section-index">01</p><div><h2>About</h2><p class="lede">I build software where systems, data, and performance meet. My interests span high-performance applications, machine learning, and cybersecurity.</p><p>I'm an undergraduate at The Ohio State University, majoring in Computer Science and Engineering and minoring in Mathematics. My work spans enterprise software engineering and IT, research in machine learning, and open-source projects. I am currently exploring opportunities for Summer 2027.</p></div></section>
    <section id="experience" class="section reveal"><p class="section-index">02</p><div><h2>Experience</h2><div class="timeline">${experience.map((item) => `<article class="timeline-item"><div class="item-heading"><h3>${item.role}</h3><p>${item.company}</p><time>${item.period}</time></div><ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul></article>`).join("")}</div></div></section>
    <section id="projects" class="section reveal"><p class="section-index">03</p><div><h2>Projects</h2><div class="project-grid">${projects.map((item) => `<article class="project-card"><div><p class="card-kicker">${item.status ?? "Selected work"}</p><h3>${item.title}</h3><p>${item.description}</p></div><div class="chip-list">${item.stack.map((chip) => `<span>${chip}</span>`).join("")}</div><div class="card-links">${item.links.map((itemLink) => link(itemLink.href, itemLink.label)).join("")}</div></article>`).join("")}</div></div></section>
    <section id="education" class="section reveal"><p class="section-index">04</p><div><h2>Education</h2><article class="education-block"><div><h3>${education.school}</h3><p>${education.degree} · ${education.minor}</p></div><div class="education-meta"><strong>${education.gpa}</strong><span>GPA</span><time>${education.expected}</time></div></article><p class="muted">Coursework: ${education.coursework}</p></div></section>
    <section id="skills" class="section reveal"><p class="section-index">05</p><div><h2>Skills &amp; Certs</h2><div class="skills-grid">${Object.entries(skills).map(([label, value]) => `<div><h3>${label}</h3><p>${value}</p></div>`).join("")}</div><p class="cert">CompTIA Security+</p></div></section>
    <section id="involvement" class="section reveal"><p class="section-index">06</p><div><h2>Involvement</h2><ul class="involvement-list">${involvement.map((item) => `<li>${item}</li>`).join("")}</ul></div></section>
    <section id="contact" class="section contact reveal"><p class="section-index">07</p><div><h2>Contact</h2><p class="lede">Open to conversations about software, data, and the systems that make both useful.</p><div class="contact-links"><a href="mailto:${profile.email}">${profile.email}</a>${link(profile.github, "GitHub")}${link(profile.linkedin, "LinkedIn")}${link(profile.resume, "Resume PDF")}</div></div></section>
  </main><footer><span>${profile.name}</span><span>Built with Three.js / Vite</span></footer>`;

const canvas = document.querySelector<HTMLCanvasElement>("#fractal-canvas")!;
const fallback = document.querySelector<HTMLElement>("#webgl-fallback")!;
const nav = document.querySelector<HTMLElement>("#site-nav")!;
const hero = document.querySelector<HTMLElement>("#top")!;
createScene(canvas, fallback);
setupScroll(canvas, nav, hero);
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
