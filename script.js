const body = document.body;
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 1950);
});

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuButton.setAttribute("aria-expanded", String(open));
  const bars = menuButton.querySelectorAll("span");
  bars[0].style.transform = open ? "translateY(4px) rotate(45deg)" : "";
  bars[1].style.transform = open ? "translateY(-4px) rotate(-45deg)" : "";
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelectorAll("span").forEach(bar => bar.style.transform = "");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
const cursorLabel = document.querySelector(".cursor-label");

window.addEventListener("mousemove", e => {
  dot.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
  ring.animate(
    { transform: `translate(${e.clientX - 19}px, ${e.clientY - 19}px)` },
    { duration: 420, fill: "forwards" }
  );
  cursorLabel.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 4}px)`;
});

document.querySelectorAll("a, button, .magnetic-media").forEach(el => {
  el.addEventListener("mouseenter", () => ring.classList.add("active"));
  el.addEventListener("mouseleave", () => ring.classList.remove("active"));
});

document.querySelectorAll("[data-cursor]").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorLabel.textContent = el.dataset.cursor;
    cursorLabel.classList.add("show");
  });
  el.addEventListener("mouseleave", () => cursorLabel.classList.remove("show"));
});

document.querySelectorAll(".magnetic-media").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.018;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.018;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.008)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
});

const heroMedia = document.querySelector(".hero-media");
window.addEventListener("scroll", () => {
  const y = Math.min(window.scrollY, window.innerHeight);
  heroMedia.style.transform = `scale(${1 + y * 0.00013}) translateY(${y * 0.055}px)`;
});

const horizontal = document.querySelector(".horizontal-gallery");
const horizontalTrack = document.querySelector(".horizontal-track");

window.addEventListener("scroll", () => {
  const rect = horizontal.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0 && window.innerWidth > 700) {
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
    const maxShift = Math.max(0, horizontalTrack.scrollWidth - window.innerWidth + 80);
    horizontalTrack.style.transform = `translateX(${-progress * maxShift}px)`;
  }
});

const comparison = document.getElementById("comparison");
const after = comparison.querySelector(".comparison-after");
const divider = comparison.querySelector(".comparison-divider");
let dragging = false;

function setComparison(clientX) {
  const rect = comparison.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const pct = (x / rect.width) * 100;
  after.style.clipPath = `inset(0 0 0 ${pct}%)`;
  divider.style.left = `${pct}%`;
}

comparison.addEventListener("mousedown", e => {
  dragging = true;
  setComparison(e.clientX);
});
window.addEventListener("mousemove", e => dragging && setComparison(e.clientX));
window.addEventListener("mouseup", () => dragging = false);
comparison.addEventListener("touchstart", e => {
  dragging = true;
  setComparison(e.touches[0].clientX);
}, { passive: true });
comparison.addEventListener("touchmove", e => {
  if (dragging) setComparison(e.touches[0].clientX);
}, { passive: true });
comparison.addEventListener("touchend", () => dragging = false);

const galleryItems = [...document.querySelectorAll(".gallery-item, .film-card")];
const lightbox = document.querySelector(".lightbox");
const lightboxTitle = document.querySelector(".lightbox-title");
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[index];
  lightboxTitle.textContent = item.dataset.title || item.querySelector("small")?.textContent || "Selected Work";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  body.classList.remove("lightbox-open");
}

function moveLightbox(direction) {
  currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, index) => item.addEventListener("click", () => openLightbox(index)));
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") moveLightbox(-1);
  if (e.key === "ArrowRight") moveLightbox(1);
});

document.getElementById("year").textContent = new Date().getFullYear();
