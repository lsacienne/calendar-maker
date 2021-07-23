
/* Gestion de la DOM */

let edt_texte_brut = document.getElementById('edt');
const form = document.getElementById('form');
console.log("texte récupéré : "+edt_texte_brut);

/* Obtention de l'emploi du temps au format brut fourni par l'UTBM */

function getEdt(event) {
    event.stopPropagation();
    event.preventDefault();
    let valeur_brute = edt_texte_brut.value;
    console.log("texte récupéré : "+valeur_brute);
    traitement_donnees(valeur_brute);
}
form.addEventListener('submit',getEdt,false);


/* Transformation de l'emploi du temps en des événements dans une première classe */

function traitement_donnees(valeur) {
    var i = 1;
    let lignes = valeur.split('\n');
    var edt_semi_brut = [];
    for(ligne of lignes){
        console.log('Ligne '+i+': '+ligne);

        let elements = ligne.split('\t');
        elements.splice(1,1);
        let nouveau_creneau = new CreneauBrut(elements);
        edt_semi_brut.push(nouveau_creneau);
        /*
        console.log("c1 contient : ", nouveau_creneau);
        */
        /*
        for(element of elements){
            console.log(element);
        }
        */

        i++;
    }
    console.log(" contenu de l'edt : ", edt_semi_brut);
    generate_ics();
}

function generate_ics() {
    console.log("I'm cooming");
    var cal = ics();
    cal.addEvent("hey", "hello", "nowhere", new Date(0), new Date(0));
    cal.download("hello");
}

