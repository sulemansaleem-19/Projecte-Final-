// Variables globales
const esp = ['@','#','$','%','^','&','*','(',')','_','+','[',']','{','}','|',';',':',',','.','<','>','/','?','\\'];

// Validaciones básicas
function validar() {
    let ok = true;
    
    // Nombre: capitalizar
    const nom = document.getElementById('nom');
    if (nom.value) nom.value = nom.value.toLowerCase().replace(/\b\w/g, c=>c.toUpperCase());
    
    // Código postal: 5 dígitos
    const cp = document.getElementById('cp');
    if (!/^\d{5}$/.test(cp.value)) { cp.className='error'; ok=false; } else cp.className='ok';
    
    // Email: tiene @ y punto después
    const email = document.getElementById('email');
    const at = email.value.indexOf('@');
    if (at<1 || email.value.indexOf('.',at)<at+2) { email.className='error'; ok=false; } else email.className='ok';
    
    // Contraseña: requisitos
    const pass = document.getElementById('pass').value;
    let mayus=false, minus=false, nums=0, especial=false;
    for(let c of pass) {
        if(c>='A'&&c<='Z') mayus=true;
        else if(c>='a'&&c<='z') minus=true;
        else if(c>='0'&&c<='9') nums++;
        else if(esp.includes(c)) especial=true;
    }
    if(pass.length<8 || !mayus || !minus || nums<2 || !especial) {
        document.getElementById('pass').className='error';
        ok=false;
    } else document.getElementById('pass').className='ok';
    
    // Confirmar contraseña
    const pass2 = document.getElementById('pass2');
    if(pass2.value !== pass) { pass2.className='error'; ok=false; } else pass2.className='ok';
    
    // Política
    if(!document.getElementById('privacy').checked) ok=false;
    
    return ok;
}

// Funciones simples
function mostrarPass() {
    const p = document.getElementById('pass');
    p.type = p.type==='password'?'text':'password';
}

function borrar() {
    document.getElementById('form').reset();
    document.querySelectorAll('input,select').forEach(e=>e.className='');
    document.getElementById('result').innerHTML='';
}

function enviar() {
    if(validar()) {
        document.getElementById('result').innerHTML = 
            `<h3>✅ Formulari correcte!</h3><p>Nom: ${document.getElementById('nom').value}<br>
            Email: ${document.getElementById('email').value}<br>
            CP: ${document.getElementById('cp').value}</p>`;
    } else {
        alert('Corregeix els errors!');
    }
}
