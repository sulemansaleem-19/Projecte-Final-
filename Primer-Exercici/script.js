// Función para poner la primera letra de cada palabra en mayúscula
document.getElementById("nom").addEventListener("input", UpperCase);

function UpperCase() {
    let input = document.getElementById("nom"); // Campo de texto
    let text = input.value.toLowerCase();       // Pasamos todo a minúsculas
    let resultat = "";                          // Texto final
    let novaParaula = true;                      // Indica si empieza una palabra nueva

    // Recorremos todo el texto carácter a carácter
    for (let i = 0; i < text.length; i++) {
        if (novaParaula && text[i] !== " ") {       // Si es una nueva palabra y no es un espacio
            resultat += text[i].toUpperCase();    // Primera letra en mayúscula
            novaParaula = false;
        } else {
            resultat += text[i];                // Añadimos el carácter tal cual
        }

        // Si encontramos un espacio, la siguiente letra será nueva palabra
        if (text[i] === " ") {
            novaParaula = true;
        }
    }

    input.value = resultat;          // Actualizamos el input
}

// Mostrar u ocultar contraseña
function mostrarPass(id) {
    let camp = document.getElementById(id);     // Input de la contraseña
    if (camp.type === "password") {
        camp.type = "text";                      // Mostrar contraseña
    } else {
        camp.type = "password";                 // Ocultar contraseña
    }
}

// Función principal de validación
function validar() {

    let correcte = true;                        // Indica si el formulario es correcto
    
    let nom = document.getElementById("nom");          // El nombre no puede estar vacío
    if (nom.value === "") {                        
        nom.className = "error";                     // Campo en rojo
        correcte = false;                     // El formulario ya no es correcto
    } else {
        nom.className = "";
    }

    // EDAT
    let edat = document.getElementById("edat");             // Se debe seleccionar una opción del desplegable
    if (edat.value === "") {                       // No se ha seleccionado ninguna edad
        edat.className = "error";                         // Campo en rojo
        correcte = false;                                // El formulario ya no es correcto
    } else {
        edat.className = "correcte";                          // Edad seleccionada correctamente 
    }

    // CODI POSTAL (5 dígits)
    let cp = document.getElementById("cp");
    
    if (cp.value.length !== 5 || isNaN(cp.value)) {            // Error si no tiene 5 dígitos o no es numérico
    cp.className = "error";                                      // Campo en rojo
    correcte = false;
    } else {                                                       // Email incorrecto// Email incorrecto
    cp.className = "correcte";                                       // Código postal correcto
    }

    // EMAIL
    let email = document.getElementById("email").value;                      // El email debe contener una @ y un punto después
    let arrova = email.indexOf("@");               // Posición de la @
    let punt = email.indexOf(".", arrova);          // Punto después de la @

    if (arrova < 1 || punt < arrova + 2) {                     // Email incorrecto
        document.getElementById("email").className = "error";           // Campo en rojo
        correcte = false;                                            // Email incorrecto
    } else {
        document.getElementById("email").className = "correcte";              // Email correcto
    }

    // CONTRASENYA
    let passInput = document.getElementById("pass");
    let pass = passInput.value;
    
     // Variables para comprobar cada condición
    let teMajuscula = false;
    let teMinuscula = false;
    let digits = 0;
    let teEspecial = false;
     // Lista de caracteres especiales permitidos
    let especials = "!@#$%^&*()_+-=[]{};:|,.<>/?";
    
    for (let i = 0; i < pass.length; i++) {         // Recorremos la contraseña carácter a carácter
        
        let c = pass[i];              // Carácter actual

        if (c >= "A" && c <= "Z") {
        teMajuscula = true;             // Es una letra mayúscula
        }     
        else if (c >= "a" && c <= "z") {
        teMinuscula = true;                 // Es una letra minúscula
        }   
        else if (c >= "0" && c <= "9") {
            digits++;                            // Es un número
        }   
        else if (especials.indexOf(c) !== -1) {                // Es un carácter especial
            teEspecial = true;
        }
}

// Comprovació final si se cumplen TODAS las condiciones
if (pass.length < 8 || !teMajuscula || !teMinuscula || digits < 2 || !teEspecial) {
    passInput.className = "error";                           // Campo en rojo
    correcte = false;                                       // El formulario ya no es correcto
    } else {
    passInput.className = "correcte";              // Contraseña correcta
}

// CONFIRMAR CONTRASENYA
let pass2 = document.getElementById("pass2");            // Las dos contraseñas deben ser iguales

if (pass2.value !== pass) {                     // No Coinciden
    pass2.className = "error";                 // Campo en rojo
    correcte = false;                                    // El formulario ya no es correcto
} else {
    pass2.className = "correcte";                     // Coinciden
}

// CHECKBOX debe estar marcado
let checkbox = document.getElementById("privacitat");            
let label = document.getElementById("privLabel");

if (!checkbox.checked) {                    // No se ha aceptado la política
    correcte = false;                       // El formulario ya no es correcto
    label.className = "errorCheck";              // Ponemos el texto del label en rojo
}else {
    label.className = "";                 // Checkbox marcado correctamente

    return correcte;                // Devuelve true o false
}

}

// Botón borrar
function borrar() {
    document.getElementById("formulari").reset();            // Limpia el formulario 
    document.getElementById("resultat").innerHTML = "";             // Limpia el resultado
}



// Botón enviar
function enviar() {
    if (validar()) {              // Llama a la función validar() (Si todo es correcto muestra los datos)
        document.getElementById("resultat").innerHTML =
            "Formulari emplenat correctament<br><br>" +
            "Nom: " + document.getElementById("nom").value + "<br>" +
            "Edat:" + document.getElementById("edat").value + "<br>" +
            "Email: " + document.getElementById("email").value + "<br>" +
            "Codi Postal: " + document.getElementById("cp").value;
    } else {
        alert("Hi ha errors al formulari");             // Si hay errores muestra una alerta
    }
}
