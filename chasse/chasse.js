/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

//*************************
// Écouteurs d'événements 
//*************************
//window.addEventListener("load", initialiser); //Pas de load de page pour le moment en partie 2.
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", unlockButton);
window.addEventListener("load", initialiser);

//*************************
// Fonctions 
//*************************
function initialiser(){
        //syntaxe alternative pour écrire en localStorage:
    //localStorage.setItem('id_personnage', "e0008"); 
    strIdPersonnage = localStorage.id_personnage;
    strIdObjet = localStorage.id_objet;
    strIdLieux = localStorage.id_lieu;
    //Afficher les indices qui parle du personnage
    document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE; 
    document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
    document.getElementById("personnagePicture").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdPersonnage}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdPersonnage}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdPersonnage}.png" alt="Flowers" style="width:auto;"></img>`;
    document.getElementById("personnageObjet").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdObjet}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdObjet}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdObjet}.png" alt="Flowers" style="width:auto;"></img>`;
    document.getElementById("personnageLieux").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdLieux}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdLieux}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdLieux}.png" alt="Flowers" style="width:auto;"></img>`;
    //Affiche les réponses
    document.querySelector("#personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
    document.querySelector("#objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.querySelector("#lieuSegment").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
    document.querySelector("#zoneEnigme").removeAttribute("hidden");
    //boutons
    document.querySelector("#btnDebuterChasse").setAttribute("disabled", "");
    document.querySelector("#btnDemarrerNouvelleChasse").removeAttribute("hidden");
    // Affichage du lien vers google map
    document.querySelector("#lienChercherIndices").removeAttribute("hidden");
    //Condition pour savoir si c'est trouvé
    //Si true change pour trouvé
    if(localStorage.personnage_est_trouve === "true"){
        document.querySelector("#personnageMessageTrouve").removeAttribute("hidden");
        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].PRENOM + " " + objJSONepigraphes[strIdPersonnage].NOM; 
    }
    //Si true change pour trouvé
    if(localStorage.objet_est_trouve === "true"){
        document.querySelector("#objetMessageTrouve").removeAttribute("hidden");
        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].PRENOM + " " + objJSONepigraphes[strIdObjet].NOM;
    }
    //Si true change pour trouvé
    if(localStorage.lieu_est_trouve === "true"){
        document.querySelector("#lieuMessageTrouve").removeAttribute("hidden");
        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieux].PRENOM + " " + objJSONepigraphes[strIdLieux].NOM;
    }
    //Si les 3 dans local storage sont a true on active vers la page concourt
    if(localStorage.personnage_est_trouve === "true" &&
        localStorage.objet_est_trouve === "true" &&
        localStorage.lieu_est_trouve === "true"
     ){
        document.querySelector("#zoneEnigme").removeAttribute("hidden");
        document.querySelector("#messageEtatChasse").setAttribute("hidden", "");
        document.querySelector("#zoneMessageChasseCompletee").removeAttribute("hidden", "");
        document.querySelector("#lienChercherIndices").setAttribute("hidden", "");
        document.querySelector("#btnDemarrerNouvelleChasse").setAttribute("hidden", "");
        document.querySelector("#btnDebuterChasse").remove("disabled");
     }
}
function demarrerChasse() {
    //Tirage au sort dans les tableaux des possibilités et mise en localStorage
    const strIdPersonnage = arrIdsPersonnagesAPiger[Math.floor(Math.random()* arrIdsPersonnagesAPiger.length)]; //devra être tiré au sort parmi celles du tab des personnages
    const strIdObjet = arrIdsObjetsAPiger[Math.floor(Math.random()* arrIdsObjetsAPiger.length)];
    const strIdLieux = arrIdsLieuxAPiger[Math.floor(Math.random()* arrIdsLieuxAPiger.length)];

    //syntaxe alternative pour écrire en localStorage: 
    localStorage.id_personnage = strIdPersonnage;
    localStorage.id_objet = strIdObjet;
    localStorage.id_lieu = strIdLieux;
    
    //Doit aussi mettre au départ que cette réponse n'est pas trouvée par l'utilisateur
    //Idem pour les autres catégories(objet et lieu)
    localStorage.personnage_est_trouve = false;
    localStorage.objet_est_trouve = false;
    localStorage.lieu_est_trouve = false;
    
    
//Important Attention à lecture dans le localstorage, cela retournera du texte plutôt qu'un booléen. Donc dans un if il faudra comparer à "false" plutôt que false.
    
    //Afficher les indices qui parle du personnage
    document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE; 
    document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
    document.getElementById("personnagePicture").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdPersonnage}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdPersonnage}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdPersonnage}.png" alt="Flowers" style="width:auto;"></img>`;
    document.getElementById("personnageObjet").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdObjet}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdObjet}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdObjet}.png" alt="Flowers" style="width:auto;"></img>`;
    document.getElementById("personnageLieux").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${strIdLieux}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${strIdLieux}.png">
                                                <img src="../assets/images/imageOptimisees/242/${strIdLieux}.png" alt="Flowers" style="width:auto;"></img>`;
    //Affiche les réponses
    document.querySelector("#personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.REPONSE;
    document.querySelector("#objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.REPONSE;
    document.querySelector("#lieuSegment").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.REPONSE;
    //boutons
    document.querySelector("#btnDebuterChasse").setAttribute("disabled", "");
    document.querySelector("#btnDemarrerNouvelleChasse").removeAttribute("hidden");
    // Affichage du lien vers google map
    document.querySelector("#lienChercherIndices").removeAttribute("hidden");
    window.location.reload();
}
//Réactive le bouton débuter chasse quand on clique sur le bouton Voulez-vous démarrer une nouvelle chassse
function unlockButton() {
    document.querySelector("#btnDebuterChasse").removeAttribute("disabled");
}

//à la partie 4 cette page de chasse va s'améliorer dans ses rétroactions de ce sera trouvé au nom en cours de chasse mais pour le moment, on peut juste aller voir dans le localStorage ce qui est enregistré! :)
//Si un des id_ dans le local storage == à undefined --> marque aucune chasse en cours SINON chasse en cours 
if(localStorage.id_personnage == undefined){
    document.querySelector("#messageEtatChasse").innerHTML = "Aucune chasse en cours";
}
else {
    document.querySelector("#messageEtatChasse").innerHTML = "Chasse en cours";
}
