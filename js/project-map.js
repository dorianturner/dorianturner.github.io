function renderProjectMap(project, root) {
  if (!root || !project.diagram) return;
  root.innerHTML = `<div class="flow-map" role="img" aria-label="${project.title} implementation flow">${project.diagram.map(([label, detail], index) => `${index ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}<div class="flow-node"><span>${String(index + 1).padStart(2, "0")}</span><strong>${label}</strong><small>${detail}</small></div>`).join("")}</div>`;
}

window.renderProjectMap = renderProjectMap;
