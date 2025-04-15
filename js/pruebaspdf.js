const registros = JSON.parse(localStorage.getItem('registros') || '[]');
actualizarTabla(); // carga los registros guardados

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
      registros.push(fila);
      registros.sort((a, b) => a.origen.localeCompare(b.origen));
      localStorage.setItem('registros', JSON.stringify(registros));
      actualizarTabla();
    };
  };

  fileReader.readAsArrayBuffer(file);
});

// Actualiza tabla desde registros
function actualizarTabla() {
  const tbody = document.querySelector('#tabla-resultados tbody');
  tbody.innerHTML = '';
  registros.forEach((r, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.origen}</td>
      <td>${r.destino}</td>
      <td>${r.ler}</td>
      <td>${r.inicio}</td>
      <td>${r.fin}</td>
      <td>${r.dias}</td>
      <td>${r.nt}</td>
      <td><button onclick="eliminarRegistro(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Eliminar un registro con confirmación
function eliminarRegistro(index) {
  const confirmar = confirm("¿Estás seguro de que quieres eliminar este registro?");
  if (!confirmar) return;

  registros.splice(index, 1);
  localStorage.setItem('registros', JSON.stringify(registros));
  actualizarTabla();
}

// Exportar tabla a Excel
document.getElementById('exportar-excel').addEventListener('click', () => {
  const table = document.getElementById('tabla-resultados');
  const wb = XLSX.utils.table_to_book(table, { sheet: "Registros" });
  XLSX.writeFile(wb, "registros.xlsx");
});

// Exportar tabla a PDF
document.getElementById('exportar-pdf').addEventListener('click', () => {
  const doc = new jspdf.jsPDF();
  doc.autoTable({ html: '#tabla-resultados' });
  doc.save('registros.pdf');
});

