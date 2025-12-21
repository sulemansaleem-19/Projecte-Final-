// Treballarem sempre amb una variable global, obj, què és una taula on estan 
// guardats tots els accidents de l'any. Qualsevol altre variable que necessitem
// haurà de ser, necessàriament, una variable local.

// Com que al document html no hi ha controladors d'esdeveniments, els haurem de crear aquí:



// Teniu ja definides les funcions de cada exercici (menys del cinquè), només cal
// que ompliu el codi necessari.

document.getElementById("exer01").onclick = exercici01;
document.getElementById("exer02").onclick = exercici02;

function exercici01() {
  let text = document.getElementById("resultats");
  text.innerHTML = "Nombre total d’accidents: " + obj.length;
}

function exercici02() {
  let text = document.getElementById("resultats");
  let dias = [];
  for (let i = 0; i < obj.length; i++) {
    dias.push(obj[i].diaSet);
  }

  let dilluns = 0;
  let dimarts = 0;
  let dimecres = 0;
  let dijous = 0;
  let divendres = 0;
  let dissabte = 0;
  let diumenge = 0;

  for (let i = 0; i < dias.length; i=i+1) {
    if (dias[i] === "Dilluns"){
      dilluns = dilluns + 1;
    } 
    else if (dias[i] === "Dimarts") {
      dimarts = dimarts + 1;
    }
    else if (dias[i] === "Dimecres") {
      dimecres = dimecres + 1;
    }
    else if (dias[i] === "Dijous") {
      dijous = dijous + 1;
    }
    else if (dias[i] === "Divendres") {
      divendres = divendres + 1;
    }
    else if (dias[i] === "Dissabte") {
      dissabte = dissabte + 1;
    }
    else if (dias[i] === "Diumenge") {
      diumenge = diumenge + 1;
    }
  }

  let maxDia = "Dilluns";
  let max = dilluns;
    
  if (dimarts > max) { 
    max = dimarts; 
    maxDia = "Dimarts"; 
  }
  if (dimecres > max) { 
    max = dimecres; 
    maxDia = "Dimecres";
  }
  if (dijous > max) { 
    max = dijous; 
    maxDia = "Dijous"; 
  }
  if (divendres > max) { 
    max = divendres; 
    maxDia = "Divendres"; 
  }
  if (dissabte > max) { 
    max = dissabte; 
    maxDia = "Dissabte"; 
  }
  if (diumenge > max) { 
    max = diumenge; 
    maxDia = "Diumenge"; 
  }
  text.innerHTML = "Dia de la setmana amb més accidents " + maxDia + " amb " + max + " accidents";
}


function exercici03() {
 
}


function exercici04() {
   
}

