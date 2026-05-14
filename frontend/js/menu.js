document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("navPanel");
  const links = document.querySelectorAll(".nav-links a");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeMenu = () => {
    toggle?.classList.remove("is-open");
    panel?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  toggle?.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    panel?.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
});
