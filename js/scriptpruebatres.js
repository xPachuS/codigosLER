document.addEventListener('DOMContentLoaded', (event) => {
    // Función para formatear la fecha en formato dd/mm/yyyy
    function formatEuropeanDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Evento para actualizar la fecha final de validez cuando se cambia la fecha de validez
    document.getElementById('validityDate').addEventListener('change', function() {
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

    // Evento para manejar la subida de archivos y los datos del formulario
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const pdfFile = document.getElementById('pdfFile').files[0];
        const provider = document.getElementById('provider').value;
        const destination = document.getElementById('destination').value;
        const codeLER = document.getElementById('codeLER').value;
        const nt = document.getElementById('nt').value;
        const validityDate = document.getElementById('validityDate').value;
        const endDate = document.getElementById('endDate').value;

        if (pdfFile && provider && destination && codeLER && nt && validityDate && endDate) {
            const reader = new FileReader();
            reader.onload = function(event) {
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
                displayPdfs(); // Muestra los PDFs después de guardar uno nuevo
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

        filteredList.forEach((pdf, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Proveedor:</strong> ${pdf.provider}<br>
                <strong>Destino:</strong> ${pdf.destination}<br>
                <strong>Código LER:</strong> ${pdf.codeLER}<br>
                <strong>NT:</strong> ${pdf.nt}<br>
                <strong>Fecha de validez:</strong> ${formatEuropeanDate(pdf.validityDate)}<br>
                <strong>Fecha de final de validez:</strong> ${formatEuropeanDate(pdf.endDate)}<br><br>
                <a href="${pdf.pdfBase64}" target="_blank">Ver PDF</a>
                <button onclick="deletePdf(${index})">Eliminar</button>
            `;
            pdfListElement.appendChild(listItem);
        });
    }

    window.deletePdf = function(index) {
        let pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];
        pdfList.splice(index, 1);
        localStorage.setItem('pdfList', JSON.stringify(pdfList));
        displayPdfs(document.getElementById('searchInput').value);
    };

    document.getElementById('searchButton').addEventListener('click', function() {
        const searchQuery = document.getElementById('searchInput').value;
        displayPdfs(searchQuery);
    });

    displayPdfs(); // Cargar los PDFs almacenados cuando la página se carga
});