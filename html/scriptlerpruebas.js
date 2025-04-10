let datosLER = [];

// Cargar datos del archivo JSON
fetch('ler-data.json')
  .then(response => response.json())
  .then(data => {
    datosLER = data;
    document.getElementById('busqueda').addEventListener('input', buscar);
    document.getElementById('filtrarPeligrosos').addEventListener('change', buscar);
  });

// Función de búsqueda
function buscar() {
  const query = document.getElementById('busqueda').value.toLowerCase();
  const soloPeligrosos = document.getElementById('filtrarPeligrosos').checked;

  const resultados = datosLER.filter(item => {
    const coincideCodigo = item.codigo.toLowerCase().includes(query);  // Buscar por código LER
    const coincideTexto = item.descripcion.toLowerCase().includes(query) ||
                          item.palabras_clave.some(p => p.includes(query));
    const coincideFiltro = !soloPeligrosos || item.peligroso;
    return (coincideCodigo || coincideTexto) && coincideFiltro;  // Modificado para que busque también por código
  });

  mostrar(resultados);
}

// Función para mostrar los resultados
function mostrar(resultados) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="text-gray-500">No se encontraron resultados.</p>';
    return;
  }

  resultados.forEach(item => {
    const div = document.createElement('div');
    div.className = `bg-white p-4 rounded-lg shadow border-l-4 ${
      item.peligroso ? 'border-red-500' : 'border-blue-500'
    }`;

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

// Funcionalidad de autocompletado
document.getElementById("busqueda").addEventListener("input", function () {
  const texto = this.value.toLowerCase();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";
  if (texto === "") return;

  const filtrados = datosLER.filter(item =>
    item.codigo.toLowerCase().includes(texto) ||
    item.descripcion.toLowerCase().includes(texto)
  );

  filtrados.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("resultado");
    div.innerHTML = `
      <div class="codigo">${item.codigo} ${item.peligroso ? '<span class="peligroso">(Peligroso)</span>' : ''}</div>
      <div>${item.descripcion}</div>
    `;
    resultados.appendChild(div);
  });
});
