document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");
  const animatedCounters = new WeakSet();

  const animateCounter = (element) => {
    if (animatedCounters.has(element)) return;
    animatedCounters.add(element);

    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `+${Math.round(target * eased)}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.contains(counters[0])) {
          counters.forEach(animateCounter);
        }
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => observer.observe(element));
});
