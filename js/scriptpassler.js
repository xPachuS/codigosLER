const correctHash = "0f010a850a18b0c222a742be9399177e40b026f1a21b7e79fcfb46bac8a6fc71";

async function checkPassword() {
    const enteredPassword = document.getElementById('password').value;

    // Generar el hash SHA-256 de la contraseña ingresada
    const encoder = new TextEncoder();
    const data = encoder.encode(enteredPassword);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const enteredHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Comparar los hashes
    if (enteredHash === correctHash) {
        window.location.href = "ler.html"; // Cambia esto por la página protegida
    } else {
        document.getElementById('error').textContent = 'Contraseña incorrecta, por favor intente de nuevo.';
    }
}
