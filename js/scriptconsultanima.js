const comunidades = [
  { nombre: "Andalucía", bandera: "../img/n_andalucia.png", url: "https://www.juntadeandalucia.es/medioambiente/sira-buscador-publico/" },
  { nombre: "Aragón", bandera: "../img/n_aragon.png", url: "https://aplicaciones2.aragon.es/pdr/pdr_pub/residuos/informacionAmbiental/busquedaNimas" },
  { nombre: "Asturias", bandera: "../img/n_asturias.png", url: "http://www.medioambiente.asturias.org/IASERVICIORESIDUOS/Buscar/BuscarProductor" },
  { nombre: "Cantabria", bandera: "../img/n_cantabria.png", url: "https://siacan.cantabria.es/siacan/publico/PrepareBuscadorEmpresasGestoresView.do" },
  { nombre: "Castilla-La Mancha", bandera: "../img/n_clm.png", url: "https://ireno.castillalamancha.es/forms/geref000.htm" },
  { nombre: "Castilla y León", bandera: "../img/n_cyl.png", url: "https://servicios.jcyl.es/gaser/verFrmBuscadorGestores.action" },
  { nombre: "Cataluña", bandera: "../img/n_catalunya.png", url: "https://sdr.arc.cat/modemp/ListGestors.do" },
  { nombre: "Comunidad de Madrid", bandera: "../img/n_madrid.png", url: "https://gestiona.comunidad.madrid/pcea_nima_web/html/web/InicioAccion.icm" },
  { nombre: "Comunidad Valenciana", bandera: "../img/n_valenciana.png", url: "https://residuos.gva.es/res_buscaweb/buscador_residuos_avanzado.aspx" },
  { nombre: "Extremadura", bandera: "../img/n_extremadura.png", url: "http://extremambiente.juntaex.es/index.php?option=com_content&id=2563" },
  { nombre: "Galicia", bandera: "../img/n_galicia.png", url: "https://sirga.xunta.gal/nima" },
  { nombre: "Islas Baleares", bandera: "../img/n_baleares.png", url: "https://residus.caib.es/www/regpig/" },
  { nombre: "Islas Canarias", bandera: "../img/n_canarias.png", url: "https://www.gobiernodecanarias.org/medioambiente/materias/residuos/registro-de-produccion/buscador-de-productores/" },
  { nombre: "La Rioja", bandera: "../img/n_larioja.png", url: "https://www.larioja.org/medio-ambiente/es/residuos/buscador-nimas" },
  { nombre: "Melilla", bandera: "../img/n_melilla.png", url: "https://www.melilla.es/melillaportal/contenedor.jsp?seccion=s_fdes_d4_v1.jsp&contenido=25815&nivel=1400&tipo=6&codResi=1&language=es&codMenu=705&codMenuPN=601&codMenuSN=8" },
  { nombre: "Murcia", bandera: "../img/n_murcia.png", url: "https://nima.carm.es/nima/" },
  { nombre: "Navarra", bandera: "../img/n_navarra.png", url: "https://extra.navarra.es/InformacionPublicaPRTR/RPGR.html#/PGR" },
  { nombre: "País Vasco", bandera: "../img/n_paisvasco.png", url: "https://www.euskadi.eus/informacion/registro-de-produccion-y-gestion-de-residuos/web01-a2inghon/es/" },
];

const regionList = document.getElementById("region-list");

comunidades.forEach(region => {
  const li = document.createElement("li");
  li.className = "cursor-pointer hover:bg-indigo-50 transition rounded-lg p-4 text-center shadow-md hover:shadow-lg flex flex-col justify-center items-center";
  li.innerHTML = `
    <div class="w-40 h-48 mb-2 flex justify-center items-center">
      <img src="${region.bandera}" alt="Bandera de ${region.nombre}" class="object-contain w-full h-full rounded-md">
    </div>
  `;
  li.onclick = () => openModal(region.nombre, region.url);
  regionList.appendChild(li);
});

function openModal(nombre, url) {
  document.getElementById("modal-title").textContent = nombre;
  document.getElementById("modal-frame").src = url;
  document.getElementById("external-link").href = url;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("modal-frame").src = ""; // Limpia para evitar carga constante
}

// Cerrar el modal al hacer clic fuera del contenido
document.getElementById("modal").addEventListener("click", function(event) {
  if (event.target === document.getElementById("modal")) {
    closeModal();
  }
});

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