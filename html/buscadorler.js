let datosLER = [];

fetch('ler-data.json')  // Asegúrate de que la ruta sea correcta
  .then(response => response.json())
  .then(data => {
    datosLER = data;
    document.getElementById('busqueda').addEventListener('input', buscar);
    document.getElementById('filtrarPeligrosos').addEventListener('change', buscar);
    document.getElementById('filtrarNoPeligrosos').addEventListener('change', buscar);

    // Agregar eventos a los botones de copiar
    document.getElementById('copiarPeligrosos').addEventListener('click', copiarPeligrosos);
    document.getElementById('copiarNoPeligrosos').addEventListener('click', copiarNoPeligrosos);
  })
  .catch(error => console.error("Error al cargar el archivo JSON:", error));

function buscar() {
  const query = document.getElementById('busqueda').value.toLowerCase();
  const soloPeligrosos = document.getElementById('filtrarPeligrosos').checked;
  const soloNoPeligrosos = document.getElementById('filtrarNoPeligrosos').checked;

  // Filtrar los datos basados en el texto de búsqueda y los filtros
  const resultados = datosLER.filter(item => {
    // Verificamos si el código LER, la descripción o las palabras clave coinciden con la búsqueda
    const coincideTexto = item.codigo.toLowerCase().includes(query) ||  // Buscamos también en el código LER
                          item.descripcion.toLowerCase().includes(query) ||
                          item.palabras_clave.some(p => p.includes(query));

    // Lógica de los filtros: mostrar solo peligrosos o solo no peligrosos
    const coincidePeligroso = soloPeligrosos ? item.peligroso : true;
    const coincideNoPeligroso = soloNoPeligrosos ? !item.peligroso : true;

    return coincideTexto && coincidePeligroso && coincideNoPeligroso;
  });

  mostrar(resultados);
}

function mostrar(resultados) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="text-gray-500 text-center">No se encontraron resultados.</p>';
    return;
  }

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = `bg-white p-6 rounded-lg shadow-lg border-l-8 ${
      item.peligroso ? 'border-red-500' : 'border-green-500'
    } transition-all transform hover:scale-105 hover:shadow-xl`;

    const peligroTag = item.peligroso
      ? '<span class="ml-2 inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">Peligroso</span>'
      : '<span class="ml-2 inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">No peligroso</span>';

    div.innerHTML = `
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-800">${item.codigo}</h2>
        ${peligroTag}
      </div>
      <p class="text-gray-700 mt-2">${item.descripcion}</p>
      <p class="text-sm text-gray-500 mt-2">Categoría: ${item.categoria}</p>
    `;

    contenedor.appendChild(div);
  });
}

// Función para copiar los LER peligrosos
function copiarPeligrosos() {
  const peligrosos = datosLER.filter(item => item.peligroso);
  const listaPeligrosos = peligrosos.map(item => item.codigo.replace('*', '')).join('\n');
  
  copiarAlPortapapeles(listaPeligrosos);
}

// Función para copiar los LER no peligrosos
function copiarNoPeligrosos() {
  const noPeligrosos = datosLER.filter(item => !item.peligroso);
  const listaNoPeligrosos = noPeligrosos.map(item => item.codigo).join('\n');
  
  copiarAlPortapapeles(listaNoPeligrosos);
}

// Función para copiar al portapapeles
function copiarAlPortapapeles(texto) {
  const textoArea = document.createElement('textarea');
  textoArea.value = texto;
  document.body.appendChild(textoArea);
  textoArea.select();
  document.execCommand('copy');
  document.body.removeChild(textoArea);

  alert('¡Lista copiada al portapapeles!');
}
