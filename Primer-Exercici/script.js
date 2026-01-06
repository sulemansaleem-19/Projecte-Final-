/**
 * Projecte PAI - Formulari de Registre
 * Script de validació del formulari
 * Autor: [El teu nom]
 * Data: [Data actual]
 */

// Variables globals per als elements del DOM
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const ageRangeSelect = document.getElementById('ageRange');
const postalCodeInput = document.getElementById('postalCode');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const privacyCheckbox = document.getElementById('privacyPolicy');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const clearButton = document.getElementById('clearButton');
const submitButton = document.getElementById('submitButton');
const resultsContent = document.getElementById('resultsContent');

// Variables per als elements de requisits de contrasenya
const reqLength = document.getElementById('reqLength');
const reqUpper = document.getElementById('reqUpper');
const reqLower = document.getElementById('reqLower');
const reqDigits = document.getElementById('reqDigits');
const reqSpecial = document.getElementById('reqSpecial');

// Caràcters especials permesos
const SPECIAL_CHARS = ['@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 
                      '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '/', '?', '\\'];

/**
 * Funció per capitalitzar la primera lletra de cada paraula
 * @param {string} text - Text a capitalitzar
 * @returns {string} Text capitalitzat
 */
function capitalizeWords(text) {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .split(' ')
        .map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(' ');
}

/**
 * Funció per validar el codi postal (5 dígits exactes)
 * @param {string} postalCode - Codi postal a validar
 * @returns {boolean} True si és vàlid, false si no ho és
 */
function validatePostalCode(postalCode) {
    if (postalCode.length !== 5) return false;
    
    // Comprovar que tots els caràcters són dígits
    for (let i = 0; i < postalCode.length; i++) {
        const char = postalCode.charAt(i);
        if (char < '0' || char > '9') {
            return false;
        }
    }
    
    return true;
}

/**
 * Funció per validar el correu electrònic
 * @param {string} email - Correu a validar
 * @returns {boolean} True si és vàlid, false si no ho és
 */
function validateEmail(email) {
    // Comprovar que hi ha exactament una @
    const atIndex = email.indexOf('@');
    if (atIndex === -1 || email.indexOf('@', atIndex + 1) !== -1) {
        return false;
    }
    
    // Comprovar que hi ha almenys un punt després de la @
    const dotAfterAt = email.indexOf('.', atIndex);
    if (dotAfterAt === -1 || dotAfterAt === atIndex + 1) {
        return false;
    }
    
    return true;
}

/**
 * Funció per validar la contrasenya
 * @param {string} password - Contrasenya a validar
 * @returns {Object} Objecte amb els resultats de la validació
 */
function validatePassword(password) {
    const result = {
        isValid: true,
        requirements: {
            length: password.length >= 8,
            upper: false,
            lower: false,
            digits: 0,
            special: false
        }
    };
    
    let digitCount = 0;
    
    // Comprovar cada caràcter
    for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i);
        
        // Majúscules
        if (char >= 'A' && char <= 'Z') {
            result.requirements.upper = true;
        }
        // Minúscules
        else if (char >= 'a' && char <= 'z') {
            result.requirements.lower = true;
        }
        // Dígits
        else if (char >= '0' && char <= '9') {
            digitCount++;
            result.requirements.digits = digitCount;
        }
        // Caràcters especials
        else if (SPECIAL_CHARS.includes(char)) {
            result.requirements.special = true;
        }
    }
    
    // Comprovar si es compleixen tots els requisits
    result.isValid = result.requirements.length &&
                     result.requirements.upper &&
                     result.requirements.lower &&
                     result.requirements.digits >= 2 &&
                     result.requirements.special;
    
    return result;
}

/**
 * Funció per actualitzar la visualització dels requisits de contrasenya
 * @param {Object} requirements - Objecte amb els requisits
 */
