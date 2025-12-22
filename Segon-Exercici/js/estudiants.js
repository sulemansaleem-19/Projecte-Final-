// Treballarem sempre amb una variable global, obj, què és una taula on estan 
// guardats tots els accidents de l'any. Qualsevol altre variable que necessitem
// haurà de ser, necessàriament, una variable local.

// Com que al document html no hi ha controladors d'esdeveniments, els haurem de crear aquí:



// Teniu ja definides les funcions de cada exercici (menys del cinquè), només cal
// que ompliu el codi necessari.

document.getElementById("exer01").onclick = exercici01;
document.getElementById("exer02").onclick = exercici02;
document.getElementById("exer03").onclick = exercici03;

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

  let text = document.getElementById("resultats");
  text.innerHTML = "";
  let dist = []; 
  for (let i = 0; i < obj.length; i++) { 
    dist.push(obj[i].nDist); 
        
  } 
  let dist1 = 0; 
  let dist2 = 0; 
  let dist3 = 0; 
  let dist4 = 0; 
  let dist5 = 0; 
  let dist6 = 0; 
  let dist7 = 0; 
  let dist8 = 0; 
  let dist9 = 0; 
  let dist10 = 0; 
  let Altres = 0;
    
  for (let i = 0; i < dist.length; i = i + 1) { 
    if (dist[i] === 1) {
      dist1 = dist1 + 1; 
    }    
    else if (dist[i] === 2) {
      dist2 = dist2 + 1; 
    }    
    else if (dist[i] === 3) {
      dist3 = dist3 + 1; 
    }    
    else if (dist[i] === 4){
      dist4 = dist4 + 1; 
    }  
    else if (dist[i] === 5) {
      dist5 = dist5 + 1; 
    }
    else if (dist[i] === 6) {
      dist6 = dist6 + 1; 
    }    
    else if (dist[i] === 7){
      dist7 = dist7 + 1; 
    }  
    else if (dist[i] === 8) {
      dist8 = dist8 + 1; 
    }
    else if (dist[i] === 9) {
      dist9 = dist9 + 1; 
    }
    else if (dist[i] === 10) {
      dist10 = dist10 + 1; 
    }
    else if (dist[i] === -1) {
      Altres = Altres + 1; 
    }
  }

  let NewHeading = document.createElement("h2");
  let tNheading = document.createTextNode("Llista d'accidents per districte");
  NewHeading.appendChild(tNheading);
    
  let ul = document.createElement("ul");
    
    
  let lidist1 = document.createElement("li");
  let tNdist1 = document.createTextNode("Districte 1: " + dist1 + " accidents");
  lidist1.appendChild(tNdist1);
  ul.appendChild(lidist1);
  
  let lidist2 = document.createElement("li");
  let tNdist2 = document.createTextNode("Districte 2: " + dist2 + " accidents");
  lidist2.appendChild(tNdist2);
  ul.appendChild(lidist2);
    
  let lidist3 = document.createElement("li");
  let tNdist3 = document.createTextNode("Districte 3: " + dist3 + " accidents");
  lidist3.appendChild(tNdist3);
  ul.appendChild(lidist3);
    
  let lidist4 = document.createElement("li");
  let tNdist4 = document.createTextNode("Districte 4: " + dist4 + " accidents");
  lidist4.appendChild(tNdist4);
  ul.appendChild(lidist4);
    
  let lidist5 = document.createElement("li");
  let tNdist5 = document.createTextNode("Districte 5: " + dist5 + " accidents");
  lidist5.appendChild(tNdist5);
  ul.appendChild(lidist5);
    
  let lidist6 = document.createElement("li");
  let tNdist6 = document.createTextNode("Districte 6: " + dist6 + " accidents");
  lidist6.appendChild(tNdist6);
  ul.appendChild(lidist6);
    
  let lidist7 = document.createElement("li");
  let tNdist7 = document.createTextNode("Districte 7: " + dist7 + " accidents");
  lidist7.appendChild(tNdist7);
  ul.appendChild(lidist7);
    
  let lidist8 = document.createElement("li");
  let tNdist8 = document.createTextNode("Districte 8: " + dist8 + " accidents");
  lidist8.appendChild(tNdist8);
  ul.appendChild(lidist8);
    
  let lidist9 = document.createElement("li");
  let tNdist9 = document.createTextNode("Districte 9: " + dist9 + " accidents");
  lidist9.appendChild(tNdist9);
  ul.appendChild(lidist9);
    
  let lidist10 = document.createElement("li");
  let tNdist10 = document.createTextNode("Districte 10: " + dist10 + " accidents");
  lidist10.appendChild(tNdist10);
  ul.appendChild(lidist10);
   
  let Altresli = document.createElement("li");
  let tNaltres = document.createTextNode("Altres: " + Altres + " accidents");
  Altresli.appendChild(tNaltres);
  ul.appendChild(Altresli);

  text.appendChild(NewHeading);
  text.appendChild(ul);
}


function exercici04() {
   
}

