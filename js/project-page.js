const root = document.querySelector("#project-app");
const project = window.projectData;

function renderScreenshots(target, visual) {
  target.innerHTML = `<div class="screenshot-grid">${visual.images.map(([src, alt, caption]) => `<figure class="screenshot-card"><div class="screenshot-frame"><img src="${src}" alt="${alt}" loading="lazy"></div><figcaption><strong>${alt}</strong><span>${caption}</span></figcaption></figure>`).join("")}</div>`;
}

if (!root || !project) {
  document.title = "Project not found — Dorian Turner";
  if (root) root.innerHTML = "<p>Project not found.</p>";
} else {
  const visual = project.visual || {
    type: "widget",
    widget: project.widget,
    heading: "Code behavior",
    description: "Controls update a visual model of the implementation described above.",
  };
  const narrativeLayout = project.solution && project.architectureVisual;
  document.title = `${project.title} — Dorian Turner`;
  root.innerHTML = `
    <nav class="project-nav" aria-label="Project navigation"><a href="../index.html#projects">← Projects</a><span>${project.source}</span></nav>
    <header class="project-header">
      <div><p class="section-label">${project.category}</p><h1>${project.title}</h1><p class="project-summary">${project.summary}</p><div class="project-links"><a class="project-button" href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer">Open Git repository ↗</a></div></div>
      <dl class="project-facts">${project.facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>
    </header>
    <section class="project-section" aria-labelledby="overview-title">
      <div class="project-section-heading${project.hideSectionDescriptions || project.overviewWidget ? " is-solo" : ""}"><div><p class="section-label">01 / Overview</p><h2 id="overview-title">Project overview</h2></div>${project.hideSectionDescriptions || project.overviewWidget ? "" : `<p>${project.overview}</p>`}</div>
      ${project.overviewWidget ? `<div class="slice-overview-widget">
        <div class="slice-overview-copy">
          <p class="phase-source">${project.overviewWidget.label}</p>
          <p class="slice-overview-lead">${project.overviewWidget.lead}</p>
          <p class="slice-overview-context">${project.overview}</p>
        </div>
        <div class="slice-overview-flow">${project.overviewWidget.steps.map(([label, title, text]) => `<article class="slice-overview-step"><span>${label}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
      </div>` : ""}
      <div class="explain-grid">${project.sections.map(([title, text], index) => `<article class="explain-card"><p class="section-label">${String(index + 1).padStart(2, "0")}</p><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
    </section>
    ${narrativeLayout ? `
    <section class="project-section" aria-labelledby="solution-title">
      <div class="project-section-heading${project.hideSectionDescriptions ? " is-solo" : ""}"><div><p class="section-label">02 / Solution</p><h2 id="solution-title">${project.solution.heading}</h2></div>${project.hideSectionDescriptions ? "" : `<p>${project.solution.description}</p>`}</div>
      <div id="solution-visual" class="widget-shell"></div>
    </section>
    <section class="project-section" aria-labelledby="architecture-title">
      <div class="project-section-heading${project.hideSectionDescriptions ? " is-solo" : ""}"><div><p class="section-label">03 / Architecture</p><h2 id="architecture-title">${project.architectureVisual.heading}</h2></div>${project.hideSectionDescriptions ? "" : `<p>${project.architectureVisual.description}</p>`}</div>
      ${project.hideMap ? "" : '<div id="project-map"></div>'}
      <div id="architecture-visual" class="widget-shell"></div>
    </section>` : `
    ${project.hideMap ? "" : `<section class="project-section" aria-labelledby="map-title">
      <div class="project-section-heading"><div><p class="section-label">02 / Architecture</p><h2 id="map-title">Implementation flow</h2></div><p>Source modules and runtime boundaries represented as a left-to-right data flow.</p></div>
      <div id="project-map"></div>
    </section>`}
    <section class="project-section" aria-labelledby="visual-title">
      <div class="project-section-heading"><div><p class="section-label">${visual.sectionLabel || `03 / ${visual.type === "screenshots" ? "Product screens" : "Visual explainer"}`}</p><h2 id="visual-title">${visual.heading}</h2></div><p>${visual.description}</p></div>
      <div id="project-widget" class="widget-shell"></div>
    </section>`}`;
  window.renderProjectMap(project, document.querySelector("#project-map"));
  if (narrativeLayout) {
    renderScreenshots(document.querySelector("#solution-visual"), project.solution);
    renderScreenshots(document.querySelector("#architecture-visual"), project.architectureVisual);
  } else {
    const visualRoot = document.querySelector("#project-widget");
    if (visual.type === "screenshots") renderScreenshots(visualRoot, visual);
    else {
      const widget = window.projectWidgets?.[visual.widget || project.widget];
      if (widget) widget(visualRoot, project);
      else visualRoot.innerHTML = "<p class=\"widget-status\">Visual explainer unavailable.</p>";
    }
  }
}
