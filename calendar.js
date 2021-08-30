
/*************************************
 ******* Gestion de la DOM ***********
 *************************************/

let edt_texte_brut = $('#edt')[0];
let body = $("body");
const form = $('#form')[0];

/* Obtention des différentes inputs de type date */
let date_debut_cours = $('#date_debut_cours')[0];
let date_fin_cours = $('#date_fin_cours')[0];

let date_debut_vacances_1 = $('#date_debut_vacances_1')[0];
let date_fin_vacances_1 = $('#date_fin_vacances_1')[0];

let date_debut_vacances_2 = $('#date_debut_vacances_2')[0];
let date_fin_vacances_2 = $('#date_fin_vacances_2')[0];

/* Heure actuelle */
let maintenant = new Date();

/* Date de début des cours */
date_debut_cours.min = maintenant.toISOString().split('T')[0];
date_debut_cours.value = maintenant.toISOString().split('T')[0];
date_debut_cours.addEventListener('change',function(){
    let nlle_date = new Date(date_debut_cours.value);
    date_fin_cours.value = ajouterJour(nlle_date,7*19).toISOString().split('T')[0];
    date_debut_vacances_1.min = date_debut_cours.value;
    date_debut_vacances_2.min = date_debut_cours.value;
    date_fin_vacances_1.min = ajouterJour(new Date(date_debut_vacances_1.min),7).toISOString().split('T')[0];
    date_fin_vacances_2.min = ajouterJour(new Date(date_debut_vacances_2.min),7).toISOString().split('T')[0];
},false);

/* Date des vacances */
date_debut_vacances_1.min = date_debut_cours.value;
date_fin_vacances_1.min = ajouterJour(new Date(date_debut_vacances_1.min),7).toISOString().split('T')[0];

date_debut_vacances_2.min = date_fin_vacances_1.min;
date_fin_vacances_2.min = ajouterJour(new Date(date_debut_vacances_2.min),7).toISOString().split('T')[0];

date_debut_vacances_1.addEventListener('change',function(){
    date_fin_vacances_1.min = ajouterJour(new Date(date_debut_vacances_1.value),7).toISOString().split('T')[0];
    date_fin_vacances_1.value = date_fin_vacances_1.min;
    
    date_debut_vacances_2.disabled = false;
    date_fin_vacances_2.disabled = false;
    
    date_debut_vacances_2.min = date_fin_vacances_1.min;
    date_fin_vacances_2.min = ajouterJour(new Date(date_debut_vacances_2.min),7).toISOString().split('T')[0];
},false);

date_fin_vacances_1.addEventListener('change',function(){
    date_debut_vacances_2.min = date_fin_vacances_1.min;
    date_fin_vacances_2.min = ajouterJour(new Date(date_debut_vacances_2.min),7).toISOString().split('T')[0];
},false);

date_debut_vacances_2.addEventListener('change',function(){
    date_fin_vacances_2.min = ajouterJour(new Date(date_debut_vacances_2.value),7).toISOString().split('T')[0];
    date_fin_vacances_2.value = date_fin_vacances_2.min;
},false);


/* Date de la fin des cours */
date_fin_cours.value = ajouterJour(maintenant,7*19).toISOString().split('T')[0];

/*************************************
 ******* Fonction(s) jQuery **********
 *************************************/

function scrollToAnimation(target, speed,additionalPixels) {
    console.log(target);
    $target = $(target);
    console.log($target);
    console.log("position : "+$target.offset().top);
    console.log("hieght : "+$target.height());
    if(typeof(speed) === 'undefined' || speed <= 0) {
        speed = 1000;
    }

    if(typeof(additionalPixels) === 'undefined' || additionalPixels < 0) {
        additionalPixels = 0;
    }
    $('html, body').animate( {scrollTop: $target.offset().top - $(window).height() + $target.height() + parseInt($target.css('marginBottom'), 10) + additionalPixels },speed);

}



/*************************************
 ******* Traitment des données *******
 *************************************/

/* Obtention de l'emploi du temps au format brut fourni par l'UTBM */


function getEdt(event) {
    
    try {
        event.stopPropagation();
        event.preventDefault();
        let valeur_brute = edt_texte_brut.value;
        traitement_donnees(valeur_brute);
    } catch(err) {
        console.log(err);
        alert("Saisie incorrecte, veuillez réessayer !");
    }
    
    
   /*
    event.stopPropagation();
    event.preventDefault();
    let valeur_brute = edt_texte_brut.value;
    traitement_donnees(valeur_brute);
    */
}
form.addEventListener('submit',getEdt,false);

function generateForm(uv,aujourdhui){
    return new FormDate(uv,aujourdhui);
}


