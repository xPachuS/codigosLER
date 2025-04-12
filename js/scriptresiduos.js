// Cargar el archivo JSON de residuos
fetch('ler-data.json')
  .then(response => response.json())
  .then(data => {
    // Extraer las categorías únicas
    const categorias = [...new Set(data.map(residuo => residuo.categoria))];
    
    // Mostrar las categorías
    const categoryList = document.getElementById("category-list");
    categorias.forEach(categoria => {
      const li = document.createElement("li");
      li.classList.add('cursor-pointer', 'text-indigo-600', 'hover:text-indigo-800', 'transition', 'duration-200', 'font-medium', 'text-center', 'rounded-lg', 'hover:bg-indigo-50', 'py-6', 'flex', 'items-center', 'justify-center', 'group', 'shadow-lg', 'hover:shadow-xl');
      
      const icon = getCategoryIcon(categoria);
      
      li.innerHTML = `
        <div class="flex flex-col items-center justify-center space-y-2 group-hover:scale-105">
          <div class="text-4xl">${icon}</div>
          <span class="text-lg group-hover:text-indigo-700">${'Categoría ' + categoria}</span>
        </div>
      `;
      
      li.onclick = () => showResiduosPorCategoria(categoria, data);
      categoryList.appendChild(li);
    });
  })
  .catch(error => console.error('Error al cargar los datos JSON:', error));

// Función para mostrar residuos según la categoría seleccionada
function showResiduosPorCategoria(categoria, residuos) {
  const categorySection = document.getElementById("categories");
  const wasteSection = document.getElementById("waste-list");
  const residueList = document.getElementById("residue-list");
  const backButtonContainer = document.getElementById("back-button-container");

  // Ocultar las categorías y mostrar los residuos
  categorySection.classList.add('hidden');
  wasteSection.classList.remove('hidden');
  backButtonContainer.classList.remove('hidden');

  residueList.innerHTML = ''; // Limpiar lista previa

  // Filtrar residuos por categoría
  const residuosFiltrados = residuos.filter(residuo => residuo.categoria === categoria);

  residuosFiltrados.forEach(residuo => {
    const li = document.createElement("li");
    li.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition', 'duration-200', 'cursor-pointer', 'hover:scale-105', 'h-60'); // h-60 es la clase para altura fija (256px)

    li.innerHTML = `
      <div class="space-y-2 h-full flex flex-col justify-between">
        <p class="text-sm font-semibold text-gray-800">${residuo.descripcion}</p>
        <span class="text-sm text-gray-500">Código: ${residuo.codigo}</span>
        <div class="mt-4">
          <span class="px-4 py-1 text-xs font-semibold ${residuo.peligroso ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'} rounded-full">
            ${residuo.peligroso ? 'Peligroso' : 'No Peligroso'}
          </span>
        </div>
      </div>
    `;

    // Evento para copiar el código LER al hacer clic en el residuo
    li.onclick = () => {
      navigator.clipboard.writeText(residuo.codigo).then(() => {
        alert('Código LER copiado: ' + residuo.codigo); // Muestra una alerta cuando se copia el código
      }).catch(err => {
        console.error('Error al copiar el código: ', err);
      });
    };

    residueList.appendChild(li);
  });
}

// Función para obtener el icono según la categoría
function getCategoryIcon(categoria) {
  switch (categoria) {
    case '01':
      return '🪓'; // Icono para minería (pico o hacha)
    case '02':
      return '🌿'; // Icono para residuos orgánicos (planta)
    case '03':
      return '🪵'; // Icono para residuos industriales (fábrica)
    case '04':
      return '🧵'; // Icono para reciclaje
    case '05':
      return '🛢️'; // Icono para residuos peligrosos (calavera)
    case '06':
      return '🧪'; // Icono para residuos domésticos (papelera)
    case '07':
      return '🔥'; // Icono para residuos electrónicos (teléfono móvil)
    case '08':
      return '🎨'; // Icono para plásticos (botella de plástico)
    case '09':
      return '🎞️'; // Icono para textiles (vestido)
    case '10':
      return '🌡️'; // Icono para papel y cartón (caja de cartón)
    case '11':
      return '⚙️'; // Icono para madera (tronco de madera)
    case '12':
      return '🔩'; // Icono para metálicos (pieza metálica)
    case '13':
      return '⛽'; // Icono para peligrosos específicos (extintor)
    case '14':
      return '🧴'; // Icono para caucho y neumáticos (coche)
    case '15':
      return '🗑️'; // Icono para residuos sanitarios (hospital)
    case '16':
      return '❓'; // Icono para residuos de envases y embalajes (caja)
    case '17':
      return '🏗️'; // Icono para residuos de construcción y demolición (grúa)
    case '18':
      return '💉'; // Icono para residuos sanitarios y de salud (jeringa)
    case '19':
      return '💧'; // Icono para residuos agrícolas y de alimentos (espiga de trigo)
    case '20':
      return '🚮'; // Icono para residuos químicos (probeta)
    default:
      return '🔶'; // Icono genérico si no se encuentra categoría
  }
}

// Función para volver a mostrar las categorías
function goBack() {
  const categorySection = document.getElementById("categories");
  const wasteSection = document.getElementById("waste-list");
  const backButtonContainer = document.getElementById("back-button-container");

  categorySection.classList.remove('hidden');
  wasteSection.classList.add('hidden');
  backButtonContainer.classList.add('hidden');
}

// Botón "Subir arriba"
const btnSubirArriba = document.getElementById("btnSubirArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnSubirArriba.classList.remove("opacity-0", "pointer-events-none");
  } else {
    btnSubirArriba.classList.add("opacity-0", "pointer-events-none");
  }
});

btnSubirArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
