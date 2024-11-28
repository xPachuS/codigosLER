async function checkPassword() {
            const password = document.getElementById('password').value;
            const correctHash = "0f010a850a18b0c222a742be9399177e40b026f1a21b7e79fcfb46bac8a6fc71";

            // Genera un hash de la contraseña ingresada
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

            // Compara los hashes
            if (hashHex === correctHash) {
                window.location.href = "pagina-protegida.html"; // Redirige a la página deseada
            } else {
                alert("Contraseña incorrecta. Inténtalo de nuevo.");
            }
        }async function checkPassword() {
            const password = document.getElementById('password').value;
            const correctHash = "5994471abb01112afcc18159f6cc74b4f511b99806fd13baff0d024a8e53a8ff"; // Hash de '12345'

            // Genera un hash de la contraseña ingresada
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

            // Compara los hashes
            if (hashHex === correctHash) {
                window.location.href = "pruebatres.html"; // Redirige a la página deseada
            } else {
                alert("Contraseña incorrecta. Inténtalo de nuevo.");
            }
        }
