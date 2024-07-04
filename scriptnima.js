// Obtener los elementos del DOM
var modalBtns = document.querySelectorAll('.openModal');
var closeBtns = document.querySelectorAll('.close');

// Asignar eventos a los botones para abrir modals
modalBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var modalId = this.dataset.modal;
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

// Asignar eventos a los botones de cierre para cerrar modals
closeBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var modal = this.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

// Cerrar modal haciendo clic fuera del contenido
window.addEventListener('click', function(event) {
  modals.forEach(function(modal) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});