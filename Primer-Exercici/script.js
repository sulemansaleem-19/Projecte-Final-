// Variables
const form = document.getElementById('myForm');
const specialChars = ['@','#','$','%','^','&','*','(',')','_','+','[',']','{','}','|',';',':',',','.','<','>','/','?','\\'];

// Función principal para inicializar todo
function init() {
    // Event listeners para mostrar/ocultar contraseñas
    document.querySelectorAll('.show-password').forEach(btn => {
        btn.addEventListener('click', e => {
            const input = e.target.parentElement.querySelector('input');
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // Validación en tiempo real
    document.querySelectorAll('#name, #postal, #email, #password, #confirmPass').forEach(input => {
        input.addEventListener('input', validateField);
        input.addEventListener('blur', validateField);
    });
    
    document.getElementById('age').addEventListener('change', validateField);
    document.getElementById('privacy').addEventListener('change', validateField);

    // Botones
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('submitBtn').addEventListener('click', submitForm);
}

// Validar campo individual
function validateField(e) {
    const field = e.target;
    const id = field.id;
    const value = field.value;
    let isValid = true;
    let message = '';

    switch(id) {
        case 'name':
            if (!value.trim()) {
                message = 'Camp obligatori';
                isValid = false;
            } else {
                // Capitalizar automáticamente
                field.value = value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            }
            break;

        case 'age':
            if (!value) {
                message = 'Selecciona una opció';
                isValid = false;
            }
            break;

        case 'postal':
            if (!/^\d{5}$/.test(value)) {
                message = '5 dígits exactes';
                isValid = false;
            }
            break;

        case 'email':
            if (!value.includes('@') || value.split('@').length !== 2 || 
                !value.split('@')[1].includes('.')) {
                message = 'Format invàlid';
                isValid = false;
            }
            break;

        case 'password':
            const passValid = validatePassword(value);
            if (!passValid) {
                message = 'No compleix requisits';
                isValid = false;
            }
            break;

        case 'confirmPass':
            if (value !== document.getElementById('password').value) {
                message = 'No coincideix';
                isValid = false;
            }
            break;

        case 'privacy':
            if (!field.checked) {
                message = 'Has d\'acceptar';
                isValid = false;
            }
    }

    // Actualizar UI
    const errorElement = document.getElementById(id + 'Error');
    errorElement.textContent = message;
    field.classList.toggle('valid', isValid && value);
    field.classList.toggle('invalid', !isValid && value);

    return isValid;
}

// Validar contraseña completa
function validatePassword(pass) {
    if (pass.length < 8) return false;
    
    let hasUpper = false, hasLower = false, digits = 0, hasSpecial = false;
    
    for (let char of pass) {
        if (char >= 'A' && char <= 'Z') hasUpper = true;
        else if (char >= 'a' && char <= 'z') hasLower = true;
        else if (char >= '0' && char <= '9') digits++;
        else if (specialChars.includes(char)) hasSpecial = true;
    }
    
    return hasUpper && hasLower && digits >= 2 && hasSpecial;
}

// Validar todo el formulario
function validateAll() {
    let isValid = true;
    
    ['name', 'age', 'postal', 'email', 'password', 'confirmPass'].forEach(id => {
        const field = document.getElementById(id);
        if (!validateField({target: field})) isValid = false;
    });
    
    const privacyChecked = document.getElementById('privacy').checked;
    if (!privacyChecked) {
        document.getElementById('privacyError').textContent = 'Has d\'acceptar';
        isValid = false;
    }
    
    return isValid;
}

// Borrar formulario
function clearForm() {
    form.reset();
    document.getElementById('age').value = '0-17';
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => {
        el.classList.remove('valid', 'invalid');
    });
    document.getElementById('output').innerHTML = '';
}

// Enviar formulario
function submitForm() {
    if (!validateAll()) {
        alert('Corregeix els errors abans d\'enviar');
        return;
    }

    const data = {
        nom: document.getElementById('name').value,
        edat: document.getElementById('age').options[document.getElementById('age').selectedIndex].text,
        postal: document.getElementById('postal').value,
        email: document.getElementById('email').value,
        data: new Date().toLocaleString('ca-ES')
    };

    let html = `<p style="color:green">Formulari enviat correctament!</p>`;
    html += '<ul>';
    for (let key in data) {
        html += `<li><strong>${key}:</strong> ${data[key]}</li>`;
    }
    html += '</ul>';

    document.getElementById('output').innerHTML = html;
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', init);
