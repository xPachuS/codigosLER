document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("dropdown");
    const infoElements = document.getElementsByClassName("info");
    const infoTitle = document.getElementById("info-title");

    // Mostrar información del LER seleccionado
    dropdown.addEventListener("change", function() {
        const selectedItem = dropdown.value;

        Array.from(infoElements).forEach(element => element.style.display = "none");

        if (selectedItem) {
            const selectedItemInfo = document.getElementById(selectedItem + "-info");
            selectedItemInfo.style.display = "block";
            infoTitle.textContent = "Código LER: " + dropdown.options[dropdown.selectedIndex].text;
            document.getElementById("info").style.display = "block";
        } else {
            infoTitle.innerText = "Código LER:";
            document.getElementById("info").style.display = "none";
        }
    });

    // Copiar lista de ítems con asterisco al portapapeles
    function copiarListaAsteriscosAlPortapapeles() {
        const itemsConAsterisco = Array.from(dropdown.options)
            .filter(option => option.text.includes("*"))
            .map(option => option.text.replace("*", ""))
            .join("\n");

        navigator.clipboard.writeText(itemsConAsterisco)
            .then(() => alert("Lista de ítems con asterisco copiada al portapapeles:\n" + itemsConAsterisco))
            .catch(err => {
                console.error("Error al copiar lista al portapapeles:", err);
                alert("Error al copiar lista al portapapeles");
            });
    }

    document.getElementById("boton-copiar").addEventListener("click", copiarListaAsteriscosAlPortapapeles);

    // Copiar lista de ítems sin asterisco al portapapeles
    function copiarListaSinAsteriscosAlPortapapeles() {
        const itemsSinAsterisco = Array.from(dropdown.options)
            .filter(option => !option.text.includes("*"))
            .map(option => option.text)
            .join("\n");

        navigator.clipboard.writeText(itemsSinAsterisco)
            .then(() => alert("Lista de ítems sin asterisco copiada al portapapeles:\n" + itemsSinAsterisco))
            .catch(err => {
                console.error("Error al copiar lista al portapapeles:", err);
                alert("Error al copiar lista al portapapeles");
            });
    }

    document.getElementById("boton-copiar2").addEventListener("click", copiarListaSinAsteriscosAlPortapapeles);

    // Generar checkboxes en el modal
    document.getElementById("generar-checkbox").addEventListener("click", function() {
        const checkboxContainer = document.getElementById("checkbox-container");
        checkboxContainer.innerHTML = "";

        Array.from(dropdown.options).slice(1).forEach(option => {
            const lineDiv = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option.value;
            checkbox.id = "checkbox-" + option.value;

            const label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.style.fontWeight = "bold";
            label.textContent = option.text;

            const infoSpan = document.createElement("span");
            const description = document.getElementById(option.value + "-info")?.textContent || "Sin información disponible";
            infoSpan.textContent = ": " + description.substring(0, 38) + (description.length > 38 ? "..." : "");
            infoSpan.title = description;

            lineDiv.appendChild(checkbox);
            lineDiv.appendChild(document.createTextNode(" "));
            lineDiv.appendChild(label);
            lineDiv.appendChild(infoSpan);

            checkboxContainer.appendChild(lineDiv);
        });

        document.getElementById("myModal").style.display = "block";
    });

    // Copiar elementos seleccionados al portapapeles
    document.getElementById("copiar-seleccionados").addEventListener("click", function() {
        const lista = Array.from(document.querySelectorAll("#checkbox-container input[type='checkbox']:checked"))
            .map(checkbox => document.querySelector("#dropdown option[value='" + checkbox.value + "']").textContent.replace("*", "").trim())
            .join("\n");

        navigator.clipboard.writeText(lista)
            .then(() => alert("Los elementos seleccionados han sido copiados al portapapeles."))
            .catch(() => alert("Hubo un error al copiar los elementos seleccionados al portapapeles."));
    });

    // Marcar/Desmarcar todos los checkboxes visibles
    document.getElementById("marcar-todos").addEventListener("click", function() {
        const checkboxes = document.querySelectorAll("#checkbox-container input[type='checkbox']");
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

        checkboxes.forEach(checkbox => {
            if (checkbox.closest("div").style.display !== "none") {
                checkbox.checked = !allChecked;
            }
        });
    });

    // Filtrar checkboxes en el buscador
    document.getElementById("buscador").addEventListener("input", function() {
        const filter = this.value.toLowerCase();
        const checkboxes = document.querySelectorAll("#checkbox-container div");

        checkboxes.forEach(checkboxDiv => {
            const label = checkboxDiv.querySelector("label").textContent.toLowerCase();
            const infoSpan = checkboxDiv.querySelector("span").textContent.toLowerCase();
            checkboxDiv.style.display = label.includes(filter) || infoSpan.includes(filter) ? "" : "none";
        });
    });
});
