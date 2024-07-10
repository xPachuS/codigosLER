const correctPassword = "xPachuS";

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    if (enteredPassword === correctPassword) {
        window.location.href = "pruebados.html"; // Cambia "pagina_protegida.html" a la URL de tu página protegida
    } else {
        document.getElementById('error').textContent = 'Contraseña incorrecta, por favor intente de nuevo.';
    }
}