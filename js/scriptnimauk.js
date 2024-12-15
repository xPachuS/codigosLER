// Data for cards
const cardsData = [
    { title: "Andalusia", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.juntadeandalucia.es/medioambiente/sira-buscador-publico/' target='_blank'>here</a>.", modalId: "modal1", iframeSrc: "https://www.juntadeandalucia.es/medioambiente/sira-buscador-publico/", backgroundImage: "../img/andalucia.jpg" },
    { title: "Aragon", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://aplicaciones2.aragon.es/pdr/pdr_pub/residuos/informacionAmbiental/busquedaNimas' target='_blank'>here</a>.", modalId: "modal2", iframeSrc: "https://aplicaciones2.aragon.es/pdr/pdr_pub/residuos/informacionAmbiental/busquedaNimas", backgroundImage: "../img/aragon.jpg" },
    { title: "Asturias", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.medioambiente.asturias.org/IASERVICIORESIDUOS/Buscar/BuscarInstalacion' target='_blank'>here</a>.", modalId: "modal3", iframeSrc: "https://www.medioambiente.asturias.org/IASERVICIORESIDUOS/Buscar/BuscarInstalacion", backgroundImage: "../img/asturias.jpg"  },
    { title: "Cantabria", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://siacan.cantabria.es/siacan/publico/PrepareBuscadorEmpresasGestoresView.do' target='_blank'>here</a>.", modalId: "modal4", iframeSrc: "https://siacan.cantabria.es/siacan/publico/PrepareBuscadorEmpresasGestoresView.do", backgroundImage: "../img/cantabria.jpg"  },
    { title: "Castile and Leon", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://servicios.jcyl.es/gaser/verFrmBuscadorGestores.action' target='_blank'>here</a>.", modalId: "modal5", iframeSrc: "https://servicios.jcyl.es/gaser/verFrmBuscadorGestores.action", backgroundImage: "../img/cyl.jpg"  },
    { title: "Castile-La Mancha", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://ireno.castillalamancha.es/forms/geref000.htm' target='_blank'>here</a>.", modalId: "modal6", iframeSrc: "https://ireno.castillalamancha.es/forms/geref000.htm", backgroundImage: "../img/clm.jpg"  },
    { title: "Catalonia", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://sdr.arc.cat/modemp/ListGestors.do' target='_blank'>here</a>.", modalId: "modal7", iframeSrc: "https://sdr.arc.cat/modemp/ListGestors.do", backgroundImage: "../img/catalunya.jpg"  },
    { title: "Community of Madrid", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://gestiona.comunidad.madrid/pcea_nima_web/html/web/InicioAccion.icm' target='_blank'>here</a>.", modalId: "modal8", iframeSrc: "https://gestiona.comunidad.madrid/pcea_nima_web/html/web/InicioAccion.icm", backgroundImage: "../img/madrid.jpg"  },
    { title: "Valencian Community", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://residuos.gva.es/res_buscaweb/buscador_residuos_avanzado.aspx' target='_blank'>here</a>.", modalId: "modal9", iframeSrc: "https://residuos.gva.es/res_buscaweb/buscador_residuos_avanzado.aspx", backgroundImage: "../img/valenciana.jpg"  },
    { title: "Extremadura", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='http://extremambiente.juntaex.es/index.php?option=com_content&id=2563' target='_blank'>here</a>.", modalId: "modal10", iframeSrc: "http://extremambiente.juntaex.es/index.php?option=com_content&id=2563", backgroundImage: "../img/extremadura.jpg"  },
    { title: "Galicia", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://sirga.xunta.gal/nima' target='_blank'>here</a>.", modalId: "modal11", iframeSrc: "https://sirga.xunta.gal/nima", backgroundImage: "../img/galicia.jpg"  },
    { title: "Balearic Islands", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://residus.caib.es/www/regpig/' target='_blank'>here</a>.", modalId: "modal12", iframeSrc: "https://residus.caib.es/www/regpig/", backgroundImage: "../img/baleares.jpg"  },
    { title: "Canary Islands", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.gobiernodecanarias.org/medioambiente/materias/residuos/registro-de-produccion/buscador-de-productores/' target='_blank'>here</a>.", modalId: "modal13", iframeSrc: " ", backgroundImage: "../img/canarias.jpg"  },
    { title: "La Rioja", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.larioja.org/medio-ambiente/es/residuos/buscador-nimas' target='_blank'>here</a>.", modalId: "modal14", iframeSrc: "https://www.larioja.org/medio-ambiente/es/residuos/buscador-nimas", backgroundImage: "../img/larioja.jpg"  },
    { title: "Melilla", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.melilla.es/melillaportal/contenedor.jsp?seccion=s_fdes_d4_v1.jsp&contenido=25815&nivel=1400&tipo=6&codResi=1&language=es&codMenu=705&codMenuPN=601&codMenuSN=8' target='_blank'>here</a>.", modalId: "modal15", iframeSrc: "https://www.melilla.es/melillaportal/contenedor.jsp?seccion=s_fdes_d4_v1.jsp&contenido=25815&nivel=1400&tipo=6&codResi=1&language=es&codMenu=705&codMenuPN=601&codMenuSN=8", backgroundImage: "../img/melilla.jpg"  },
    { title: "Murcia", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://caamext.carm.es/calaweb/faces/faces/vista/seleccionNima.jsp' target='_blank'>here</a>.", modalId: "modal16", iframeSrc: "https://caamext.carm.es/calaweb/faces/faces/vista/seleccionNima.jsp", backgroundImage: "../img/murcia.jpg"  },
    { title: "Navarre", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://extra.navarra.es/InformacionPublicaPRTR/RPGR.html#/PGR' target='_blank'>here</a>.", modalId: "modal17", iframeSrc: "https://extra.navarra.es/InformacionPublicaPRTR/RPGR.html#/PGR", backgroundImage: "../img/navarra.jpg"  },
    { title: "Basque Country", description: "In case the 'Consult NIMA' button doesn't work, please click <a href='https://www.euskadi.eus/informacion/registro-de-produccion-y-gestion-de-residuos/web01-a2inghon/es/' target='_blank'>here</a>.", modalId: "modal18", iframeSrc: "https://www.euskadi.eus/informacion/registro-de-produccion-y-gestion-de-residuos/web01-a2inghon/es/", backgroundImage: "../img/paisvasco.jpg"  },
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
