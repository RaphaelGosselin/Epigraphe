/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");


//*************************
// Écouteurs d'événements 
//*************************
//window.addEventListener("load", initialiser); //Pas de load de page pour le moment en partie 2.
document.getElementById("btn_piger").addEventListener("click", demarrerChasse);
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
        }}
        