/* Transformation de l'emploi du temps en des événements dans une première classe */

function traitement_donnees(valeur) {
    var i = 1;
    let listeForms = [];
    let lignes = valeur.split('\n');
    var edt_semi_brut = [];
    for(ligne of lignes){
        console.log('Ligne '+i+': '+ligne);

        let elements = ligne.split('\t');
        elements.splice(1,1);
        if(typeof(elements[1]) != 'undefined' ) {
            let nouveau_creneau = new CreneauBrut(elements);
            edt_semi_brut.push(nouveau_creneau);
            if(nouveau_creneau.convertFreq()==2) {
                listeForms.push(generateForm(nouveau_creneau,new Date(date_debut_cours.value)));
            }

            i++;
        }
        
    }
    if(edt_semi_brut.length == 0) {
        throw "Erreur de saisie : veuillez rentrer au moins un créneau!";
    }
    if(listeForms.length == 0) {
        generate_ics(edt_semi_brut);
    } else {
        scrollToAnimation(listeForms[0].form,500);
        submit = new FinalSubmit(listeForms,edt_semi_brut);
        submit.submitButton.addEventListener('click',init_generation,false);
    }
    


    //generate_ics(edt_semi_brut);
}

function init_generation(evt) {
    let edt = evt.currentTarget.edt;
    for(CreneauBrut of edt) {
        if(CreneauBrut.convertFreq()==2) {
            for(cours of evt.currentTarget.listeForms) {
                if(cours.titre.innerHTML === CreneauBrut.afficherTitre()) {
                    CreneauBrut.ajouterDate(cours.form.valeur);
                    console.log(CreneauBrut.afficherTitre());
                }
            }
        } 
    }
    generate_ics(edt);
}

/**
 * @brief Fonction permettant de connaître quelle checkbox d'un form a été cliquée.
 * @param {Event} evt 
 */
function getValueForm(evt) {
    if(evt.currentTarget.children[1].children[0].children[0].checked) {
        evt.currentTarget.valeur = evt.currentTarget.children[1].children[0].children[0].value;
    } else if (evt.currentTarget.children[1].children[1].children[0].checked) {
        evt.currentTarget.valeur = evt.currentTarget.children[1].children[1].children[0].value;
    }
    updateSubmission();  
}


function updateSubmission() {
    let activateButton = true;
    for(FormDate of submit.listeForms) {
        if(!FormDate.form.valeur){
            scrollToAnimation(FormDate.form,500);
            activateButton = false;
            break;
        }
    }

    /* On réalise un test pour savoir si tous les forms ont été cliqué si et seulement si l'utilisateur
     * le bouton n'est pas actif. Auquel cas on n'effectue pas d'opérations inutiles. Sinon on active ce
     * bouton.
     */
    if(activateButton && submit.submitButton.disabled) {
        scrollToAnimation(body,500,80);
        submit.submitButton.disabled = false;
        console.log("button is active");
    }
}

/* Génération de l'emploi du temps au format ics */

function generate_ics(edt_semi_brut) {
    var cal = ics();



    for(creneau_uv of edt_semi_brut) {
        ajouterCreneau(cal,creneau_uv,new Date(date_debut_cours.value),0);
    }




    cal.download("agenda");
}

/* Fonctions auxiliaires */

function ajouterJour(date,nbre_jours){
    let new_date = new Date(date.valueOf());
    new_date.setDate(date.getDate()+nbre_jours);
    /*
    console.log("ajouterJour : ");
    console.log("date : "+date.getDate());
    console.log("nbre_jours : "+nbre_jours);
    console.log("fin ajouterJour");
    */
    return new_date;
}

/**
 * @brief Comparer deux jours
 * @param {int} jour1 
 * @param {int} jour2 
 * @returns 
 */