function updatePasswordRequirements(requirements) {
    // Longitud
    if (requirements.length) {
        reqLength.classList.add('valid');
        reqLength.classList.remove('invalid');
        reqLength.innerHTML = '<i class="fas fa-check-circle"></i> 8 caràcters';
    } else {
        reqLength.classList.add('invalid');
        reqLength.classList.remove('valid');
        reqLength.innerHTML = '<i class="fas fa-times-circle"></i> 8 caràcters';
    }
    
    // Majúscules
    if (requirements.upper) {
        reqUpper.classList.add('valid');
        reqUpper.classList.remove('invalid');
        reqUpper.innerHTML = '<i class="fas fa-check-circle"></i> Majúscula';
    } else {
        reqUpper.classList.add('invalid');
        reqUpper.classList.remove('valid');
        reqUpper.innerHTML = '<i class="fas fa-times-circle"></i> Majúscula';
    }
    
    // Minúscules
    if (requirements.lower) {
        reqLower.classList.add('valid');
        reqLower.classList.remove('invalid');
        reqLower.innerHTML = '<i class="fas fa-check-circle"></i> Minúscula';
    } else {
        reqLower.classList.add('invalid');
        reqLower.classList.remove('valid');
        reqLower.innerHTML = '<i class="fas fa-times-circle"></i> Minúscula';
    }
    
    // Dígits
    if (requirements.digits >= 2) {
        reqDigits.classList.add('valid');
        reqDigits.classList.remove('invalid');
        reqDigits.innerHTML = `<i class="fas fa-check-circle"></i> 2 dígits (${requirements.digits})`;
    } else {
        reqDigits.classList.add('invalid');
        reqDigits.classList.remove('valid');
        reqDigits.innerHTML = `<i class="fas fa-times-circle"></i> 2 dígits (${requirements.digits})`;
    }
    
    // Caràcters especials
    if (requirements.special) {
        reqSpecial.classList.add('valid');
        reqSpecial.classList.remove('invalid');
        reqSpecial.innerHTML = '<i class="fas fa-check-circle"></i> Caràcter especial';
    } else {
        reqSpecial.classList.add('invalid');
        reqSpecial.classList.remove('valid');
        reqSpecial.innerHTML = '<i class="fas fa-times-circle"></i> Caràcter especial';
    }
}

/**
 * Funció per validar tot el formulari
 * @returns {boolean} True si tot és vàlid, false si hi ha errors
 */
function validateForm() {
    let isValid = true;
    
    // Validar nom
    const nameValue = fullNameInput.value.trim();
    if (nameValue === '') {
        showError('nameError', 'El nom és obligatori');
        fullNameInput.classList.add('invalid');
        fullNameInput.classList.remove('valid');
        isValid = false;
    } else {
        clearError('nameError');
        fullNameInput.classList.add('valid');
        fullNameInput.classList.remove('invalid');
    }
    
    // Validar rang d'edat
    const ageValue = ageRangeSelect.value;
    if (ageValue === '') {
        showError('ageError', 'Selecciona un rang d\'edat');
        ageRangeSelect.classList.add('invalid');
        ageRangeSelect.classList.remove('valid');
        isValid = false;
    } else {
        clearError('ageError');
        ageRangeSelect.classList.add('valid');
        ageRangeSelect.classList.remove('invalid');
    }
    
    // Validar codi postal
    const postalValue = postalCodeInput.value.trim();
    if (!validatePostalCode(postalValue)) {
        showError('postalError', 'El codi postal ha de tenir 5 dígits exactes');
        postalCodeInput.classList.add('invalid');
        postalCodeInput.classList.remove('valid');
        isValid = false;
    } else {
        clearError('postalError');
        postalCodeInput.classList.add('valid');
        postalCodeInput.classList.remove('invalid');
    }
    
    // Validar email
    const emailValue = emailInput.value.trim();
    if (!validateEmail(emailValue)) {
        showError('emailError', 'El correu ha de contenir una @ i almenys un punt després');
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        isValid = false;
    } else {
        clearError('emailError');
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
    }
    
    // Validar contrasenya
    const passwordValue = passwordInput.value;
    const passwordValidation = validatePassword(passwordValue);
    updatePasswordRequirements(passwordValidation.requirements);
    
    if (!passwordValidation.isValid) {
        showError('passwordError', 'La contrasenya no compleix tots els requisits');
        passwordInput.classList.add('invalid');
        passwordInput.classList.remove('valid');
        isValid = false;
    } else {
        clearError('passwordError');
        passwordInput.classList.add('valid');
        passwordInput.classList.remove('invalid');
    }
    
    // Validar confirmació de contrasenya
    const confirmPasswordValue = confirmPasswordInput.value;
    if (confirmPasswordValue !== passwordValue) {
        showError('confirmPasswordError', 'Les contrasenyes no coincideixen');
        confirmPasswordInput.classList.add('invalid');
        confirmPasswordInput.classList.remove('valid');
        isValid = false;
    } else if (confirmPasswordValue === '') {
        showError('confirmPasswordError', 'Confirma la contrasenya');
        confirmPasswordInput.classList.add('invalid');
        confirmPasswordInput.classList.remove('valid');
        isValid = false;
    } else {
        clearError('confirmPasswordError');
        confirmPasswordInput.classList.add('valid');
        confirmPasswordInput.classList.remove('invalid');
    }
    
    // Validar política de privacitat
    if (!privacyCheckbox.checked) {
        showError('privacyError', 'Has d\'acceptar la política de privacitat');
        isValid = false;
    } else {
        clearError('privacyError');
    }
    
    return isValid;
}

/**
 * Funció per mostrar un missatge d'error
 * @param {string} elementId - ID de l'element d'error
 * @param {string} message - Missatge d'error
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = '#f44336';
    }
}

/**
 * Funció per esborrar un missatge d'error
 * @param {string} elementId - ID de l'element d'error
 */
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Funció per esborrar tots els camps del formulari
 */
