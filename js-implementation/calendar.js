let edt_texte_brut = document.getElementById('edt');
const form = document.getElementById('form');
console.log("texte récupéré : "+edt_texte_brut);

function getEdt(event) {
    event.stopPropagation();
    event.preventDefault();
    let valeur_brute = edt_texte_brut.value;
    console.log("texte récupéré : "+valeur_brute);
    traitement_donnees(valeur_brute);
}
form.addEventListener('submit',getEdt,false);

function traitement_donnees(valeur) {
    var i = 1;
    let lignes = valeur.split('\n');
    for(ligne of lignes){
        console.log('Ligne '+i+': '+ligne);

        let elements = ligne.split('\t');
        delete elements[1];
        for(element of elements){
            if(element){
                console.log(element);
            }
        }

        i++;
    }
}

