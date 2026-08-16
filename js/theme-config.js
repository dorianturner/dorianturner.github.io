/* Single source of truth for the available portfolio looks. */
(() => {
  const themes = [
    { id: "retro", label: "Retro futurism" },
    { id: "neo", label: "Neo-brutalist" },
    { id: "fungus", label: "Organic" },
    { id: "mono", label: "Old-school mono desktop" },
    { id: "web1", label: "Web 1.0" },
    { id: "eyesore", label: "Assault on the eyes" },
  ];
  const themeIds = new Set(themes.map(({ id }) => id));
  const aliases = { paper: "fungus" };

  window.DorianThemeConfig = Object.freeze({
    key: "dorian-portfolio-look",
    defaultTheme: "neo",
    themes: Object.freeze(themes),
    normalize(theme) {
      if (themeIds.has(theme)) return theme;
      return aliases[theme] || this.defaultTheme;
    },
  });
})();
