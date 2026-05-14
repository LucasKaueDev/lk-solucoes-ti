const header = document.querySelector("#barra__navegacao");
const menuButton = document.querySelector(".menu-toggle");
const navigationPanel = document.querySelector("#painel__navegacao");
const navigationLinks = document.querySelectorAll(".navegacao__links a");
const portfolioShell = document.querySelector(".portfolio__casca");
const currentYear = document.querySelector("#currentYear");
const mobileNavigation = window.matchMedia("(max-width: 768px)");

const closeMenu = () => {
  if (!menuButton || !navigationPanel) {
    return;
  }

  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  navigationPanel.classList.remove("ativo");
  navigationPanel.setAttribute("aria-hidden", "true");
};

const toggleMenu = () => {
  if (!menuButton || !navigationPanel) {
    return;
  }

  const isOpen = menuButton.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navigationPanel.classList.toggle("ativo", isOpen);
  navigationPanel.setAttribute("aria-hidden", String(!isOpen));
};

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("ativa", window.scrollY > 10);
};

const syncNavigationVisibility = () => {
  if (!navigationPanel) {
    return;
  }

  if (mobileNavigation.matches) {
    closeMenu();
    return;
  }

  navigationPanel.setAttribute("aria-hidden", "false");
};

const scrollPortfolio = (direction) => {
  const track = portfolioShell?.querySelector(".portfolio__trilha");
  const card = track?.querySelector(".projeto__card");

  if (!track || !card) {
    return;
  }

  track.scrollBy({
    left: direction * (card.offsetWidth + 20),
    behavior: "smooth",
  });
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

menuButton?.addEventListener("click", toggleMenu);
navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
portfolioShell?.querySelectorAll(".portfolio__botao").forEach((button, index) => {
  button.addEventListener("click", () => scrollPortfolio(index === 0 ? -1 : 1));
});
mobileNavigation.addEventListener("change", syncNavigationVisibility);
window.addEventListener("scroll", updateHeaderState, { passive: true });

updateHeaderState();
syncNavigationVisibility();
