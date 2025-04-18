// Todas las tarjetas definidas dentro de cardsData
const cardsData = [
    {
        title: "Consultar NIMA",
        description: "Aquí encontrarás las webs de las Comunidades Autónomas para consultar NIMAS.",
        link: "./html/consultanima.html",
        buttonText: "CONSULTA NIMA",
        target: "_self"
    },
    {
        title: "Búsqueda LER",
        description: "Visite este enlace para consultar toda la información sobre los códigos LER.",
        link: "./html/buscadorler.html",
        buttonText: "BÚSQUEDA LER",
        target: "_self"
    },
    {
        title: "Guía Residuos",
        description: "Visite este enlace para consultar toda la información sobre los residuos que tienen código LER.",
        link: "./html/guiaresiduos.html",
        buttonText: "GUÍA RESIDUOS",
        target: "_self"
    },
    {
        title: "Realizar NT",
        description: "Acceda aquí para realizar una notificación previa de traslado (NT).",
        link: "https://sede.miteco.gob.es/portal/site/seMITECO/login",
        buttonText: "REALIZAR NT",
        target: "_blank"
    },
    {
        title: "Realizar DI",
        description: "Acceda aquí para realizar un documento de identificación de traslado (DI).",
        link: "https://servicio.mapama.gob.es/esir-web-adv/",
        buttonText: "REALIZAR DI",
        target: "_blank"
    },
    {
        title: "Comprobar CSV",
        description: "Compruebe la veracidad de los 'Códigos Seguros de Verificación'.",
        link: "https://sede.miteco.gob.es/portal/site/seMITECO/navValidacionCSV?accionClass=validacionCSVAction",
        buttonText: "COMPROBAR CSV",
        target: "_blank"
    }
];

const rowsContainer = document.getElementById("rows-container");

function renderRows() {
    rowsContainer.innerHTML = "";

    for (let i = 0; i < cardsData.length; i += 3) {
        const rowCards = cardsData.slice(i, i + 3);
        createRow(rowCards);
    }
}

function createRow(cards) {
    const row = document.createElement("div");
    row.classList.add("row", "g-4");
    cards.forEach(card => {
        const cardHTML = `
            <div class="col-md-4 d-flex">
                <div class="card-flip">
                    <div class="card-flip-inner">
                        <div class="card-front">
                            <h5>${card.title}</h5>
                            <p>${card.description}</p>
                        </div>
                        <div class="card-back">
                            <a href="${card.link}" target="${card.target}" class="btn btn-secondary">${card.buttonText}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        row.insertAdjacentHTML("beforeend", cardHTML);
    });
    rowsContainer.appendChild(row);
}

renderRows();
