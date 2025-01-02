document.addEventListener('DOMContentLoaded', () => {
    // Crear dinámicamente el desplegable de proveedores
    const providerContainer = document.getElementById('providerContainer');
    const providers = ["Laboratorios Liconsa", "Química Sintética", "Amazon Spain - MAD7 - Illescas (2)", "CPM Internacional, S.A."];
    providers.sort();

    const providerSelect = document.createElement('select');
    providerSelect.id = 'provider';
    providerSelect.required = true;
    providerSelect.className = 'input-like';

    const placeholderOptionProvider = document.createElement('option');
    placeholderOptionProvider.value = '';
    placeholderOptionProvider.disabled = true;
    placeholderOptionProvider.selected = true;
    placeholderOptionProvider.textContent = 'Seleccione un proveedor';
    providerSelect.appendChild(placeholderOptionProvider);

    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider;
        providerSelect.appendChild(option);
    });

    providerContainer.appendChild(providerSelect);

    // Crear dinámicamente el desplegable de destinos
    const destinationContainer = document.getElementById('destinationContainer');
    const destinations = ["Sogarisa", "Valorización Medioambiental", "Tradebe", "Saica Natur - SMV"];
    destinations.sort();

    const destinationSelect = document.createElement('select');
    destinationSelect.id = 'destinationSelect';
    destinationSelect.required = true;
    destinationSelect.className = 'input-like';

    const placeholderOptionDestination = document.createElement('option');
    placeholderOptionDestination.value = '';
    placeholderOptionDestination.disabled = true;
    placeholderOptionDestination.selected = true;
    placeholderOptionDestination.textContent = 'Seleccione un destino';
    destinationSelect.appendChild(placeholderOptionDestination);

    destinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = destination;
        option.textContent = destination;
        destinationSelect.appendChild(option);
    });

    destinationContainer.replaceWith(destinationSelect);

    // Validar campo NT
        const ntInput = document.getElementById('nt');
        ntInput.value = 'NT';
        ntInput.addEventListener('input', function () {
            if (!this.value.startsWith('NT')) {
                this.value = 'NT';
            }
            const ntValue = this.value.slice(2); // Ignorar "NT"
            const ntRegex = /^\d{0,23}$/; // Permitir hasta 23 números después de "NT"
            this.value = `NT${ntValue.slice(0, 23)}`; // Limitar a 23 números
        });

    // Función para formatear la fecha en formato dd/mm/yyyy
    function formatEuropeanDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Actualizar fecha final de validez automáticamente
    document.getElementById('validityDate').addEventListener('change', function () {
        const validityDateInput = this.value;
        if (validityDateInput) {
            const validityDate = new Date(validityDateInput);
            if (!isNaN(validityDate.getTime())) {
                const endDate = new Date(validityDate);
                endDate.setFullYear(endDate.getFullYear() + 3);
                const endDateString = endDate.toISOString().split('T')[0];
                document.getElementById('endDate').value = endDateString;
            } else {
                console.error('Fecha de validez no válida.');
            }
        }
    });

    // Manejar la subida de PDFs
    document.getElementById('uploadForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const pdfFile = document.getElementById('pdfFile').files[0];
        const provider = document.getElementById('provider').value;
        const destination = document.getElementById('destinationSelect').value;
        const codeLER = document.getElementById('codeLER').value;
        const nt = document.getElementById('nt').value;
        const validityDate = document.getElementById('validityDate').value;
        const endDate = document.getElementById('endDate').value;

        if (pdfFile && provider && destination && codeLER && nt && validityDate && endDate) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const pdfData = {
                    fileName: pdfFile.name,
                    provider,
                    destination,
                    codeLER,
                    nt,
                    validityDate,
                    endDate,
                    pdfBase64: event.target.result
                };

                savePdfData(pdfData);
                displayPdfs();
                alert('PDF subido exitosamente.');
            };
            reader.readAsDataURL(pdfFile);
        } else {
            alert('Por favor, complete todos los campos del formulario.');
        }
    });

    function savePdfData(pdfData) {
        let pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];
        pdfList.push(pdfData);
        localStorage.setItem('pdfList', JSON.stringify(pdfList));
    }

    function displayPdfs(searchQuery = '') {
        const pdfListElement = document.getElementById('pdfList');
        pdfListElement.innerHTML = '';
        const pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];

        const filteredList = pdfList.filter(pdf => {
            const searchStr = searchQuery.toLowerCase();
            return (
                pdf.provider.toLowerCase().includes(searchStr) ||
                pdf.destination.toLowerCase().includes(searchStr) ||
                pdf.codeLER.toLowerCase().includes(searchStr) ||
                pdf.nt.toLowerCase().includes(searchStr)
            );
        });

        const today = new Date();
        filteredList.forEach((pdf, index) => {
            const endDate = new Date(pdf.endDate);
            const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

            const card = document.createElement('div');
            card.className = 'pdf-card';

            const endDateHtml = `<span class="${daysRemaining <= 10 ? 'red-text' : ''}">
                                    ${formatEuropeanDate(pdf.endDate)}
                                 </span>`;

            card.innerHTML = `
                <div class="pdf-info">
                    <h3>${pdf.fileName}</h3>
                    <p><strong>Proveedor:</strong> ${pdf.provider}</p>
                    <p><strong>Destino:</strong> ${pdf.destination}</p>
                    <p><strong>Código LER:</strong> ${pdf.codeLER}</p>
                    <p><strong>NT:</strong> ${pdf.nt}</p>
                    <p><strong>Fecha de validez:</strong> ${formatEuropeanDate(pdf.validityDate)}</p>
                    <p><strong>Fecha final de validez:</strong> ${endDateHtml}</p>
                </div>
                <div class="pdf-actions">
                    <a href="${pdf.pdfBase64}" target="_blank" class="action-btn view-btn">Ver PDF</a>
                    <button onclick="deletePdf(${index})" class="action-btn delete-btn">Eliminar</button>
                </div>
            `;

            pdfListElement.appendChild(card);
        });
    }

    window.deletePdf = function (index) {
        let pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];
        pdfList.splice(index, 1);
        localStorage.setItem('pdfList', JSON.stringify(pdfList));
        displayPdfs(document.getElementById('searchInput').value);
    };

    document.getElementById('searchButton').addEventListener('click', function () {
        const searchQuery = document.getElementById('searchInput').value;
        displayPdfs(searchQuery);
    });

    displayPdfs();
});

    displayPdfs();
});
