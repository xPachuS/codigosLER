const categoryList = document.getElementById("category-list");
const residueList = document.getElementById("residue-list");
const categorySection = document.getElementById("categories");
const wasteSection = document.getElementById("waste-list");
const backButtonContainer = document.getElementById("back-button-container");

fetch('../data/ler-data.json')
  .then(response => {
    if (!response.ok) throw new Error('Respuesta no válida del servidor');
    return response.json();
  })
  .then(data => {
    const categorias = [...new Set(data.map(residuo => residuo.categoria))].sort();

    categorias.forEach(categoria => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn";
      btn.innerHTML = `
        <span class="icon" aria-hidden="true">${getCategoryIcon(categoria)}</span>
        <span class="label">Categoría ${categoria}</span>
      `;
      btn.addEventListener("click", () => showResiduosPorCategoria(categoria, data));
      li.appendChild(btn);
      categoryList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error al cargar los datos JSON:', error);
    categoryList.innerHTML = `<li class="empty-state is-error" style="grid-column:1/-1">No se han podido cargar los residuos. Recarga la página.</li>`;
  });

function showResiduosPorCategoria(categoria, residuos) {
  categorySection.hidden = true;
  wasteSection.hidden = false;
  backButtonContainer.hidden = false;

  residueList.innerHTML = '';

  const residuosFiltrados = residuos.filter(r => r.categoria === categoria);

  residuosFiltrados.forEach(residuo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "residue-card";
    const tag = residuo.peligroso
      ? `<span class="hazard-tag is-hazard"><span class="dot dot-h"></span>Peligroso</span>`
      : `<span class="hazard-tag is-safe"><span class="dot dot-n"></span>No peligroso</span>`;
    btn.innerHTML = `
      <div class="residue-head">
        <div class="code mono">${residuo.codigo}</div>
        <p>${residuo.descripcion}</p>
      </div>
      ${tag}
    `;
    btn.addEventListener("click", () => {
      copiarAlPortapapeles(residuo.codigo, `Código LER copiado: ${residuo.codigo}`);
    });
    li.appendChild(btn);
    residueList.appendChild(li);
  });
}

function getCategoryIcon(categoria) {
  const iconos = {
    '01': '🪓', '02': '🌿', '03': '🪵', '04': '🧵', '05': '🛢️',
    '06': '🧪', '07': '🔥', '08': '🎨', '09': '🎞️', '10': '🌡️',
    '11': '⚙️', '12': '🔩', '13': '⛽', '14': '🧴', '15': '🗑️',
    '16': '❓', '17': '🏗️', '18': '💉', '19': '💧', '20': '🚮'
  };
  return iconos[categoria] || '🔶';
}

document.getElementById("btnVolver").addEventListener("click", () => {
  categorySection.hidden = false;
  wasteSection.hidden = true;
  backButtonContainer.hidden = true;
});
