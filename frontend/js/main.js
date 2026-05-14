const header = document.querySelector("#barra__navegacao");

const menuButton = document.querySelector(".menu-toggle");

const navigationPanel = document.querySelector("#painel__navegacao");

const navigationLinks = document.querySelectorAll(
    ".navegacao__links a"
);

const portfolioShell = document.querySelector(
    ".portfolio__casca"
);

const portfolioTrack = document.querySelector(
    ".portfolio__trilha"
);

const portfolioCards = document.querySelectorAll(
    ".projeto__card"
);

const currentYear = document.querySelector(
    "#currentYear"
);

const mobileNavigation = window.matchMedia(
    "(max-width: 768px)"
);

/* =========================================================
   MENU MOBILE
========================================================= */

const closeMenu = () => {

    if (!menuButton || !navigationPanel) {
        return;
    }

    menuButton.classList.remove("is-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Abrir menu"
    );

    navigationPanel.classList.remove("ativo");

    navigationPanel.setAttribute(
        "aria-hidden",
        "true"
    );

};

const toggleMenu = () => {

    if (!menuButton || !navigationPanel) {
        return;
    }

    const isOpen = menuButton.classList.toggle(
        "is-open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu"
            : "Abrir menu"
    );

    navigationPanel.classList.toggle(
        "ativo",
        isOpen
    );

    navigationPanel.setAttribute(
        "aria-hidden",
        String(!isOpen)
    );

};

/* =========================================================
   HEADER
========================================================= */

const updateHeaderState = () => {

    if (!header) {
        return;
    }

    header.classList.toggle(
        "ativa",
        window.scrollY > 10
    );

};

/* =========================================================
   RESPONSIVIDADE MENU
========================================================= */

const syncNavigationVisibility = () => {

    if (!navigationPanel) {
        return;
    }

    if (mobileNavigation.matches) {

        closeMenu();

        return;

    }

    navigationPanel.setAttribute(
        "aria-hidden",
        "false"
    );

};

/* =========================================================
   PORTFOLIO SLIDER
========================================================= */

const scrollPortfolio = (direction) => {

    if (!portfolioTrack || !portfolioCards.length) {
        return;
    }

    const cardWidth =
        portfolioCards[0].offsetWidth + 24;

    portfolioTrack.scrollBy({
        left: direction * cardWidth,
        behavior: "smooth",
    });

};

/* =========================================================
   EVENTOS BOTÕES PORTFOLIO
========================================================= */

const portfolioButtons = portfolioShell?.querySelectorAll(
    ".portfolio__botao"
);

portfolioButtons?.forEach((button, index) => {

    button.addEventListener("click", () => {

        scrollPortfolio(
            index === 0 ? -1 : 1
        );

    });

});

/* =========================================================
   FECHAR MENU AO CLICAR NOS LINKS
========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});

/* =========================================================
   MENU MOBILE
========================================================= */

menuButton?.addEventListener(
    "click",
    toggleMenu
);

/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    updateHeaderState,
    { passive: true }
);

/* =========================================================
   RESPONSIVIDADE
========================================================= */

mobileNavigation.addEventListener(
    "change",
    syncNavigationVisibility
);

/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

updateHeaderState();

syncNavigationVisibility();