// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSvurzqOBDPqxNXv9--10rA5I49nN_bxE",
  authDomain: "dbpdf-e63f7.firebaseapp.com",
  projectId: "dbpdf-e63f7",
  storageBucket: "dbpdf-e63f7.appspot.com",
  messagingSenderId: "174689987018",
  appId: "1:174689987018:web:6ba9c09a578d2439070733",
  measurementId: "G-7DF5EQ7YCD"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const registrosRef = db.ref('registros');

// Cargar registros de Firebase y actualizar la tabla
registrosRef.on('value', (snapshot) => {
  const registros = snapshot.val() || {};
  actualizarTabla(registros);
});

// Cargar la tabla con los registros
function actualizarTabla(registros) {
  const tbody = document.querySelector('#tabla-resultados tbody');
  tbody.innerHTML = '';  // Limpiar tabla antes de añadir los registros
  for (const key in registros) {
    const registro = registros[key];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${registro.origen}</td>
      <td>${registro.destino}</td>
      <td>${registro.ler}</td>
      <td>${registro.inicio}</td>
      <td>${registro.fin}</td>
      <td>${registro.dias}</td>
      <td>${registro.nt}</td>
      <td><button onclick="eliminarRegistro('${key}')">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  }
}

// Eliminar un registro de Firebase
function eliminarRegistro(id) {
  registrosRef.child(id).remove();
}

// Procesar el archivo PDF y extraer información
document.getElementById('file-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const resultado = document.getElementById('resultado');
  resultado.textContent = 'Analizando...';

  const fileReader = new FileReader();

  fileReader.onload = async function () {
    const typedarray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

    let textoTotal = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const textoPagina = textContent.items.map(item => item.str).join(' ');
      textoTotal += textoPagina + '\n';
    }

    textoTotal = textoTotal.replace(/\b[A-ZÑÁÉÍÓÚÜ0-9\s\.\-]+?,?\s?(?:S\.?A\.?U?\.?|S\.?L\.?U?\.?)\b[\s\S]{0,100}?\bNombre\s*NIMA\s*[AB]\d{8}\b/gi, '');
    textoTotal = textoTotal.replace(/\bNombre\s*NIMA\s*[AB]\d{8}\b/gi, '');

    let ntMatches = textoTotal.match(/NT\d+/gi) || [];
    ntMatches = ntMatches.slice(1);

    let fechaMatches = textoTotal.match(/\b(?:\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})\b/g) || [];
    fechaMatches = fechaMatches.slice(1);

    const esFechaValida = (fecha) => {
      const sep = fecha.includes('/') ? '/' : '-';
      const partes = fecha.split(sep).map(Number);
      let dia, mes, año;
      if (partes[0] > 31) [año, mes, dia] = partes;
      else [dia, mes, año] = partes;
      const date = new Date(`${año}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`);
      return date && date.getFullYear() === año && date.getMonth() + 1 === mes && date.getDate() === dia;
    };

    const fechasFormateadas = fechaMatches.filter(esFechaValida).map(fecha => {
      const sep = fecha.includes('/') ? '/' : '-';
      const partes = fecha.split(sep);
      if (partes[0].length === 4) return `${partes[2]}-${partes[1]}-${partes[0]}`;
      return `${partes[0]}-${partes[1]}-${partes[2]}`;
    });

    const inicioValidez = fechasFormateadas[0] || 'No encontrada';
    const finValidez = fechasFormateadas[1] || 'No encontrada';
    const fechaFinValidez = new Date(finValidez.split('-').reverse().join('-'));
    const fechaLimite = new Date(fechaFinValidez); fechaLimite.setDate(fechaLimite.getDate() - 11);
    const fechaActual = new Date();
    const mostrarFechaRoja = fechaActual >= fechaLimite;
    const diasRestantes = Math.ceil((fechaFinValidez - fechaActual) / (1000 * 60 * 60 * 24));
    const diasTexto = diasRestantes >= 0 ? `${diasRestantes} días` : 'Fecha pasada';

    const razonSocialRegex = /\b([A-ZÑÁÉÍÓÚÜ0-9\s\.\-]+?,\s?(?:S\.?A\.?U?\.?|S\.?L\.?U?\.?))\b/gi;
    const razonSocialMatches = textoTotal.match(razonSocialRegex) || [];
    const razonSocialesLimpias = [...new Set(razonSocialMatches.map(r => r.trim()))];

    const razonSocialOrigen = razonSocialesLimpias[1] || 'No encontrada';
    const razonSocialDestino = razonSocialesLimpias[2] || 'No encontrada';

    const lerRegex = /\b\d{6}\b|\b\d{8}\b/g;
    const lerMatches = textoTotal.match(lerRegex) || [];
    const segundoCodigoLER = lerMatches.filter(c => parseInt(c) >= 10101)[1] || 'No encontrado';

    resultado.innerHTML = `
      <b>Número NT:</b> ${ntMatches[0] || 'No encontrado'}<br><br>
      <b>Inicio Validez:</b> ${inicioValidez}<br>
      <b>Fin Validez:</b> <span class="${mostrarFechaRoja ? 'fecha-roja' : ''}">${finValidez} (${diasTexto})</span><br><br>
      <b>Origen:</b> ${razonSocialOrigen}<br>
      <b>Destino:</b> ${razonSocialDestino}<br><br>
      <b>LER:</b> ${segundoCodigoLER}
    `;

    document.getElementById('guardar-btn').style.display = 'inline-block';
    document.getElementById('guardar-btn').onclick = () => {
      const fila = {
        origen: razonSocialOrigen,
        destino: razonSocialDestino,
        ler: segundoCodigoLER,
        inicio: inicioValidez,
        fin: finValidez,
        dias: diasTexto,
        nt: ntMatches[0] || 'No encontrado'
      };

      // Guardar en Firebase
      registrosRef.push(fila);
    };
  };

  fileReader.readAsArrayBuffer(file);
});
