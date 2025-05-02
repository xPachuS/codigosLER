//Conexión FireBase
const firebaseConfig = {
    apiKey: "AIzaSyBKKE_pUzGcnsdwdORPDe4AK_6XSo0DgNg",
    authDomain: "xpachusdb.firebaseapp.com",
    databaseURL: "https://xpachusdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xpachusdb",
    storageBucket: "xpachusdb.firebasestorage.app",
    messagingSenderId: "427397448445",
    appId: "1:427397448445:web:a44c6546228a6fe6153494",
    measurementId: "G-VLBQFHKH66"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const coleccionId = 'hP4a2ZPxJgbU9KS0shlF';





//Cargar Registros
let registros = [];
const storedPasswordHash = '82b9e5ba55d8d0068035b62a15574b387266ce6ca180007c6c49592f9558634f';

window.addEventListener('DOMContentLoaded', cargarRegistros);


async function cargarRegistros() {
    const snapshot = await db.collection(coleccionId).get();
    registros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    registros.sort((a, b) => a.origen.localeCompare(b.origen));
    actualizarTabla();
    // Llamar a la actualización de los días cada 24 horas
    setInterval(actualizarDiasRestantes, 24 * 60 * 60 * 1000); // 24 horas en milisegundos
}

window.addEventListener('DOMContentLoaded', () => {
    cargarRegistros();
    programarActualizacionDiaria();
});

function programarActualizacionDiaria() {
    const ahora = new Date();
    
    // Hora local española (toma en cuenta horario de verano con Intl API)
    const ahoraMadrid = new Date(ahora.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
    
    // Calcular milisegundos hasta la próxima medianoche (hora española)
    const siguienteMedianoche = new Date(ahoraMadrid);
    siguienteMedianoche.setHours(24, 0, 0, 0); // Próxima medianoche

    const msHastaMedianoche = siguienteMedianoche - ahoraMadrid;

    // Esperar hasta la próxima medianoche
    setTimeout(() => {
        actualizarDiasRestantes();

        // Luego repetir cada 24h desde esa medianoche exacta
        setInterval(actualizarDiasRestantes, 24 * 60 * 60 * 1000);

    }, msHastaMedianoche);
}





// Función para obtener el hash de la contraseña
async function getPasswordHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}





// Función para eliminar el registro tras la validación de la contraseña
async function eliminarRegistro(index) {
    const modal = document.getElementById('modal-password');
    const input = document.getElementById('input-password');
    const btnConfirmar = document.getElementById('confirmar-password');
    const btnCancelar = document.getElementById('cancelar-password');
    const errorText = document.getElementById('error-password');

    input.value = '';
    errorText.classList.add('hidden');
    modal.classList.remove('hidden');

    const confirmar = () => {
        const password = input.value;
        if (!password) {
            errorText.textContent = 'La contraseña no puede estar vacía.';
            errorText.classList.remove('hidden');
            return;
        }

        getPasswordHash(password).then(enteredPasswordHash => {
            if (enteredPasswordHash !== storedPasswordHash) {
                errorText.textContent = 'Contraseña incorrecta.';
                errorText.classList.remove('hidden');
                return;
            }

            const confirmacion = confirm("¿Estás seguro de que quieres eliminar este registro?");
            if (!confirmacion) {
                modal.classList.add('hidden');
                return;
            }

            const fila = registros[index];
            const docId = fila.id;

            // Eliminar el PDF
            if (fila.pdfURL) {
                const storageRef = firebase.storage().refFromURL(fila.pdfURL);
                storageRef.delete().catch(error => {
                    console.error("Error al eliminar el PDF:", error);
                    alert("Hubo un error al eliminar el archivo PDF.");
                });
            }

            // Eliminar de Firestore
            db.collection(coleccionId).doc(docId).delete().then(() => {
                registros.splice(index, 1);
                actualizarTabla();
                alert("Registro eliminado con éxito.");
                modal.classList.add('hidden');
            }).catch(error => {
                console.error("Error al eliminar de Firestore:", error);
                alert("Hubo un error al eliminar el registro.");
            });
        });
    };

    const cancelar = () => {
        modal.classList.add('hidden');
    };

    btnConfirmar.onclick = confirmar;
    btnCancelar.onclick = cancelar;

    if (docId) {
        db.collection(coleccionId).doc(docId).delete()
            .then(() => {
                registros.splice(index, 1);
                actualizarTabla();
                alert("Registro eliminado con éxito.");
            })
            .catch((error) => {
                console.error("Error al eliminar de Firestore:", error);
                alert("Hubo un error al eliminar el registro.");
            });
    }
}





//Carga del archivo PDF
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
        const diasTexto = diasRestantes >= 0 ? `${diasRestantes} días` : 'Caducada';

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
            <b>Fin Validez:</b> <span class="${mostrarFechaRoja ? 'text-red-600 font-semibold' : ''}">${finValidez} (${diasTexto})</span><br><br>
            <b>Origen:</b> ${razonSocialOrigen}<br>
            <b>Destino:</b> ${razonSocialDestino}<br><br>
            <b>LER:</b> ${segundoCodigoLER}
        `;

        const guardarBtn = document.getElementById('guardar-btn');
        guardarBtn.style.display = 'inline-block';

        guardarBtn.onclick = async () => {
            if (razonSocialOrigen === 'No encontrada' || razonSocialDestino === 'No encontrada' || segundoCodigoLER === 'No encontrado' || ntMatches[0] === 'No encontrado') {
                document.getElementById('modal-error').classList.remove('hidden');
                document.getElementById('cerrar-modal-error').addEventListener('click', () => {
                document.getElementById('modal-error').classList.add('hidden');
                });

                return; // No guardar el registro
            }

            const nuevoNT = ntMatches[0] || 'No encontrado';

            const ntDuplicado = registros.some(r => r.nt === nuevoNT);

            if (ntDuplicado) {
                document.getElementById('modal-aviso-text').textContent = `Ya existe un registro con el número NT: ${nuevoNT}`;
                document.getElementById('modal-aviso').classList.remove('hidden');
                document.getElementById('cerrar-modal-aviso').addEventListener('click', () => {
                document.getElementById('modal-aviso').classList.add('hidden');
            });

                return;
            }

            const storageRef = firebase.storage().ref();
            const pdfRef = storageRef.child(`pdfs/${file.name}`);
            await pdfRef.put(file);
            const pdfURL = await pdfRef.getDownloadURL();

            const fila = {
                origen: razonSocialOrigen,
                destino: razonSocialDestino,
                ler: segundoCodigoLER,
                inicio: inicioValidez,
                fin: finValidez,
                dias: diasTexto,
                nt: nuevoNT,
                pdfURL: pdfURL
            };

            const docRef = await db.collection(coleccionId).add(fila);
            fila.id = docRef.id;
            registros.push(fila);
            registros.sort((a, b) => a.origen.localeCompare(b.origen));
            actualizarTabla();

            guardarBtn.style.display = 'none';
            resultado.textContent = '';
        };

    };

    fileReader.readAsArrayBuffer(file);
});





//Modificación de la tabla para agregar el enlace al PDF
function actualizarTabla() {
    const tbody = document.querySelector('#tabla-resultados tbody');
    tbody.innerHTML = '';
    registros.forEach((r, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-4 py-2">${r.origen}</td>
            <td class="px-4 py-2">${r.destino}</td>
            <td class="px-4 py-2">${r.ler}</td>
            <td class="px-4 py-2">${r.inicio}</td>
            <td class="px-4 py-2">${r.fin}</td>
            <td class="px-4 py-2">${r.dias}</td>
            <td class="px-4 py-2">${r.nt}</td>
            <td class="px-4 py-2">
                ${r.pdfURL ? `<a href="${r.pdfURL}" target="_blank" class="text-blue-600">📄</a>` : 'No disponible'}
            </td>
            <td class="px-4 py-2"><button onclick="eliminarRegistro(${index})" class="text-red-600">❌</button></td>
        `;
        tbody.appendChild(tr);
    });
}





