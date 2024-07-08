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

    function copiarListaAsteriscosAlPortapapeles() {
        var select = document.getElementById("dropdown");
        var itemsConAsterisco = [];

        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            
            if (option.text.includes("*")) {
                itemsConAsterisco.push(option.text.replace("*", ""));
            }
        }

        var itemsText = itemsConAsterisco.join("\n");
        navigator.clipboard.writeText(itemsText).then(function() {
            console.log("Lista de ítems con asterisco copiada al portapapeles:", itemsText);
            alert("Lista de ítems con asterisco copiada al portapapeles:\n" + itemsText);
        }, function(err) {
            console.error("Error al copiar lista al portapapeles:", err);
            alert("Error al copiar lista al portapapeles");
        });
    }

    var botonCopiar = document.getElementById("boton-copiar");
    botonCopiar.addEventListener("click", copiarListaAsteriscosAlPortapapeles);

    function copiarListaSinAsteriscosAlPortapapeles() {
        var select = document.getElementById("dropdown");
        var itemsSinAsterisco = [];

        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            
            if (!option.text.includes("*")) {
                itemsSinAsterisco.push(option.text);
            }
        }

        var itemsText = itemsSinAsterisco.join("\n");
        navigator.clipboard.writeText(itemsText).then(function() {
            console.log("Lista de ítems sin asterisco copiada al portapapeles:", itemsText);
            alert("Lista de ítems sin asterisco copiada al portapapeles:\n" + itemsText);
        }, function(err) {
            console.error("Error al copiar lista al portapapeles:", err);
            alert("Error al copiar lista al portapapeles");
        });
    }

    var botonCopiar2 = document.getElementById("boton-copiar2");
    botonCopiar2.addEventListener("click", copiarListaSinAsteriscosAlPortapapeles);

    document.getElementById("generar-checkbox").addEventListener("click", function() {
        var dropdown = document.getElementById("dropdown");
        var checkboxContainer = document.getElementById("checkbox-container");
        checkboxContainer.innerHTML = ""; 

        for (var i = 1; i < dropdown.options.length; i++) {
            var option = dropdown.options[i];

            var lineDiv = document.createElement("div");

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option.value;
            checkbox.id = "checkbox-" + option.value;

            var space = document.createTextNode(" ");

            var label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.style.fontWeight = "bold";
            label.appendChild(document.createTextNode(option.text));

            var infoSpan = document.createElement("span");
            infoSpan.textContent = ": " + (option.value ? document.getElementById(option.value + "-info").textContent : "Sin información disponible");
            infoSpan.title = infoSpan.textContent;

            var maxLength = 38;
            if (infoSpan.textContent.length > maxLength) {
                infoSpan.textContent = infoSpan.textContent.substring(0, maxLength) + "...";
            }

            lineDiv.appendChild(checkbox);
            lineDiv.appendChild(space);
            lineDiv.appendChild(label);
            lineDiv.appendChild(infoSpan);

            checkboxContainer.appendChild(lineDiv);
        }

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
  
        var modalContent = document.querySelector(".modal-content");
        var contentHeight = checkboxContainer.offsetHeight;
        var titleHeight = document.querySelector(".modal-content h2").offsetHeight;
        var buttonsHeight = document.querySelectorAll(".modal-content button")[0].offsetHeight * 2;
        var totalHeight = titleHeight + contentHeight + buttonsHeight + 40;
        modalContent.style.height = totalHeight + "px";
    });

    document.getElementById("copiar-seleccionados").addEventListener("click", function() {
        var checkboxes = document.querySelectorAll("#checkbox-container input[type='checkbox']:checked");
        var lista = "";

        checkboxes.forEach(function(checkbox) {
            var itemId = checkbox.value;
            var dropdownText = document.querySelector("#dropdown option[value='" + itemId + "']").textContent.replace("*", "").trim();
            lista += dropdownText + "\n";
        });

        navigator.clipboard.writeText(lista).then(function() {
            alert("Los elementos seleccionados han sido copiados al portapapeles.");
        }, function() {
            alert("Hubo un error al copiar los elementos seleccionados al portapapeles.");
        });
    });

    var closeModal = document.getElementsByClassName("close")[0];

    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var closeModal = document.getElementsByClassName("close")[0];

    // Funcionalidad de Marcar/Desmarcar Todos
    var marcarTodosBtn = document.getElementById("marcar-todos");
    marcarTodosBtn.addEventListener("click", function() {
        var checkboxes = document.querySelectorAll("#checkbox-container div");
        var allChecked = true;
        checkboxes.forEach(function(checkboxDiv) {
            var checkbox = checkboxDiv.querySelector("input[type='checkbox']");
            if (!checkbox.checked && checkboxDiv.style.display !== "none") {
                allChecked = false;
            }
        });

        checkboxes.forEach(function(checkboxDiv) {
            var checkbox = checkboxDiv.querySelector("input[type='checkbox']");
            if (checkboxDiv.style.display !== "none") {
                checkbox.checked = !allChecked;
            }
        });
    });

    // Funcionalidad del buscador
    var buscador = document.getElementById("buscador");
    buscador.addEventListener("input", function() {
        var filter = buscador.value.toLowerCase();
        var checkboxes = document.querySelectorAll("#checkbox-container div");

        checkboxes.forEach(function(checkboxDiv) {
            var label = checkboxDiv.querySelector("label");
            if (label.textContent.toLowerCase().includes(filter)) {
                checkboxDiv.style.display = "";
            } else {
                checkboxDiv.style.display = "none";
            }
        });
    });
});
