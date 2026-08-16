const slicePhases = {
  symbols: {
    label: "01 / Discover",
    title: "Find the exact function",
    copy: "Symbol discovery turns a human search term into the complete demangled ELF signature that Slice can attach to.",
    source: "slice symbols build/fixtures/bimodal_service --match handle_request",
    route: ["binary", "demangled symbol", "profile target"],
  },
  profile: {
    label: "02 / Profile",
    title: "Attach before the work begins",
    copy: "Slice can launch a program or attach to a PID. The capture records invocation boundaries, sampled user stacks, and scheduler transitions around the chosen function.",
    source: "sudo slice profile --function 'BimodalFixture::handle_request(unsigned long)' build/fixtures/bimodal_service -- --workers 6",
    route: ["target process", "eBPF + perf", "capture.slice"],
  },
  inspect: {
    label: "03 / Inspect",
    title: "Select the latency population",
    copy: "The complete population is useful context, but the p95:p100 window is where the slow behavior becomes explainable. Time and thread filters keep that question precise.",
    source: "slice view bimodal.slice --output profile.html --percentile 95:100",
    route: ["time + threads", "latency histogram", "tail flame graph"],
  },
};

function renderSlice(root) {
  root.innerHTML = `<div class="slice-widget">
    <div class="phase-toolbar">
      <div><p class="phase-source">Investigation workflow</p><div class="phase-tabs" role="tablist" aria-label="Slice workflow phases">
        ${Object.entries(slicePhases).map(([id, phase], index) => `<button class="phase-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-slice-phase="${id}"><span>${phase.label}</span><strong>${phase.title}</strong></button>`).join("")}
      </div></div>
      <span class="widget-status" id="slice-status">Target: handle_request</span>
    </div>
    <div class="phase-detail" id="slice-phase-detail"></div>
    <div class="slice-controls" aria-label="Profile selection controls">
      <div class="control"><label for="slice-time">Time window</label><select id="slice-time"><option value="full">Full capture · 0–9.5 s</option><option value="active">Active window · 2.4–8.4 s</option><option value="tail">Tail window · 8.4–9.5 s</option></select></div>
      <div class="control"><label for="slice-thread">Threads</label><select id="slice-thread"><option value="all">All observed threads</option><option value="workers-a">Workers 0–2</option><option value="workers-b">Workers 3–5</option></select></div>
      <div class="control"><label for="slice-percentile">Latency slice</label><select id="slice-percentile"><option value="all">p0:p100 · complete</option><option value="p95">p95:p100 · slow tail</option><option value="p99">p99:p100 · extreme tail</option></select></div>
    </div>
    <div class="slice-results" aria-live="polite">
      <div class="slice-histogram-panel"><div class="slice-panel-heading"><span>Invocation latency</span><strong id="slice-range">1.00 ms – 36.50 ms</strong></div><div class="slice-histogram" id="slice-histogram" role="img" aria-label="Latency histogram"></div><div class="slice-axis"><span>fast</span><span>slow tail →</span></div></div>
      <div class="slice-metrics" id="slice-metrics"></div>
    </div>
    <div class="screenshot-grid slice-screenshots">
      <figure class="screenshot-card"><div class="screenshot-frame"><img src="../assets/slice/p0-p100.png" alt="Slice viewer showing the complete invocation population" loading="lazy"></div><figcaption><strong>01 / See the population</strong><span>Time and thread activity provide context before the latency window is narrowed.</span></figcaption></figure>
      <figure class="screenshot-card"><div class="screenshot-frame"><img src="../assets/slice/p95-p100.png" alt="Slice viewer showing the p95 to p100 slow tail" loading="lazy"></div><figcaption><strong>02 / Explain the tail</strong><span>The histogram selection carries through to the timeline, metrics, and sampled execution paths.</span></figcaption></figure>
    </div>
  </div>`;

  const detail = root.querySelector("#slice-phase-detail");
  const status = root.querySelector("#slice-status");
  const histogram = root.querySelector("#slice-histogram");
  const metrics = root.querySelector("#slice-metrics");
  const percentile = root.querySelector("#slice-percentile");
  const time = root.querySelector("#slice-time");
  const thread = root.querySelector("#slice-thread");
  const phaseButtons = [...root.querySelectorAll("[data-slice-phase]")];

  const renderPhase = (id) => {
    const phase = slicePhases[id];
    detail.innerHTML = `<div class="phase-route"><div><span>Question</span><strong>${phase.copy}</strong></div><b aria-hidden="true">→</b><div class="phase-output"><span>Command shape</span><code>${phase.source}</code></div></div><p class="phase-copy">${phase.route.map((item, index) => `${index ? " → " : ""}<strong>${item}</strong>`).join("")}</p>`;
    status.textContent = id === "symbols" ? "Input: a human match" : id === "profile" ? "State: capturing" : "View: p95:p100";
  };

  const renderSelection = () => {
    const isP99 = percentile.value === "p99";
    const isTail = percentile.value !== "all";
    const selected = isP99 ? "54" : isTail ? "266" : "5,337";
    const sampled = isP99 ? "126" : isTail ? "604" : "22,429";
    const cpu = isP99 ? "142.10 ms" : isTail ? "604.60 ms" : "22,451 ms";
    const range = isP99 ? "31.20 ms – 36.50 ms" : isTail ? "25.17 ms – 36.50 ms" : "1.00 ms – 36.50 ms";
    const bars = [18, 26, 33, 42, 51, 61, 72, 82, 86, 78, 69, 59, 48, 39, 30, 24, 18, 13, 10, 7, 5, 4];
    histogram.innerHTML = bars.map((height, index) => `<i class="slice-bar${isTail && index > 15 ? " is-selected" : ""}" style="--bar-height:${height}%"></i>`).join("");
    root.querySelector("#slice-range").textContent = range;
    metrics.innerHTML = `<div class="widget-card"><strong>${selected}</strong><span>selected invocations</span></div><div class="widget-card"><strong>${sampled}</strong><span>selected samples</span></div><div class="widget-card"><strong>${cpu}</strong><span>sampled CPU / off-CPU</span></div>`;
    status.textContent = `${time.value === "full" ? "Full capture" : time.value === "active" ? "Active window" : "Tail window"} · ${thread.value === "all" ? "all threads" : thread.value === "workers-a" ? "workers 0–2" : "workers 3–5"} · ${isP99 ? "p99:p100" : isTail ? "p95:p100" : "p0:p100"}`;
  };

  phaseButtons.forEach((button) => button.addEventListener("click", () => {
    phaseButtons.forEach((item) => { item.classList.toggle("is-active", item === button); item.setAttribute("aria-selected", item === button); });
    renderPhase(button.dataset.slicePhase);
  }));
  [percentile, time, thread].forEach((control) => control.addEventListener("change", renderSelection));
  renderPhase("symbols");
  renderSelection();
}

window.projectWidgets = window.projectWidgets || {};
window.projectWidgets.slice = renderSlice;
