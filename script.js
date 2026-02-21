// SECTION: Utility
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// SECTION: Navigation
const navLinks = selectAll('.nav-link');
const navList = document.querySelector('.nav-list');
const navToggle = document.querySelector('.nav-toggle');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navList.classList.toggle('is-open');
  });
}

// Smooth scroll for anchor links
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerOffset = 110;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

    // Close mobile nav after selection
    if (navList.classList.contains('is-open')) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Active section highlighting on scroll
const sections = selectAll('main section[id]');

const setActiveLink = () => {
  const scrollPosition = window.scrollY;
  let currentId = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - 150;
    if (scrollPosition >= offsetTop) {
      currentId = section.id;
    }
  });

  if (!currentId) return;

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const id = href.replace('#', '');
    link.classList.toggle('is-active', id === currentId);
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// SECTION: Year & CV download
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

const handleDownload = (event) => {
  event.preventDefault();
  // Placeholder: replace href with your actual CV file when available
  alert('Connect your real PDF file by updating the Download CV link href attribute.');
};

['download-cv', 'download-cv-sidebar'].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', handleDownload);
});
