(() => {
  const themeConfig = window.DorianThemeConfig || {
    key: "dorian-portfolio-look",
    defaultTheme: "neo",
    themes: [{ id: "neo", label: "Neo-brutalist" }],
    normalize: (theme) => theme || "neo",
  };
  const themeKey = themeConfig.key;
  const root = document.documentElement;
  const select = document.querySelector("#look-select");

  const readCookie = () => document.cookie
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([key]) => key === themeKey)?.[1];

  const readUrlTheme = () => new URL(window.location.href).searchParams.get("look") || "";

  const readTheme = () => {
    let savedTheme = "";
    try { savedTheme = sessionStorage.getItem(themeKey) || ""; } catch (_) { /* Session storage may be unavailable. */ }
    if (!savedTheme) {
      try { savedTheme = localStorage.getItem(themeKey) || ""; } catch (_) { /* Storage may be unavailable. */ }
    }
    return savedTheme || readCookie() || readUrlTheme() || themeConfig.defaultTheme;
  };

  const normalizeTheme = (theme) => themeConfig.normalize(theme);

  if (select) {
    select.replaceChildren(...themeConfig.themes.map(({ id, label }) => new Option(label, id)));
  }

  const syncNavigation = (theme) => {
    document.querySelectorAll("a[href]").forEach((link) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) return;

      let url;
      try { url = new URL(rawHref, window.location.href); } catch (_) { return; }
      if (url.origin !== window.location.origin) return;
      url.searchParams.set("look", theme);
      link.href = url.href;
    });
  };

  const syncCurrentUrl = (theme) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("look") === theme) return;
    url.searchParams.set("look", theme);
    window.history.replaceState(window.history.state, "", url.href);
  };

  const applyTheme = (theme, { syncUrl = true } = {}) => {
    const nextTheme = normalizeTheme(theme);
    root.dataset.theme = nextTheme;
    if (select) select.value = nextTheme;
    try { sessionStorage.setItem(themeKey, nextTheme); } catch (_) { /* Session storage may be unavailable. */ }
    try { localStorage.setItem(themeKey, nextTheme); } catch (_) { /* Storage may be unavailable. */ }
    try { document.cookie = `${themeKey}=${nextTheme}; max-age=31536000; path=/; SameSite=Lax`; } catch (_) { /* Cookies may be unavailable. */ }
    if (syncUrl) syncCurrentUrl(nextTheme);
    syncNavigation(nextTheme);
  };

  applyTheme(readTheme());
  select?.addEventListener("change", (event) => applyTheme(event.target.value));

  // Re-apply the canonical value when a page is restored from the back/forward cache.
  const refreshTheme = () => applyTheme(readTheme());
  window.addEventListener("pageshow", refreshTheme);
  window.addEventListener("popstate", refreshTheme);
  window.addEventListener("storage", (event) => {
    if (event.key === themeKey && event.newValue) applyTheme(event.newValue);
  });

  if ("IntersectionObserver" in window) {
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
  }

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
})();
