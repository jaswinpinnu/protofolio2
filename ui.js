const projects = [
  {
    title: "RK FASHIONS — E-COMMERCE",
    description: "A responsive full-stack e-commerce application built with HTML, CSS, JavaScript, and Firebase. Features include product categories and listings, cart management, saved addresses, order history, and a UPI payment workflow.",
    role: "Full-stack development",
    tools: "HTML · CSS · JavaScript · Firebase · localStorage"
  },
  {
    title: "VISION TRANSFORMER — LAND COVER",
    description: "A deep learning capstone that applies Vision Transformers (ViT) to classify land use and land cover categories from satellite imagery. The project explores computer vision for understanding geographic imagery.",
    role: "AI / ML capstone · 2026",
    tools: "Deep Learning · Computer Vision · ViT"
  },
  {
    title: "TEACHNOOK — INTERNSHIP",
    description: "During a Full Stack Developer internship in 2025, developed responsive front-end interfaces using HTML, CSS, and JavaScript, with a focus on usability across desktop and mobile devices.",
    role: "Full Stack Developer Intern · 2025",
    tools: "HTML · CSS · JavaScript · Responsive Design"
  }
];

const intro = document.querySelector("#intro");
window.addEventListener("load", () => {
  window.setTimeout(() => intro?.classList.add("done"), 1550);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector(".desktop-nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalRole = document.querySelector("#modalRole");
const modalTools = document.querySelector("#modalTools");
const modalNumber = document.querySelector("#modalNumber");
let lastFocused = null;

function openProject(index) {
  const project = projects[index];
  if (!project || !modal) return;
  lastFocused = document.activeElement;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalTools.textContent = project.tools;
  modalNumber.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
const liveDemo = modal.querySelector(".project-live-demo");

if (liveDemo) {
  liveDemo.hidden = index === 0 ? false : true;
}

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
function closeProject() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}
document.querySelectorAll("[data-project]").forEach(card => {
  card.addEventListener("click", () => openProject(Number(card.dataset.project)));
});
modal?.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeProject));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProject();
});
