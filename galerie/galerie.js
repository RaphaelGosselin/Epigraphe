document.querySelectorAll(".menu_type_indice li, .menu_secteur_activite li").forEach(element => {
    element.addEventListener("click", function() {
        let filtreTexte = this.textContent.replace(/\s+/g, "-").trim();
        let figures = document.querySelectorAll(".personnage__figure");
        for (const figure of figures) {
            console.log(filtreTexte);
            // On récupère l'image à l'intérieur de la figure
            let img = figure.querySelector("img");
            img.classList.remove("contour");
            if (img.classList.contains(filtreTexte)){
                img.classList.add("contour");
            }
        }
    });
});