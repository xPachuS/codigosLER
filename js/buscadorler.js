let datosLER = [];

fetch('ler-data.json')
  .then(response => response.json())
  .then(data => {
    datosLER = data;
    document.getElementById('busqueda').addEventListener('input', buscar);
    document.getElementById('filtrarPeligrosos').addEventListener('change', buscar);
    document.getElementById('filtrarNoPeligrosos').addEventListener('change', buscar);
    document.getElementById('copiarPeligrosos').addEventListener('click', copiarPeligrosos);
    document.getElementById('copiarNoPeligrosos').addEventListener('click', copiarNoPeligrosos);
  });

function buscar() {
  const query = document.getElementById('busqueda').value.toLowerCase();
  const soloPeligrosos = document.getElementById('filtrarPeligrosos').checked;
  const soloNoPeligrosos = document.getElementById('filtrarNoPeligrosos').checked;

  const resultados = datosLER.filter(item => {
    const coincideTexto = item.descripcion.toLowerCase().includes(query) ||
                          item.palabras_clave.some(p => p.includes(query));
    const coincideFiltro = (soloPeligrosos && item.peligroso) || (soloNoPeligrosos && !item.peligroso) || (!soloPeligrosos && !soloNoPeligrosos);
    return coincideTexto && coincideFiltro;
  });

  mostrar(resultados);
}

function mostrar(resultados) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="text-gray-500">No se encontraron resultados.</p>';
    return;
  }

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = `bg-white p-4 rounded-lg shadow border-l-4 ${item.peligroso ? 'border-red-500' : 'border-green-500'}`;

    const peligroTag = item.peligroso
      ? '<span class="ml-2 inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Peligroso</span>'
      : '<span class="ml-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">No peligroso</span>';

    div.innerHTML = `
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg text-gray-800">${item.codigo}</h2>
        ${peligroTag}
      </div>
      <p class="text-gray-700 mt-1">${item.descripcion}</p>
      <p class="text-sm text-gray-500 mt-2">Categoría: ${item.categoria}</p>
    `;

    contenedor.appendChild(div);
  });
}

// Función para copiar los peligrosos
function copiarPeligrosos() {
  const peligrosos = datosLER.filter(item => item.peligroso);
  const texto = peligrosos.map(item => `${item.codigo} - ${item.descripcion}`).join('\n');
  copiarTexto(texto);
}

// Función para copiar los no peligrosos
function copiarNoPeligrosos() {
  const noPeligrosos = datosLER.filter(item => !item.peligroso);
  const texto = noPeligrosos.map(item => `${item.codigo} - ${item.descripcion}`).join('\n');
  copiarTexto(texto);
}

// Función auxiliar para copiar texto al portapapeles
function copiarTexto(texto) {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Texto copiado al portapapeles');
}
