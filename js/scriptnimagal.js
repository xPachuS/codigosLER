// Data for cards
const cardsData = [
    { title: "Andalucía", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://www.juntadeandalucia.es/medioambiente/sira-buscador-publico/' target='_blank'>aquí</a>.", modalId: "modal1", iframeSrc: "https://www.juntadeandalucia.es/medioambiente/sira-buscador-publico/", backgroundImage: "../img/andalucia.jpg" },
    { title: "Aragón", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://aplicaciones2.aragon.es/pdr/pdr_pub/residuos/informacionAmbiental/busquedaNimas' target='_blank'>aquí</a>.", modalId: "modal2", iframeSrc: "https://aplicaciones2.aragon.es/pdr/pdr_pub/residuos/informacionAmbiental/busquedaNimas", backgroundImage: "../img/aragon.jpg" },
    { title: "Asturias", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='http://www.medioambiente.asturias.org/IASERVICIORESIDUOS/Buscar/BuscarProductor' target='_blank'>aquí</a>.", modalId: "modal3", iframeSrc: "http://www.medioambiente.asturias.org/IASERVICIORESIDUOS/Buscar/BuscarProductor", backgroundImage: "../img/asturias.jpg"  },
    { title: "Cantabria", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://siacan.cantabria.es/siacan/publico/PrepareBuscadorEmpresasGestoresView.do' target='_blank'>aquí</a>.", modalId: "modal4", iframeSrc: "https://siacan.cantabria.es/siacan/publico/PrepareBuscadorEmpresasGestoresView.do", backgroundImage: "../img/cantabria.jpg"  },
    { title: "Castela e León", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://servicios.jcyl.es/gaser/verFrmBuscadorGestores.action' target='_blank'>aquí</a>.", modalId: "modal5", iframeSrc: "https://servicios.jcyl.es/gaser/verFrmBuscadorGestores.action", backgroundImage: "../img/cyl.jpg"  },
    { title: "Castela-A Mancha", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://ireno.castillalamancha.es/forms/geref000.htm' target='_blank'>aquí</a>.", modalId: "modal6", iframeSrc: "https://ireno.castillalamancha.es/forms/geref000.htm", backgroundImage: "../img/clm.jpg"  },
    { title: "Cataluña", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://sdr.arc.cat/modemp/ListGestors.do' target='_blank'>aquí</a>.", modalId: "modal7", iframeSrc: "https://sdr.arc.cat/modemp/ListGestors.do", backgroundImage: "../img/catalunya.jpg"  },
    { title: "Comunidade de Madrid", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://gestiona.comunidad.madrid/pcea_nima_web/html/web/InicioAccion.icm' target='_blank'>aquí</a>.", modalId: "modal8", iframeSrc: "https://gestiona.comunidad.madrid/pcea_nima_web/html/web/InicioAccion.icm", backgroundImage: "../img/madrid.jpg"  },
    { title: "Comunidade Valenciana", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://residuos.gva.es/res_buscaweb/buscador_residuos_avanzado.aspx' target='_blank'>aquí</a>.", modalId: "modal9", iframeSrc: "https://residuos.gva.es/res_buscaweb/buscador_residuos_avanzado.aspx", backgroundImage: "../img/valenciana.jpg"  },
    { title: "Extremadura", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='http://extremambiente.juntaex.es/index.php?option=com_content&id=2563' target='_blank'>aquí</a>.", modalId: "modal10", iframeSrc: "http://extremambiente.juntaex.es/index.php?option=com_content&id=2563", backgroundImage: "../img/extremadura.jpg"  },
    { title: "Galiza", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://sirga.xunta.gal/nima' target='_blank'>aquí</a>.", modalId: "modal11", iframeSrc: "https://sirga.xunta.gal/nima", backgroundImage: "../img/galicia.jpg"  },
    { title: "Illas Baleares", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://residus.caib.es/www/regpig/' target='_blank'>aquí</a>.", modalId: "modal12", iframeSrc: "https://residus.caib.es/www/regpig/", backgroundImage: "../img/baleares.jpg"  },
    { title: "Illas Canarias", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://www.gobiernodecanarias.org/medioambiente/materias/residuos/registro-de-produccion/buscador-de-productores/' target='_blank'>aquí</a>.", modalId: "modal13", iframeSrc: " ", backgroundImage: "../img/canarias.jpg"  },
    { title: "A Rioxa", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://www.larioja.org/medio-ambiente/es/residuos/buscador-nimas' target='_blank'>aquí</a>.", modalId: "modal14", iframeSrc: "https://www.larioja.org/medio-ambiente/es/residuos/buscador-nimas", backgroundImage: "../img/larioja.jpg"  },
    { title: "Melilla", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://www.melilla.es/melillaportal/contenedor.jsp?seccion=s_fdes_d4_v1.jsp&contenido=25815&nivel=1400&tipo=6&codResi=1&language=es&codMenu=705&codMenuPN=601&codMenuSN=8' target='_blank'>aquí</a>.", modalId: "modal15", iframeSrc: "https://www.melilla.es/melillaportal/contenedor.jsp?seccion=s_fdes_d4_v1.jsp&contenido=25815&nivel=1400&tipo=6&codResi=1&language=es&codMenu=705&codMenuPN=601&codMenuSN=8", backgroundImage: "../img/melilla.jpg"  },
    { title: "Rexión de Murcia", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://caamext.carm.es/calaweb/faces/faces/vista/seleccionNima.jsp' target='_blank'>aquí</a>.", modalId: "modal16", iframeSrc: "https://caamext.carm.es/calaweb/faces/faces/vista/seleccionNima.jsp", backgroundImage: "../img/murcia.jpg"  },
    { title: "Navarra", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://extra.navarra.es/InformacionPublicaPRTR/RPGR.html#/PGR' target='_blank'>aquí</a>.", modalId: "modal17", iframeSrc: "https://extra.navarra.es/InformacionPublicaPRTR/RPGR.html#/PGR", backgroundImage: "../img/navarra.jpg"  },
    { title: "País Vasco", description: "No caso de que o botón 'Consultar NIMA' non funcione, <a href='https://www.euskadi.eus/informacion/registro-de-produccion-y-gestion-de-residuos/web01-a2inghon/es/' target='_blank'>aquí</a>.", modalId: "modal18", iframeSrc: "https://www.euskadi.eus/informacion/registro-de-produccion-y-gestion-de-residuos/web01-a2inghon/es/", backgroundImage: "../img/paisvasco.jpg"  },
];

const cardsContainer = document.getElementById("cards-container");
const modalsContainer = document.getElementById("modals-container");

let currentRow;

// Generate cards and modals
cardsData.forEach((card, index) => {
    if (index % 3 === 0) {
        currentRow = document.createElement('div');
        currentRow.className = 'row';
        cardsContainer.appendChild(currentRow);
    }

    const uniqueId = `${card.modalId}_${index}`;
    currentRow.innerHTML += `
        <div class="col-md-4">
            <div class="card-flip">
                <div class="card-flip-inner">
                    <div class="card-front" style="background-image: url('${card.backgroundImage}');">
                        <h5 class="card-title">${card.title}</h5>
                    </div>
                    <div class="card-back">
                        <p>${card.description}</p>
                        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${uniqueId}">CONSULTAR NIMA</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalsContainer.innerHTML += `
        <div class="modal fade" id="${uniqueId}" tabindex="-1" aria-labelledby="${uniqueId}Label" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${uniqueId}Label">${card.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <iframe data-src="${card.iframeSrc}" width="100%" height="500px" style="display: none;"></iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
});

// Lazy load iframe when modal is opened
document.addEventListener('shown.bs.modal', (event) => {
    const modal = event.target;
    const iframe = modal.querySelector('iframe');
    if (iframe && iframe.style.display === 'none') {
        iframe.src = iframe.getAttribute('data-src');
        iframe.style.display = 'block';
    }
});

// Optionally clear iframe when modal is closed
document.addEventListener('hidden.bs.modal', (event) => {
    const modal = event.target;
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.src = '';
        iframe.style.display = 'none';
    }
});
