// Obtener elementos del formulario
const form = document.getElementById("registerForm");
const message = document.getElementById("message");

// Nombre: primera letra de cada palabra en mayúscula
document.getElementById("name").addEventListener("input", function () {
    let words = this.value.toLowerCase().split(" ");
    let formatted = words.map(word =>
        word ? word[0].toUpperCase() + word.slice(1) : ""
    );
    this.value = formatted.join(" ");
});

// Mostrar / Ocultar contraseña
function togglePassword(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
}

// Validar código postal (5 números)
function validZip(zip) {
    if (zip.length !== 5) return false;
    return [...zip].every(char => char >= "0" && char <= "9");
}

// Validar correo electrónico
function validEmail(email) {
    let atPos = email.indexOf("@");
    if (atPos === -1) return false;
    let domain = email.slice(atPos + 1);
    return domain.includes(".");
}

// Validar contraseña
function validPassword(password) {
    if (password.length < 8) return false;

    let upper = false;
    let lower = false;
    let numbers = 0;
    let special = false;

    for (let char of password) {
        if (char >= "A" && char <= "Z") upper = true;
        else if (char >= "a" && char <= "z") lower = true;
        else if (char >= "0" && char <= "9") numbers++;
        else special = true;
    }

    return upper && lower && numbers >= 2 && special;
}

// Validación final del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const age = document.getElementById("age").value;
    const zip = document.getElementById("zip").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const privacy = document.getElementById("privacy").checked;

    if (
        age &&
        validZip(zip) &&
        validEmail(email) &&
        validPassword(password) &&
        password === confirm &&
        privacy
    ) {
        message.textContent = "✅ Formulario enviado correctamente";
        message.style.color = "green";
    } else {
        message.textContent = "❌ Revisa los campos del formulario";
        message.style.color = "red";
    }
});
