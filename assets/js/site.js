// Controle do Menu Mobile
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Fechamento automático ao clicar em links âncora
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => nav?.classList.remove("open"));
});

// Proteção Antispam via Honeypot
document.querySelectorAll("form[data-contact]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    const trap = form.querySelector('input[name="company_website"]');
    if (trap && trap.value) {
      event.preventDefault();
      console.warn("Spam detectado via honeypot.");
    }
  });
});

// Destaque de link ativo no scroll (ScrollSpy leve)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.setAttribute("aria-current", "page");
            } else if (href.startsWith("#")) {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}
