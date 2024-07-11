document.addEventListener('DOMContentLoaded', function () {
    // Para abrir el modal
    document.querySelectorAll('.openModal').forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
        });
    });

    // Para cerrar el modal
    document.querySelectorAll('.close').forEach(span => {
        span.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Para recargar el contenido del iframe
    document.querySelectorAll('.reloadButton').forEach(button => {
        button.addEventListener('click', function () {
            const iframeId = this.getAttribute('data-target');
            const iframe = document.getElementById(iframeId);
            iframe.src = iframe.src;
        });
    });

    // Para cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
