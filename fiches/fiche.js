// Fonctions utilitaires

/**
 * Obtenir la valeur d'un des paramètres (QueryParam) dans l'URL
 * @param {string} strParam - Nom du paramètre à rechercher dans l'URL
 * @returns {string} - Valeur correspondant au paramètre. 
 *                     Retourne null lorsqu'aucune valeur n'est trouvée.
 */
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}


/* Variables globales */



//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", initialiser); //La partie 1 se charge avant de commencer autre chose
document.getElementById("btnSoumettre").addEventListener("click", validerPieceConviction);

//*************************
// Fonctions 
//*************************

function initialiser() {
    //Insérer ici la partie 1 faite au dernier cours qui permet d'aller chercher les données dans le JSON
    let intIdFicheCourante = obtenirValeurUrlParam('id');
    localStorage.setItem(`${intIdFicheCourante}`, 'clicked');//Quand utilisateur  clique sur le lien ajoute l'id avec la valeur clicked
    console.log(intIdFicheCourante);
    //PRENOM
    document.querySelector("#prenom").innerHTML = objJSONepigraphes[intIdFicheCourante].PRENOM;
    //NOM
    document.querySelector("#nom").innerHTML = objJSONepigraphes[intIdFicheCourante].NOM;
    //IMAGE
    document.querySelector("#url_image").innerHTML = `<source media="(min-width:700px)" srcset="../assets/images/imageOptimisees/402/${intIdFicheCourante}.png">
                                                <source media="(min-width:400px)" srcset="../assets/images/imageOptimisees/242/${intIdFicheCourante}.png">
                                                <img src="../assets/images/imageOptimisees/402/${intIdFicheCourante}.png" alt="Flowers" style="width:auto;"></img>`;                                             
    //TITRE
    document.querySelector("#titre_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.TITRE;
    //CREDIT
    document.querySelector("#credit_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.CREDIT;
    //NOTES BIOGRAPHIQUES
    document.querySelector("#notes_biographiques").innerHTML = objJSONepigraphes[intIdFicheCourante].BIOGRAPHIE;
    //ARRONDISSEMENT
    document.querySelector("#arrondissement").innerHTML = objJSONepigraphes[intIdFicheCourante].ARRONDISSEMENT;
    //CARTE ZOOM
    document.querySelector("#carteZoom").src = `../assets/images/imageOptimisees/image_zoomGoogle_maps/${intIdFicheCourante}-maps.png`;
    //QUARTIER
    document.querySelector("#quartier").innerHTML = objJSONepigraphes[intIdFicheCourante].QUARTIER;
    //ADRESSE
    document.querySelector("#adresse").innerHTML = objJSONepigraphes[intIdFicheCourante].ADRESSE;
    //PLAQUE
    document.querySelector("#url_plaque").src = `../assets/images/epigraphes/${intIdFicheCourante}.png`;
    //URL PLAQUE
    document.querySelector("#url_plaque").setAttribute("alt", objJSONepigraphes[intIdFicheCourante].SUFFIXE_IMAGES);
    //TRANSCRIPT
    document.querySelector("#transcript").innerHTML = objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION;
    //PLAQUE COMMEMORATIVE
    //AUDIO DESCRIPTIONs
    document.querySelector("#audio_desc").innerHTML = objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION;
    document.querySelector("#audio_url").src = objJSONepigraphes[intIdFicheCourante].AUDIO.URL;
    document.querySelector("#audio_url").load();
    //PREAMBULE
    document.querySelector("#audio_preambule").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.DESCRIPTION;
    //TRANSCRIPTION
    document.querySelector("#audio_transcription").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.TRANSCRIPTION;
    //CREDIT
    document.querySelector("#audio_transcription").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT;

    // domaine 
    document.querySelector("#domaine").innerHTML = objJSONepigraphes[intIdFicheCourante].DOMAINE;
}


function validerPieceConviction() {
    console.log("la fonction validerPieceConviction est appelée!");
    const refRadioCoche = document.querySelector('[name="formChasse"]:checked');

    const refMessage = document.getElementById('message');//Ref du message pour donner notre rétroaction à l'utilisateur s'il a ou non la bonne réponse!
    const localStoragePersonnage = localStorage.getItem("id_personnage");
    const localStorageObjet = localStorage.getItem("id_objet");
    const localStorageLieu = localStorage.getItem("id_lieu");


    /*Vérifications à faire:
        -Je veux comparer ma fiche actuelle en querystring avec la bonne réponse en localStorage
        -Voir la page 3 de l'énoncé pdf pour savoir les rétroactions à afficher selon les situations!
        - pour lire dans le localStorage : localStorage.getItem(id_personnage).*/
    console.log(localStorage.getItem("id_personnage"));
    console.log(localStorage.getItem("id_objet"));
    console.log(localStorage.getItem("id_lieu"));
    console.log(obtenirValeurUrlParam('id'));

// SI aucune chasse est tiré ALORS affiche message d'erreur : aucune chasse en cours
    if (
        localStoragePersonnage === "null" &&
        localStorageObjet === "null" &&
        localStorageLieu === "null"
    ) {
        refMessage.innerHTML =
            "Aucune chasse en cours. Si vous désirez débuter une chasse, visitez la page «Chasse».";
    } 
// SINON chasse en cours
    else {
        //Si aucun bouton radio n'est sélectionné : message d'erreur veuillez sélectionner un élément
        if (!refRadioCoche) {
            refMessage.innerHTML = "Veuillez sélectionner un élément.";
            refMessage.style.color = "red";
        }
        //SI le bouton radio n'est pas égale à nul : on rentre dans la condition 
        if (refRadioCoche !== null) {
            //SI 
            // - l'id de la querystring est == à celle de personnage dans le local storage 
            // - ET que la valeur du bouton radio est égale à "personnage"
            // - ALORS affiche le message de félicitation
            if (
                localStoragePersonnage
                ==
                obtenirValeurUrlParam('id')
                &&
                refRadioCoche.value
                ==
                "personnage"
            ) {
                refMessage.innerHTML = "Bravo! Vous avez trouvé « texte de l’indice qui provient du fichier json »."
                refMessage.style.color = "green";
                localStorage.personnage_est_trouve = true;
            }
            //SI 
            // - l'id de la querystring est == à celle d'objet dans le local storage 
            // - ET que la valeur du bouton radio est égale à "objet"
            // - ALORS affiche le message de félicitation
            else if (
                localStorageObjet
                ==
                obtenirValeurUrlParam('id')
                &&
                refRadioCoche.value
                ==
                "objet"
            ) {
                refMessage.innerHTML = "Bravo! Vous avez trouvé « texte de l’indice qui provient du fichier json »."
                refMessage.style.color = "green";
                localStorage.objet_est_trouve = true;
            }
            //SI 
            // - l'id de la querystring est == à celle d'lieu dans le local storage 
            // - ET que la valeur du bouton radio est égale à "lieu"
            // - ALORS affiche le message de félicitation
            else if (
                localStorageLieu
                ==
                obtenirValeurUrlParam('id')
                &&
                refRadioCoche.value
                ==
                "lieu"
            ) {
                refMessage.innerHTML = "Bravo! Vous avez trouvé « texte de l’indice qui provient du fichier json »."
                refMessage.style.color = "green";
                localStorage.lieu_est_trouve = true;
            }
            //SINON affiche le message d'erreur
            else {
                refMessage.innerHTML = "Mauvaise Réponse";
                refMessage.style.color = "red";
            }
        }
    }

}



