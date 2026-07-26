// Módulos del inicio. Añadir uno nuevo = añadir un objeto aquí.
const cardsData = [
  {
    title: "Consultar NIMA",
    description: "Accede a los buscadores oficiales de cada comunidad autónoma desde un único listado.",
    link: "./html/consultanima.html",
    external: false
  },
  {
    title: "Búsqueda LER",
    description: "Encuentra un código LER por descripción, código o palabra clave entre los 833 registros.",
    link: "./html/buscadorler.html",
    external: false
  },
  {
    title: "Guía Residuos",
    description: "Explora los 20 capítulos del catálogo europeo y copia el código que necesites.",
    link: "./html/guiaresiduos.html",
    external: false
  },
  {
    title: "Realizar NT",
    description: "Notificación previa de traslado, en la sede electrónica del MITECO.",
    link: "https://sede.miteco.gob.es/portal/site/seMITECO/login",
    external: true
  },
  {
    title: "Realizar DI",
    description: "Documento de identificación de traslado de residuos.",
    link: "https://esir.miteco.gob.es/esir-web-adv/",
    external: true
  },
  {
    title: "Comprobar CSV",
    description: "Verifica la autenticidad de un Código Seguro de Verificación.",
    link: "https://sede.miteco.gob.es/portal/site/seMITECO/navValidacionCSV?accionClass=validacionCSVAction",
    external: true
  }
];

const arrowIcon = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8.5 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.7L4.85 12.35a.5.5 0 1 1-.7-.7L11.8 4H9a.5.5 0 0 1-.5-.5z"/></svg>`;

const grid = document.getElementById("modules-grid");

cardsData.forEach((card, i) => {
  const num = String(i + 1).padStart(2, "0");
  const a = document.createElement("a");
  a.className = "card";
  a.href = card.link;
  if (card.external) {
    a.target = "_blank";
    a.rel = "noopener";
  }
  a.innerHTML = `
    <span class="num">${num}</span>
    <h3>${card.title}</h3>
    <p>${card.description}</p>
    <span class="go">${card.external ? "Ir a la sede ↗" : `Abrir ${arrowIcon}`}</span>
  `;
  grid.appendChild(a);
});

// Fichas de ejemplo del hero: 3 códigos LER al azar en cada carga de la página.
function formatearCodigo(codigo) {
  const asterisco = codigo.endsWith("*") ? "*" : "";
  const digitos = asterisco ? codigo.slice(0, -1) : codigo;
  return digitos.match(/.{1,2}/g).join(" ") + asterisco;
}

function truncar(texto, maxLen) {
  return texto.length > maxLen ? texto.slice(0, maxLen - 1).trim() + "…" : texto;
}

function elegirAleatorios(lista, cantidad) {
  const copia = [...lista];
  const elegidos = [];
  for (let i = 0; i < cantidad && copia.length; i++) {
    const indice = Math.floor(Math.random() * copia.length);
    elegidos.push(copia.splice(indice, 1)[0]);
  }
  return elegidos;
}

fetch('./data/ler-data.json')
  .then(response => {
    if (!response.ok) throw new Error('Respuesta no válida del servidor');
    return response.json();
  })
  .then(data => {
    const stack = document.getElementById("ticket-stack");
    if (!stack) return;

    const ejemplos = elegirAleatorios(data, 3);
    stack.innerHTML = ejemplos.map((item, i) => {
      const tagClase = item.peligroso ? "is-hazard" : "is-safe";
      const dotClase = item.peligroso ? "dot-h" : "dot-n";
      const tagTexto = item.peligroso ? "Peligroso" : "No peligroso";
      return `
        <div class="ticket t${i + 1}">
          <div class="code mono">${formatearCodigo(item.codigo)}</div>
          <div class="desc">${truncar(item.descripcion, 55)}</div>
          <span class="hazard-tag ${tagClase}"><span class="dot ${dotClase}"></span>${tagTexto}</span>
        </div>
      `;
    }).join("");
  })
  .catch(error => console.error('No se pudieron cargar ejemplos de LER para el hero:', error));
