// Función para poner la primera letra de cada palabra en mayúscula
document.getElementById("nom").addEventListener("input", UpperCase);

function UpperCase() {
    let input = document.getElementById("nom");
    let text = input.value.toLowerCase();
    let resultat = "";
    let novaParaula = true;

    for (let i = 0; i < text.length; i++) {
        if (novaParaula && text[i] !== " ") {
            resultat += text[i].toUpperCase();
            novaParaula = false;
        } else {
            resultat += text[i];
        }

        if (text[i] === " ") {
            novaParaula = true;
        }
    }

    input.value = resultat;
}

// Mostrar u ocultar contraseña
function mostrarPass(id) {
    let camp = document.getElementById(id);
    if (camp.type === "password") {
        camp.type = "text";
    } else {
        camp.type = "password";
    }
}

// Función principal de validación
function validar() {

    let correcte = true;

    // EDAT
    let edat = document.getElementById("edat");
    if (edat.value === "") {
        edat.className = "error";
        correcte = false;
    } else {
        edat.className = "correcte";
    }

    // CODI POSTAL (5 dígits)
    let cp = document.getElementById("cp");
    
    if (cp.value.length !== 5 || isNaN(cp.value)) {
    cp.className = "error";
    correcte = false;
    } else {
    cp.className = "correcte";
    }

    // EMAIL
    let email = document.getElementById("email").value;
    let arrova = email.indexOf("@");
    let punt = email.indexOf(".", arrova);

    if (arrova < 1 || punt < arrova + 2) {
        document.getElementById("email").className = "error";
        correcte = false;
    } else {
        document.getElementById("email").className = "correcte";
    }

    // CONTRASENYA
    let passInput = document.getElementById("pass");
    let pass = passInput.value;
    
    let teMajuscula = false;
    let teMinuscula = false;
    let digits = 0;
    let teEspecial = false;
    let especials = "!@#$%^&*()_+-=[]{};:|,.<>/?";
    
    for (let i = 0; i < pass.length; i++) {
        
        let c = pass[i];

        if (c >= "A" && c <= "Z") {
        teMajuscula = true;
        }     
        else if (c >= "a" && c <= "z") {
        teMinuscula = true; 
        }   
        else if (c >= "0" && c <= "9") {
            digits++;
        }   
        else if (especials.indexOf(c) !== -1) {
            teEspecial = true;
        }
}

// Comprovació final
if (pass.length < 8 || !teMajuscula || !teMinuscula || digits < 2 || !teEspecial) {
    passInput.className = "error";
    correcte = false;
} else {
    passInput.className = "correcte";
}

// CONFIRMAR CONTRASENYA
let pass2 = document.getElementById("pass2");

if (pass2.value !== pass) {
    pass2.className = "error";
    correcte = false;
} else {
    pass2.className = "correcte";
}

// CHECKBOX
let checkbox = document.getElementById("privacitat");

if (!checkbox.checked) {
    correcte = false;
}

    return correcte;
}

// Botón borrar
function borrar() {
    document.getElementById("formulari").reset();
    document.getElementById("resultat").innerHTML = "";
}

// Botón enviar
function enviar() {
    if (validar()) {
        document.getElementById("resultat").innerHTML =
            "Formulari emplenat correctament<br><br>" +
            "Nom: " + document.getElementById("nom").value + "<br>" +
            "Email: " + document.getElementById("email").value + "<br>" +
            "Codi Postal: " + document.getElementById("cp").value;
    } else {
        alert("Hi ha errors al formulari");
    }
}
