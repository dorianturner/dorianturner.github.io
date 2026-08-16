function renderWacc(root) {
  const stages = [
    { name: "Lex + parse", input: "WACC source", output: "AST", detail: "Parsley’s lexer turns characters into tokens and the parser constructs the parameterised program tree.", modules: "frontend/lexer.scala · frontend/parser.scala" },
    { name: "Resolve + typecheck", input: "AST + imports", output: "typed AST", detail: "Imports are resolved, identifiers are renamed to their bindings, and structural type constraints are checked before lowering.", modules: "frontend/importResolver.scala · renamer.scala · typechecker.scala" },
    { name: "TACify", input: "typed AST", output: "block TAC", detail: "Expressions and statements become machine-independent three-address instructions with labels and block terminators.", modules: "tacifier.scala" },
    { name: "Optimise CFG", input: "block TAC", output: "stable TAC", detail: "When -O is enabled, the optimiser repeats constant folding, propagation, dead-code elimination, and copy propagation until stable.", modules: "backend/cfg/tacoptim.scala" },
    { name: "Virtualise + map", input: "stable TAC", output: "target allocation", detail: "Target-sized virtual registers are created, then mapped to physical registers or stack locations using the selected allocation strategy.", modules: "virtualiser.scala · mapper.scala · colourMapper.scala" },
    { name: "Expand + emit", input: "mapped IR", output: "assembly", detail: "Target-specific expansion selects concrete instructions, adds runtime support, and writes x86-64 or ARM32 assembly.", modules: "x86Expander.scala · arm32Expander.scala · *Generator.scala" },
  ];
  root.innerHTML = `<div class="phase-toolbar"><div class="control"><label for="wacc-target">Backend target</label><select id="wacc-target"><option>x86-64</option><option>ARM32</option></select></div><span class="widget-status" id="wacc-status">Phase 1 / Lex + parse</span></div><div class="phase-tabs" id="wacc-pipeline"></div><div class="phase-detail" id="wacc-detail"></div>`;
  const pipeline = root.querySelector("#wacc-pipeline"), detail = root.querySelector("#wacc-detail"), status = root.querySelector("#wacc-status"), target = root.querySelector("#wacc-target");
  let active = 0;
  const render = () => {
    const stage = stages[active];
    pipeline.innerHTML = stages.map((item, index) => `<button class="phase-tab ${index === active ? "is-active" : ""}" data-stage="${index}" type="button"><span>${String(index + 1).padStart(2, "0")}</span><strong>${item.name}</strong></button>`).join("");
    detail.innerHTML = `<div class="phase-route"><div><span>Input</span><strong>${stage.input}</strong></div><b aria-hidden="true">→</b><div class="phase-output"><span>Representation</span><strong>${stage.output}${active === stages.length - 1 ? ` · ${target.value}` : ""}</strong></div></div><p class="phase-copy">${stage.detail}</p><p class="phase-source">${stage.modules}</p>`;
    status.textContent = `Phase ${active + 1} / ${stage.name}`;
    pipeline.querySelectorAll("[data-stage]").forEach((button) => button.addEventListener("click", () => { active = Number(button.dataset.stage); render(); }));
  };
  target.addEventListener("input", render); render();
}

window.projectWidgets = window.projectWidgets || {};
window.projectWidgets.wacc = renderWacc;