function comparaisonJours(jour1,jour2){
    //console.log(jour2+" - "+jour1+" = ");
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

function ajouterCreneau(cal, uv, aujourdhui,profondeur_recursive,which_week,isNextWeek) {
    let jour_cours = null;
    if(typeof(uv.date) === 'undefined' || profondeur_recursive != 0) {
        if(typeof(which_week) === 'undefined' || which_week == 0) {
            jour_cours = ajoutJourRelatif(aujourdhui,uv);
        } else {
            jour_cours = ajouterJour(ajoutJourRelatif(aujourdhui,uv),7);
        }
        
    } else if(profondeur_recursive == 0){
        jour_cours = uv.date;
        isNextWeek = (ajoutJourRelatif(aujourdhui,uv).getDate() == new Date(jour_cours).getDate());
        console.log(isNextWeek);
    }
    if(!(new Date(jour_cours))){
        throw "Erreur de date !";
    }

    //console.log(uv.afficherTitre()+" "+jour_cours);
    let creneau = mettreHeure(jour_cours,uv);
    let titre = uv.afficherTitre();
    let rule = null;

    if(date_debut_vacances_1.value && profondeur_recursive == 0) {
        rule = new rrule('WEEKLY',new Date(date_debut_vacances_1.value),uv.convertFreq());

        /* Conditions pour placer le prochain cours au retour des vacances 1 */
        if(knowLengthPeriod("debut_cours","vacances_1") % 2 == 0 && uv.convertFreq() > 1) {
            if(isNextWeek) {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_1.value),1),1,1,isNextWeek);
            } else {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_1.value),1),1,0,isNextWeek);
            }
        } else if(knowLengthPeriod("debut_cours","vacances_1") % 2 == 1 && uv.convertFreq() > 1) {
            if(isNextWeek) {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_1.value),1),1,0,isNextWeek);
            } else {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_1.value),1),1,1,isNextWeek);
            }
        } else {
            ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_1.value),1),1);
        }
        

    } else if(date_debut_vacances_2.value && profondeur_recursive == 1) {
        rule = new rrule('WEEKLY',new Date(date_debut_vacances_2.value),uv.convertFreq());
        //console.log(knowLengthPeriod("vacances_1","vacances_2"));
        /* Conditions pour placer le prochain cours au retour des vacances 2 */
        if((knowLengthPeriod("vacances_1","vacances_2")) % 2 == 0 && uv.convertFreq() > 1) {
            if(isNextWeek) {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_2.value),1),2,0,isNextWeek);
            } else {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_2.value),1),2,1,isNextWeek);
            }
        } else if((knowLengthPeriod("vacances_1","vacances_2")) % 2 == 1 && uv.convertFreq() > 1) {
            if(isNextWeek) {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_2.value),1),2,1,isNextWeek);
            } else {
                ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_2.value),1),2,0,isNextWeek);
            }
        } else {
            ajouterCreneau(cal,uv,ajouterJour(new Date(date_fin_vacances_2.value),1),2);
        }

    } else {
        rule = new rrule('WEEKLY',new Date(date_fin_cours.value),uv.convertFreq());
    }
    /*
    console.log("subject : "+typeof(titre));
    console.log("description : "+typeof(this.mode_ens));
    console.log("location : "+typeof(this.salle))
    console.log("begin "+typeof(creneau[0]));
    console.log("end : "+typeof(creneau[1]));
    
    console.log("ruleset : "+rule);
    */
    if(typeof(uv.mode_ens) === 'undefined'){
        //console.log("resultat ajout : "+cal.addEvent(titre,"   -   ",uv.salle,creneau[0],creneau[1],rule));
        cal.addEvent(titre,"   -   ",uv.salle,creneau[0],creneau[1],rule);
    } else if(typeof(uv.salle) === 'undefined'){
        //console.log("resultat ajout : "+cal.addEvent(titre,uv.mode_ens,"   -   ",creneau[0],creneau[1],rule));
        cal.addEvent(titre,uv.mode_ens,"   -   ",creneau[0],creneau[1],rule);
    } else {
        //console.log("resultat ajout : "+cal.addEvent(titre,uv.mode_ens,uv.salle,creneau[0],creneau[1],rule));
        cal.addEvent(titre,uv.mode_ens,uv.salle,creneau[0],creneau[1],rule);
    }
    
}



function differenceSemaines(date1, date2)
{
  date1 = date1.getTime() / 86400000;
  date2 = date2.getTime() / 86400000;
  return Math.floor((new Number(date2 - date1).toFixed(0))/7);
}

function knowLengthHoliday(which_holidays) {
    if(which_holidays == 1) {
        return differenceSemaines(new Date(date_debut_vacances_1.value),new Date(date_fin_vacances_1.value));
    } else {
        return differenceSemaines(new Date(date_debut_vacances_2.value),new Date(date_fin_vacances_2.value));
    } 
}

function knowLengthPeriod(debut,fin) {
    let date1 = null;
    let date2 = null;

    if(debut === "debut_cours") {
        date1 = new Date(date_debut_cours.value);
    } else if(debut === "vacances_1") {
        date1 = ajouterJour(new Date(date_fin_vacances_1.value),1);
    } else if(debut === "vacances_2") {
        date1 = ajouterJour(new Date(date_fin_vacances_2.value),1);
    }

    if(fin === "fin_cours") {
        date2 = new Date(date_fin_cours.value);
    } else if(fin === "vacances_1") {
        date2 = new Date(date_debut_vacances_1.value);
    } else if(fin === "vacances_2") {
        date2 = new Date(date_debut_vacances_2.value);
    }

    return differenceSemaines(date1,date2);
}