function clearForm() {
    // Esborrar valors
    fullNameInput.value = '';
    ageRangeSelect.value = '';
    postalCodeInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    privacyCheckbox.checked = false;
    
    // Esborrar errors
    clearError('nameError');
    clearError('ageError');
    clearError('postalError');
    clearError('emailError');
    clearError('passwordError');
    clearError('confirmPasswordError');
    clearError('privacyError');
    
    // Esborrar classes de validació
    const inputs = [fullNameInput, ageRangeSelect, postalCodeInput, emailInput, 
                    passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Reiniciar requisits de contrasenya
    const requirements = {
        length: false,
        upper: false,
        lower: false,
        digits: 0,
        special: false
    };
    updatePasswordRequirements(requirements);
    
    // Esborrar resultats
    resultsContent.innerHTML = '<p class="placeholder">Els resultats es mostraran aquí després d\'enviar el formulari</p>';
    
    // Restaurar tipus de contrasenya
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
    togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleConfirmPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
}

/**
 * Funció per mostrar/amagar la contrasenya
 * @param {HTMLElement} input - Element input de contrasenya
 * @param {HTMLElement} button - Botó de toggle
 */
function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

/**
 * Funció per mostrar els resultats del formulari
 */
function showResults() {
    const results = {
        nom: fullNameInput.value,
        edat: ageRangeSelect.options[ageRangeSelect.selectedIndex].text,
        codiPostal: postalCodeInput.value,
        email: emailInput.value,
        contrasenya: '********', // No mostrar la contrasenya real
        dataEnviament: new Date().toLocaleString('ca-ES')
    };
    
    let html = `
        <div class="result-item">
            <h3><i class="fas fa-check-circle success-icon"></i> Formulari enviat correctament!</h3>
            <p class="success-message">El formulari s'ha emplenat correctament i s'ha enviat amb èxit.</p>
        </div>
        
        <div class="result-details">
            <h4>Dades introduïdes:</h4>
            <table>
                <tr>
                    <th><i class="fas fa-user"></i> Camp</th>
                    <th><i class="fas fa-info-circle"></i> Valor</th>
                </tr>
                <tr>
                    <td>Nom i cognoms:</td>
                    <td><strong>${results.nom}</strong></td>
                </tr>
                <tr>
                    <td>Rang d'edat:</td>
                    <td><strong>${results.edat}</strong></td>
                </tr>
                <tr>
                    <td>Codi postal:</td>
                    <td><strong>${results.codiPostal}</strong></td>
                </tr>
                <tr>
                    <td>Correu electrònic:</td>
                    <td><strong>${results.email}</strong></td>
                </tr>
                <tr>
                    <td>Contrasenya:</td>
                    <td><strong>${results.contrasenya}</strong></td>
                </tr>
                <tr>
                    <td>Data d'enviament:</td>
                    <td><strong>${results.dataEnviament}</strong></td>
                </tr>
            </table>
        </div>
    `;
    
    resultsContent.innerHTML = html;
    
    // Scroll automàtic als resultats
    resultsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Funció per inicialitzar els event listeners
 */
function initializeEventListeners() {
    // Event listener per capitalitzar el nom
    fullNameInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.value = capitalizeWords(this.value);
            validateForm();
        }
    });
    
    // Event listeners per validació en temps real
    const validateInputs = [ageRangeSelect, postalCodeInput, emailInput, 
                           passwordInput, confirmPasswordInput];
    
    validateInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateForm();
        });
        
        input.addEventListener('blur', function() {
            validateForm();
        });
    });
    
    // Event listener específic per a la contrasenya
    passwordInput.addEventListener('input', function() {
        const validation = validatePassword(this.value);
        updatePasswordRequirements(validation.requirements);
        validateForm();
    });
    
    // Event listener per a la política de privacitat
    privacyCheckbox.addEventListener('change', function() {
        validateForm();
    });
    
    // Event listeners per mostrar/amagar contrasenya
    togglePasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, this);
    });
    
    toggleConfirmPasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, this);
    });
    
    // Event listener per al botó d'esborrar
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        clearForm();
    });
    
    // Event listener per al botó d'enviar
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showResults();
        } else {
            alert('Si us plau, corregeix els errors abans d\'enviar el formulari.');
        }
    });
    
    // Event listener per evitar enviament del formulari amb Enter
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}

/**
 * Funció per inicialitzar l'aplicació
 */
function initializeApp() {
    console.log('Inicialitzant aplicació de formulari...');
    
    // Establir valors per defecte
    ageRangeSelect.value = '26-40';
    
    // Inicialitzar event listeners
    initializeEventListeners();
    
    // Actualitzar estat inicial dels requisits de contrasenya
    const initialValidation = validatePassword('');
    updatePasswordRequirements(initialValidation.requirements);
    
    console.log('Aplicació inicialitzada correctament.');
}

// Inicialitzar l'aplicació quan el DOM estigui carregat
document.addEventListener('DOMContentLoaded', initializeApp);
