document.documentElement.classList.add("js");

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

const sections = document.querySelectorAll(
    "main section[id]"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);

const particleCanvas = document.querySelector(
    "#particleCanvas"
);

const currentYear = document.querySelector(
    "#currentYear"
);

const mobileNavigation = window.matchMedia(
    "(max-width: 768px)"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
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

const updateActiveNavigationLink = () => {

    let activeId = "";

    sections.forEach((section) => {

        const rect = section.getBoundingClientRect();

        if (rect.top <= 160 && rect.bottom >= 160) {
            activeId = section.id;
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.toggle(
            "ativo",
            link.getAttribute("href") === `#${activeId}`
        );

    });

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
   ANIMAÇÕES DE ENTRADA
========================================================= */

const setupRevealAnimations = () => {

    if (!revealElements.length) {
        return;
    }

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);

        });

    }, { threshold: 0.16 });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

};

/* =========================================================
   PARTÍCULAS HERO
========================================================= */

const setupHeroParticles = () => {

    if (!particleCanvas || reducedMotion.matches) {
        return;
    }

    const ctx = particleCanvas.getContext("2d");

    if (!ctx) {
        return;
    }

    let particles = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resizeCanvas = () => {

        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const rect = particleCanvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        particleCanvas.width = Math.floor(width * ratio);
        particleCanvas.height = Math.floor(height * ratio);

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.min(Math.floor(width / 28), 70);

        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            r: Math.random() * 1.8 + 0.6,
        }));

    };

    const drawParticles = () => {

        ctx.clearRect(0, 0, width, height);

        particles.forEach((particle, index) => {

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) {
                particle.vx *= -1;
            }

            if (particle.y < 0 || particle.y > height) {
                particle.vy *= -1;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
            ctx.fill();

            for (let next = index + 1; next < particles.length; next += 1) {

                const other = particles[next];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(17, 150, 243, ${1 - distance / 130})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }

            }

        });

        animationFrame = requestAnimationFrame(drawParticles);

    };

    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );

    reducedMotion.addEventListener("change", () => {

        if (reducedMotion.matches) {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, width, height);
        }

    });

    resizeCanvas();
    drawParticles();

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
    () => {
        updateHeaderState();
        updateActiveNavigationLink();
    },
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

updateActiveNavigationLink();

setupRevealAnimations();

setupHeroParticles();
