(() => {
  const themeConfig = window.DorianThemeConfig || {
    key: "dorian-portfolio-look",
    defaultTheme: "retro",
    normalize: (theme) => theme || "retro",
  };
  const themeKey = themeConfig.key;
  let savedTheme = "";
  try { savedTheme = sessionStorage.getItem(themeKey) || ""; } catch (_) { /* Session storage may be unavailable. */ }
  if (!savedTheme) {
    try { savedTheme = localStorage.getItem(themeKey) || ""; } catch (_) { /* Storage may be unavailable. */ }
  }
  if (!savedTheme) {
    savedTheme = document.cookie
      .split(";")
      .map((part) => part.trim().split("="))
      .find(([key]) => key === themeKey)?.[1] || "";
  }
  if (!savedTheme) {
    try { savedTheme = new URL(window.location.href).searchParams.get("look") || ""; } catch (_) { /* URL parsing may be unavailable. */ }
  }
  document.documentElement.dataset.theme = themeConfig.normalize(savedTheme || themeConfig.defaultTheme);
})();
