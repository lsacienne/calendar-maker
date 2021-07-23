
/* Gestion de la DOM */

let edt_texte_brut = document.getElementById('edt');
let body = document.getElementsByTagName("body");
const form = document.getElementById('form');

/* Obtention de l'emploi du temps au format brut fourni par l'UTBM */


function getEdt(event) {
    try {
        event.stopPropagation();
        event.preventDefault();
        let valeur_brute = edt_texte_brut.value;
        traitement_donnees(valeur_brute);
    } catch(err) {
        alert("Saisie incorrecte, veuillez réessayer !");
    }
}
form.addEventListener('submit',getEdt,false);

function generateForm(uv,aujourdhui){
    let new_form = document.createElement('form');

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    let radio1 = document.createElement('input');
    let radio2 = document.createElement('input');

    div1.style.display = "list-item";
    div2.style.display = "list-item";
    div1.style.listStyle="none"
    div2.style.listStyle="none"

    radio1.type ='radio';
    radio2.type ='radio';

    radio1.class ='firstDate';
    radio2.class ='secondDate';

    radio1.name ='choix_date';
    radio2.name ='choix_date';
    
    radio1.value = ajoutJourRelatif(aujourdhui,uv).toString();
    radio2.value = ajouterJour(ajoutJourRelatif(aujourdhui,uv),7).toString();

    let label1 = document.createElement('label');
    let label2 = document.createElement('label');

    label1.for = 'firstDate';
    label2.for = 'secondDate';

    label1.innerHTML = ajoutJourRelatif(aujourdhui,uv).toString().concat("  ",uv.afficherTitre());
    label2.innerHTML = ajouterJour(ajoutJourRelatif(aujourdhui,uv),7).toString().concat("  ",uv.afficherTitre());

    div1.append(radio1,label1);
    div2.append(radio2,label2);

    new_form.append(div1,div2);
    body[0].append(new_form);
}


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
        if(nouveau_creneau.convertFreq()==2) {
            generateForm(nouveau_creneau,new Date());
        }

        i++;
    }



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

