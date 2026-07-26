let datosLER = [];

const contenedor = document.getElementById('resultados');

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // quita acentos para comparar
}

fetch('../data/ler-data.json')
  .then(response => {
    if (!response.ok) throw new Error('Respuesta no válida del servidor');
    return response.json();
  })
  .then(data => {
    datosLER = data;
    document.getElementById('busqueda').addEventListener('input', buscar);
    document.getElementById('filtrarPeligrosos').addEventListener('change', buscar);
    document.getElementById('filtrarNoPeligrosos').addEventListener('change', buscar);
    document.getElementById('copiarPeligrosos').addEventListener('click', copiarPeligrosos);
    document.getElementById('copiarNoPeligrosos').addEventListener('click', copiarNoPeligrosos);

    buscar(); // Muestra la lista completa nada más entrar, sin esperar a la primera búsqueda
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
    contenedor.innerHTML = `<p class="empty-state is-error">No se han podido cargar los códigos LER. Recarga la página; si el problema persiste, avisa al administrador del sitio.</p>`;
  });

function buscar() {
  const query = normalizar(document.getElementById('busqueda').value);
  const soloPeligrosos = document.getElementById('filtrarPeligrosos').checked;
  const soloNoPeligrosos = document.getElementById('filtrarNoPeligrosos').checked;

  const resultados = datosLER.filter(item => {
    const coincideTexto =
      normalizar(item.codigo).includes(query) ||
      normalizar(item.descripcion).includes(query) ||
      item.palabras_clave.some(p => normalizar(p).includes(query));

    const coincidePeligroso = soloPeligrosos ? item.peligroso : true;
    const coincideNoPeligroso = soloNoPeligrosos ? !item.peligroso : true;

    return coincideTexto && coincidePeligroso && coincideNoPeligroso;
  });

  mostrar(resultados);

  document.getElementById('codigoSugerido').textContent =
    query && resultados.length > 0 ? resultados[0].codigo : 'Ninguno aún…';
}

function mostrar(resultados) {
  contenedor.innerHTML = '';

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="empty-state">No se encontraron resultados para esa búsqueda.</p>';
    return;
  }

  const frag = document.createDocumentFragment();

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = `result-item${item.peligroso ? ' is-hazard' : ''}`;

    const tag = item.peligroso
      ? `<span class="hazard-tag is-hazard"><span class="dot dot-h"></span>Peligroso</span>`
      : `<span class="hazard-tag is-safe"><span class="dot dot-n"></span>No peligroso</span>`;

    div.innerHTML = `
      <div class="result-head">
        <h2 class="mono">${item.codigo}</h2>
        ${tag}
      </div>
      <p>${item.descripcion}</p>
      <p class="cat">Categoría ${item.categoria}</p>
    `;
    frag.appendChild(div);
  });

  contenedor.appendChild(frag);
}

function copiarPeligrosos() {
  const lista = datosLER
    .filter(item => item.peligroso)
    .map(item => item.codigo.replace('*', ''))
    .join('\n');
  copiarAlPortapapeles(lista, 'Lista de LER peligrosos copiada al portapapeles.');
}

function copiarNoPeligrosos() {
  const lista = datosLER
    .filter(item => !item.peligroso)
    .map(item => item.codigo)
    .join('\n');
  copiarAlPortapapeles(lista, 'Lista de LER no peligrosos copiada al portapapeles.');
}
