const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  }
}, { threshold: 0.08 });

document.querySelectorAll(".section-heading, .index-card, .split-section, .contact-section").forEach((element, index) => {
  element.classList.add("fade-in");
  element.style.transitionDelay = `${(index % 5) * 50}ms`;
  observer.observe(element);
});

document.querySelectorAll(".index-card").forEach((card) => {
  const explainer = card.querySelector(".card-link");
  if (!explainer) return;

  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Open ${card.querySelector("h3")?.textContent || "project"} explainer`);

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    window.location.href = explainer.href;
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.location.href = explainer.href;
  });
});
