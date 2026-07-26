// ============================================================
// LER·NIMA — utilidades compartidas
// Inclúyelo en todas las páginas ANTES del script propio de cada página.
// ============================================================

/**
 * Copia texto al portapapeles usando la API moderna, con fallback
 * silencioso para navegadores/contextos sin permiso.
 * @param {string} texto
 * @param {string} mensajeExito - texto mostrado en el alert al copiar
 */
function copiarAlPortapapeles(texto, mensajeExito) {
  if (!texto) {
    alert('No hay nada que copiar.');
    return;
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto)
      .then(() => alert(mensajeExito || 'Copiado al portapapeles.'))
      .catch(() => alert('No se pudo copiar al portapapeles.'));
  } else {
    // Fallback para contextos no seguros (http) o navegadores antiguos
    const area = document.createElement('textarea');
    area.value = texto;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      alert(mensajeExito || 'Copiado al portapapeles.');
    } catch (e) {
      alert('No se pudo copiar al portapapeles.');
    }
    document.body.removeChild(area);
  }
}

// Botón flotante "subir arriba", presente en las páginas interiores
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnSubirArriba');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
