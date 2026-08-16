function renderCocktailPi(root) {
  const drinks = { "Sunrise Splash": [4, 0, 4, 2, 0], "Tropical Fizz": [6, 0, 2, 2, 0], "Orange Sparkler": [0, 0, 4, 2, 0], "Pineapple Grenadine Spritz": [6, 0, 0, 4, 3], "Sunset Refresher": [4, 0, 0, 4, 3] };
  const ingredients = ["Vodka", "Rum", "Triple sec", "Lime juice", "Cranberry juice"];
  root.innerHTML = `<div class="widget-toolbar"><div class="control"><label for="drink-select">Recipe</label><select id="drink-select">${Object.keys(drinks).map((drink) => `<option>${drink}</option>`).join("")}</select></div><button id="pour-drink" type="button">Run dispense sequence</button></div><p class="widget-status" id="pour-status">Pump durations use 0.25 seconds per millilitre.</p><div class="widget-grid" id="pump-grid"></div>`;
  const select = root.querySelector("#drink-select"), button = root.querySelector("#pour-drink"), grid = root.querySelector("#pump-grid"), status = root.querySelector("#pour-status");
  let active = false;
  const render = () => { const parts = drinks[select.value]; grid.innerHTML = ingredients.map((ingredient, index) => { const seconds = parts[index] * .25; return `<div class="widget-card"><strong>${ingredient}</strong><span>${parts[index]} parts</span><span>${seconds.toFixed(2)} s pump time</span><div class="pump-bar" style="--pump:${Math.max(4, parts[index] * 18)}%"><i class="${active && parts[index] ? "is-running" : ""}"></i></div></div>`; }).join(""); };
  select.addEventListener("input", () => { active = false; render(); status.textContent = "Recipe loaded / buttons and LCD select state represented"; });
  button.addEventListener("click", () => { active = true; render(); status.textContent = `Dispensing ${select.value} / active pumps run in parallel`; window.setTimeout(() => { active = false; render(); status.textContent = "FinishDispensing / all pumps stopped"; }, 1300); }); render();
}

window.projectWidgets = window.projectWidgets || {};
window.projectWidgets["cocktail-pi"] = renderCocktailPi;
