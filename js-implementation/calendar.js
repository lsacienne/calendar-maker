
/* Gestion de la DOM */

let edt_texte_brut = document.getElementById('edt');
let body = document.getElementsByTagName("body");
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

    generate_ics(edt_semi_brut);
}

/* Génération de l'emploi du temps au format ics */

function generate_ics(edt_semi_brut) {
    var cal = ics();
    
    var today = new Date();
    console.log("Date : "+today);
    jour = today.getDay();

    creneau1 = ajoutJourRelatif(today,edt_semi_brut[0]);

    console.log(creneau1);
    console.log(edt_semi_brut[0].uv+" : "+edt_semi_brut[0].convertDay());
    
    console.log(mettreHeure(creneau1,edt_semi_brut[0]));


    for(creneau_uv of edt_semi_brut) {
        ajouterCreneau(cal,creneau_uv,today);
    }




    cal.download("agenda");
}

/* Fonctions auxiliaires */

function ajouterJour(date,nbre_jours){
    let new_date = new Date(date.valueOf());
    new_date.setDate(date.getDate()+nbre_jours);
    return new_date;
}

/**
 * @brief Comparer deux jours
 * @param {int} jour1 
 * @param {int} jour2 
 * @returns 
 */
function comparaisonJours(jour1,jour2){
    return (7+jour2-jour1)%7;
}

function ajoutJourRelatif(date,jourRelatif) {
    return ajouterJour(date,comparaisonJours(date.getDay(),jourRelatif.convertDay()));
}

function mettreHeure(date,creneau) {
    let debut = new Date(date.valueOf());
    let fin = new Date(date.valueOf());
    debut.setHours(creneau.convertHour()[0],creneau.convertHour()[1],0,0);
    fin.setHours(creneau.convertHour()[2],creneau.convertHour()[3],0,0);

    return [debut,fin];
}

function ajouterCreneau(cal, uv, aujourdhui) {
    let jour_cours = ajoutJourRelatif(aujourdhui,uv);
    let creneau = mettreHeure(jour_cours,uv);
    let titre = uv.afficherTitre();
    let rule = new rrule('WEEKLY',ajouterJour(aujourdhui,18*7),uv.convertFreq());
    console.log("subject : "+typeof(titre));
    console.log("description : "+typeof(this.mode_ens));
    console.log("location : "+typeof(this.salle))
    console.log("begin "+typeof(creneau[0]));
    console.log("end : "+typeof(creneau[1]));
    
    console.log("ruleset : "+rule);
    if(typeof(uv.mode_ens === 'undefined')){
        console.log("resultat ajout : "+cal.addEvent(titre,"   -   ",uv.salle,creneau[0],creneau[1],rule));
    } else if(typeof(uv.salle) === 'undefined'){
        console.log("resultat ajout : "+cal.addEvent(titre,uv.mode_ens,"   -   ",creneau[0],creneau[1],rule));
    } else {
        console.log("resultat ajout : "+cal.addEvent(titre,uv.mode_ens,uv.salle,creneau[0],creneau[1],rule));
    }
    
}

