document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("dropdown");
    var infoElements = document.getElementsByClassName("info");
    var infoTitle = document.getElementById("info-title");

    dropdown.addEventListener("change", function() {
        var selectedItem = dropdown.value;

        for (var i = 0; i < infoElements.length; i++) {
            infoElements[i].style.display = "none";
        }

        if (selectedItem) {
            var selectedItemInfo = document.getElementById(selectedItem + "-info");
            selectedItemInfo.style.display = "block";

            infoTitle.textContent = "Código LER: " + dropdown.options[dropdown.selectedIndex].text;

            document.getElementById("info").style.display = "block";
        } else {
            infoTitle.innerText = "Código LER:";
            document.getElementById("info").style.display = "none";
        }
    });
    
    // Función para crear y mostrar la lista de ítems con asterisco
    function copiarListaAsteriscosAlPortapapeles() {
        var select = document.getElementById("dropdown");
        var itemsConAsterisco = [];

        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            
            // Verificar si el ítem contiene un asterisco (*) y está seleccionado
            if (option.text.includes("*")) {
                // Agregar el texto del ítem a la lista
                itemsConAsterisco.push(option.text.replace("*", ""));
            }
        }

        // Copiar la lista de ítems con asterisco al portapapeles
        var itemsText = itemsConAsterisco.join("\n"); // Convertir la lista de ítems en texto separado por saltos de línea
        navigator.clipboard.writeText(itemsText).then(function() {
            console.log("Lista de ítems con asterisco copiada al portapapeles:", itemsText);
            alert("Lista de ítems con asterisco copiada al portapapeles:\n" + itemsText);
        }, function(err) {
            console.error("Error al copiar lista al portapapeles:", err);
            alert("Error al copiar lista al portapapeles");
        });
    }

    // Asociar la función copiarListaAsteriscosAlPortapapeles al botón
    var botonCopiar = document.getElementById("boton-copiar");
    botonCopiar.addEventListener("click", copiarListaAsteriscosAlPortapapeles);






    // Función para crear la lista de ítems sin asterisco y copiarla al portapapeles
    function copiarListaSinAsteriscosAlPortapapeles() {
        var select = document.getElementById("dropdown");
        var itemsSinAsterisco = [];

        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            
            // Verificar si el ítem NO contiene un asterisco (*) y está seleccionado
            if (!option.text.includes("*")) {
                // Agregar el texto del ítem a la lista
                itemsSinAsterisco.push(option.text);
            }
        }

        // Copiar la lista de ítems sin asterisco al portapapeles
        var itemsText = itemsSinAsterisco.join("\n"); // Convertir la lista de ítems en texto separado por saltos de línea
        navigator.clipboard.writeText(itemsText).then(function() {
            console.log("Lista de ítems sin asterisco copiada al portapapeles:", itemsText);
            alert("Lista de ítems sin asterisco copiada al portapapeles:\n" + itemsText);
        }, function(err) {
            console.error("Error al copiar lista al portapapeles:", err);
            alert("Error al copiar lista al portapapeles");
        });
    }

    // Asociar la función copiarListaSinAsteriscosAlPortapapeles al botón
    var botonCopiar = document.getElementById("boton-copiar2");
    botonCopiar.addEventListener("click", copiarListaSinAsteriscosAlPortapapeles);






document.getElementById("generar-checkbox").addEventListener("click", function() {
    var dropdown = document.getElementById("dropdown");
    var checkboxContainer = document.getElementById("checkbox-container");
    checkboxContainer.innerHTML = ""; // Limpiar el contenido anterior

    // Recorrer cada opción del dropdown, empezando desde el índice 1
    for (var i = 1; i < dropdown.options.length; i++) {
        var option = dropdown.options[i];

        // Crear un div para cada línea de checkbox e información asociada
        var lineDiv = document.createElement("div");

        // Crear un checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option.value;
        checkbox.id = "checkbox-" + option.value;

        // Añadir un espacio en blanco entre el checkbox y el texto del ítem
        var space = document.createTextNode(" ");

        // Crear una etiqueta para el texto del ítem del dropdown
        var label = document.createElement("label");
        label.htmlFor = checkbox.id;
        
        // Aplicar estilo en línea para hacer el texto en negrita
        label.style.fontWeight = "bold";
        
        // Agregar el texto del ítem dentro de la etiqueta de la opción del dropdown
        label.appendChild(document.createTextNode(option.text));

        // Crear un span para mostrar la información del item correspondiente
        var infoSpan = document.createElement("span");
        infoSpan.textContent = ": " + (option.value ? document.getElementById(option.value + "-info").textContent : "Sin información disponible");

        // Añadir el atributo "title" para mostrar el contenido completo al colocar el ratón encima
        infoSpan.title = infoSpan.textContent;

        // Truncar la información si es demasiado larga y agregar puntos suspensivos
        var maxLength = 38; // longitud máxima permitida antes de truncar
        if (infoSpan.textContent.length > maxLength) {
            infoSpan.textContent = infoSpan.textContent.substring(0, maxLength) + "...";
        }

        // Agregar el checkbox, el espacio, el texto del ítem y la información al div de la línea
        lineDiv.appendChild(checkbox);
        lineDiv.appendChild(space);
        lineDiv.appendChild(label);
        lineDiv.appendChild(infoSpan);

        // Agregar el div de la línea al contenedor de checkboxes
        checkboxContainer.appendChild(lineDiv);
    }





      
    // Mostrar el modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    // Ajustar la altura del modal al contenido
    var modalContent = document.querySelector(".modal-content");
    var contentHeight = checkboxContainer.offsetHeight;
    var titleHeight = document.querySelector(".modal-content h2").offsetHeight;
    var buttonsHeight = document.querySelectorAll(".modal-content button")[0].offsetHeight * 2; // altura de los botones multiplicado por 2
    var totalHeight = titleHeight + contentHeight + buttonsHeight + 40; // sumamos 40px extra para evitar que el contenido esté muy cerca de los bordes
    modalContent.style.height = totalHeight + "px";
});






document.getElementById("copiar-seleccionados").addEventListener("click", function() {
    var checkboxes = document.querySelectorAll("#checkbox-container input[type='checkbox']:checked");
    var lista = "";

    checkboxes.forEach(function(checkbox) {
        // Obtener el valor del checkbox
        var itemId = checkbox.value;
        // Obtener el texto del ítem del dropdown asociado al checkbox y eliminar el asterisco
        var dropdownText = document.querySelector("#dropdown option[value='" + itemId + "']").textContent.replace("*", "").trim();
        // Agregar el texto del ítem al texto de la lista
        lista += dropdownText + "\n";
    });

    // Copiar la lista al portapapeles
    navigator.clipboard.writeText(lista).then(function() {
        alert("Los elementos seleccionados han sido copiados al portapapeles.");
    }, function() {
        alert("Hubo un error al copiar los elementos seleccionados al portapapeles.");
    });
});






// Obtener la referencia del botón para cerrar el modal
var closeModal = document.getElementsByClassName("close")[0];

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Obtener la referencia del elemento de cierre del modal
var closeModal = document.getElementsByClassName("close")[0];
});