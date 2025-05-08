/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

//*************************
// Écouteurs d'événements 
//*************************
//window.addEventListener("load", initialiser); //Pas de load de page pour le moment en partie 2.
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
window.addEventListener("load", initialiser);

//*************************
// Fonctions 
//*************************
    function initialiser() {
        // Vérifier si une chasse est en cours
        if (localStorage.id_personnage && localStorage.id_objet && localStorage.id_lieu) {
            // Récupérer les données du localStorage
            const strIdPersonnage = localStorage.getItem("id_personnage");
            const strIdObjet = localStorage.getItem("id_objet");
            const strIdLieu = localStorage.getItem("id_lieu");
    
            // Mettre à jour les indices dans l'interface
            document.getElementById("personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
            document.getElementById("objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE; 
            document.getElementById("lieuSegment").innerHTML=objJSONepigraphes[strIdLieu].CHASSE.INDICE;
            document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
            document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
            document.getElementById("lieuIndice").innerHTML=objJSONepigraphes[strIdLieu].CHASSE.INDICE;
            // Mettre à jour l'état de la chasse
            document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours";
            document.getElementById("zoneEnigme").removeAttribute("hidden");
            document.getElementById("btnDebuterChasse").setAttribute("disabled", "");
            document.getElementById("btnDemarrerNouvelleChasse").removeAttribute("hidden");
            document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", function () {
                document.getElementById("btnDebuterChasse").removeAttribute("disabled");
            });
        
            
            // Vérifier si les éléments ont été trouvés et afficher les messages correspondants
            if (localStorage.personnage_est_trouve === "true" ) {
                document.getElementById("personnageMessageTrouve").removeAttribute("hidden");   
                
            }
            if (localStorage.objet_est_trouve === "true") {
                document.getElementById("objetMessageTrouve").removeAttribute("hidden");
                
                
            }
            if (localStorage.lieu_est_trouve === "true") {
                document.getElementById("lieuMessageTrouve").removeAttribute("hidden");
                
            }
    
         
        } else {
            // Si aucune chasse n'est en cours, cacher les éléments inutiles
            document.getElementById("messageEtatChasse").setAttribute("hidden", "");
            document.getElementById("zoneEnigme").setAttribute("hidden", "");
        }
        
        if (localStorage.personnage_est_trouve === "true" &&
            localStorage.objet_est_trouve === "true" &&
            localStorage.lieu_est_trouve === "true") {

               
                document.getElementById("zoneEnigme").setAttribute("hidden", "");
                document.getElementById("messageEtatChasse").setAttribute("hidden", "");
                document.getElementById("btnDemarrerNouvelleChasse").setAttribute("hidden", "");
                document.getElementById("btnDebuterChasse").setAttribute("hidden", "");
                document.getElementById("zoneMessageChasseCompletee").removeAttribute("hidden", "");
                document.getElementById("messageEtatChasseCompletee").removeAttribute("hidden", "");

                if (localStorage.personnage_est_trouve === "true" ) {
                    document.getElementById("personnageIndice").textContent = objJSONepigraphes[strIdPersonnage].CHASSE.REPONSE;
                }
                if (localStorage.objet_est_trouve === "true") {
                    document.getElementById("objetIndice").textContent = objJSONepigraphes[strIdObjet].CHASSE.REPONSE;
                }
                if (localStorage.lieu_est_trouve === "true") {
                    document.getElementById("lieuIndice").textContent = objJSONepigraphes[strIdLieu].CHASSE.REPONSE;
                }


            }
    }

function demarrerChasse() {
    //Tirage au sort dans les tableaux des possibilités et mise en localStorage
    tiragePersonnage = Math.floor(Math.random() * (arrIdsPersonnagesAPiger.length-1)+1);
    tirageObjet = Math.floor(Math.random() * (arrIdsObjetsAPiger.length-1)+1);
    tirageLieu = Math.floor(Math.random() * (arrIdsLieuxAPiger.length-1)+1);
    const numeroHasardObjet =tirageObjet;
    const numeroHasardLieu =tirageLieu;
    const numeroHasardPersonnage = tiragePersonnage;
    const strIdPersonnage = arrIdsPersonnagesAPiger[numeroHasardPersonnage] ;
    const strIdLieu =arrIdsLieuxAPiger[numeroHasardLieu];
    const strIdObjet = arrIdsObjetsAPiger[numeroHasardObjet];
   
    //devra être tiré au sort parmi celles du tab des personnages
    
    localStorage.id_personnage =strIdPersonnage ;
    localStorage.id_objet=strIdObjet;
    localStorage.id_lieu=strIdLieu;

    //syntaxe alternative pour écrire en localStorage:
    //localStorage.setItem('id_personnage', "e0008"); 
    
    //Doit aussi mettre au départ que cette réponse n'est pas trouvée par l'utilisateur
    //Idem pour les autres catégories(objet et lieu)
    localStorage.personnage_est_trouve = false;
    localStorage.objet_est_trouve = false;
    localStorage.lieu_est_trouve =false;
    
    
//Important Attention à lecture dans le localstorage, cela retournera du texte plutôt qu'un booléen. Donc dans un if il faudra comparer à "false" plutôt que false.
    
    //Afficher le segment qui parle du personnage
   


    if (localStorage.id_personnage == strIdPersonnage ) { 
        document.getElementById('messageEtatChasse').innerHTML ="Chasse en cours";
        document.getElementById('zoneEnigme').removeAttribute("hidden"," ");

        document.getElementById("personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
        document.getElementById("objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
        document.getElementById("lieuSegment").innerHTML=objJSONepigraphes[strIdLieu].CHASSE.INDICE;
 document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
    document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.getElementById("lieuIndice").innerHTML=objJSONepigraphes[strIdLieu].CHASSE.INDICE;
        document.getElementById("btnDebuterChasse").setAttribute("disabled", "");
        document.getElementById("btnDemarrerNouvelleChasse").removeAttribute("hidden", "");

        document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", function () {
            document.getElementById("btnDebuterChasse").removeAttribute("disabled");
        });
        
        document.getElementById("lienChercherIndices").removeAttribute("hidden", "");

    }}

// JavaScript Document