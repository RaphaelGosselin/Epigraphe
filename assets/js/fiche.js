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
        const prenom=document.getElementById('prenom');
        const nom=document.getElementById('nom');
        const lienImage=document.getElementById('url_image');
        const titreImage=document.getElementById('titre_image');
        const creditImage=document.getElementById('credit_image');
        const noteBiographique=document.getElementById('notes_biographiques');
        const maps = document.getElementById('carteZoom');
        const arrondissement =document.getElementById('arrondissement');
        const quartier=document.getElementById('quartier');
        const adresse=document.getElementById('adresse');
        const lienPlaque=document.getElementById('url_plaque');
        const transcriptPlaque=document.getElementById('transcript');
        const lienAudio=document.getElementById('audio_url');
        const resumeAudio=document.getElementById('audio_preambule');
        const transcriptAudio=document.getElementById('audio_transcription');
        const creditAudio=document.getElementById('audio_credit');
        const domaine=document.querySelector('section h1 + p');
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            localStorage.setItem(id, 'visite');
        }
        
//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", initialiser); //La partie 1 se charge avant de commencer autre chose
document.getElementById("btnSoumettre").addEventListener("click", validerPieceConviction);

//*************************
// Fonctions 
//*************************


function initialiser() {
 let intIdFicheCourante = obtenirValeurUrlParam('id');
        console.log(intIdFicheCourante);
        console.log(objJSONepigraphes[intIdFicheCourante]);
        prenom.innerHTML=objJSONepigraphes[intIdFicheCourante].PRENOM;
        nom.innerHTML=objJSONepigraphes[intIdFicheCourante].NOM;
        lienImage.src = "/images/" + intIdFicheCourante + ".jpg";
        titreImage.innerHTML=objJSONepigraphes[intIdFicheCourante].IMAGE.TITRE;
        creditImage.innerHTML=objJSONepigraphes[intIdFicheCourante].IMAGE.CREDIT;
        noteBiographique.innerHTML=objJSONepigraphes[intIdFicheCourante].BIOGRAPHIE;
        maps.src="/images/" + intIdFicheCourante +".png";
        arrondissement.innerHTML=objJSONepigraphes[intIdFicheCourante].ARRONDISSEMENT;
        quartier.innerHTML=objJSONepigraphes[intIdFicheCourante].QUARTIER;
        adresse.innerHTML=objJSONepigraphes[intIdFicheCourante].ADRESSE;
        lienPlaque.src = "/images/plaques/" + intIdFicheCourante  +".jpg";
        transcriptPlaque.innerHTML=objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION;
        lienAudio.src="/sonore/" + intIdFicheCourante +".mp3";
        resumeAudio.innerHTML=objJSONepigraphes[intIdFicheCourante].AUDIO.DESCRIPTION;
        transcriptAudio.innerHTML=objJSONepigraphes[intIdFicheCourante].AUDIO.TRANSCRIPTION;
        creditAudio.innerHTML=objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT;
        domaine.innerHTML=objJSONepigraphes[intIdFicheCourante].DOMAINE;
        document.title = objJSONepigraphes[intIdFicheCourante].PRENOM + " " + objJSONepigraphes[intIdFicheCourante].NOM 
        
    }


    function validerPieceConviction() {
        const refRadioCoche = document.querySelector('[name="formChasse"]:checked');
        const refMessage = document.getElementById('message');
    
        if (refRadioCoche === null) {
            refMessage.textContent = "Veuillez choisir un element";
        } else {
            console.log(refRadioCoche.value); 
    
            if (localStorage.getItem("id_" + refRadioCoche.value) == intIdFicheCourante) {
                refMessage.textContent = "Bonne réponse!";
                localStorage.setItem(refRadioCoche.value +"_est_trouve", "true");

            } else {
                refMessage.textContent = "Mauvaise réponse.";
            }
    
            console.log(localStorage.getItem("id_personnage"));
        }
    }
    