// Filtrado de tabla
document.getElementById('buscador').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-resultados tbody tr');

    filas.forEach(fila => {
        const textoFila = fila.innerText.toLowerCase();
        if (textoFila.includes(filtro)) {
            fila.style.display = ''; // Mostrar fila si el filtro coincide
        } else {
            fila.style.display = 'none'; // Ocultar fila si no coincide
        }
    });
});





//Exportar a Excel y PDF
document.getElementById('exportar-excel').addEventListener('click', () => {
    const wb = XLSX.utils.book_new();
    
    // Crear array con registros visibles en la tabla
    const registrosVisibles = registros.filter((r, index) => {
        const fila = document.querySelectorAll('#tabla-resultados tbody tr')[index];
        return fila.style.display !== 'none';
    }).map(r => ({
        'Origen': r.origen,
        'Destino': r.destino,
        'Código LER': r.ler,
        'Inicio Validez': r.inicio,
        'Fin Validez': r.fin,
        'Días Restantes': r.dias,
        'Número NT': r.nt
    }));

    const ws = XLSX.utils.json_to_sheet(registrosVisibles);

    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    XLSX.writeFile(wb, 'registros.xlsx');
});

document.getElementById('exportar-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');

    const tableColumn = ["Origen", "Destino", "LER", "Inicio", "Fin", "Días", "NT"];
    const tableRows = [];

    const registrosVisibles = registros.filter((r, index) => {
        const fila = document.querySelectorAll('#tabla-resultados tbody tr')[index];
        return fila.style.display !== 'none';
    });

    registrosVisibles.forEach(r => {
        const row = [r.origen, r.destino, r.ler, r.inicio, r.fin, r.dias, r.nt];
        tableRows.push(row);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 10,
        theme: 'grid',
        columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' },
            5: { halign: 'center' },
            6: { halign: 'center' }
        }
    });

    doc.save('registros.pdf');
});





//Modales
document.addEventListener("DOMContentLoaded", () => {
  const modalesHTML = `
    <!-- Modal de error -->
    <div id="modal-error" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-fade-in">
        <h2 class="text-xl font-bold text-red-600 mb-4">No se puede guardar</h2>
        <p class="text-gray-700">El PDF no cumple con todos los requisitos. Por favor, revisa el archivo antes de continuar.</p>
        <button id="cerrar-modal-error" class="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">Cerrar</button>
      </div>
    </div>

    <!-- Modal de aviso -->
    <div id="modal-aviso" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-fade-in">
        <h2 class="text-xl font-bold text-yellow-600 mb-4">Registro duplicado</h2>
        <p id="modal-aviso-text" class="text-gray-700">Ya existe un registro con el número NT.</p>
        <button id="cerrar-modal-aviso" class="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition">Cerrar</button>
      </div>
    </div>

    <!-- Modal de contraseña -->
    <div id="modal-password" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-fade-in">
        <h2 class="text-xl font-bold text-blue-600 mb-4">Introduce la contraseña</h2>
        <input id="input-password" type="password" class="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Contraseña">
        <p id="error-password" class="text-red-600 text-sm mb-4 hidden">Contraseña incorrecta.</p>
        <div class="flex justify-center gap-4">
          <button id="cancelar-password" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl transition">Cancelar</button>
          <button id="confirmar-password" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">Confirmar</button>
        </div>
      </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = modalesHTML;
  document.body.appendChild(container);
});
