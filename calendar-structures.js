class CreneauBrut {
    

    constructor(champs) {
        this.uv = champs[0];
        this.type = champs[1];
        this.jour = champs[2];
        this.heure_debut = champs[3];
        this.heure_fin = champs[4];
        this.frequence = champs[5];
        if(champs[6] == "Distanciel" && champs.length > 7) {
            this.salle = champs[7];
            this.mode_ens = champs[6];
        } else if (champs[6] == "Distanciel") {
            this.mode_ens = champs[6];
        } else if (champs.length > 7) {
            this.salle = champs[7];
            this.mode_ens = champs[6];
        } else {
            this.salle = champs[6];
        }
    }

    convertDay() {
        return dico_semaine.semaine.get(this.jour.split(' ')[0]);
    }

    convertHour() {
        let array = this.heure_debut.split(':').concat(this.heure_fin.split(':'));
        //console.log(array);
        let array_number = [];
        for(let mot of array) {
            array_number.push(parseInt(mot));
        }
        //console.log(array_number);
        return array_number;
    }

    afficherTitre() {
        return this.uv.concat(' - ',this.type);
    }

    convertFreq() {
        return parseInt(this.frequence,10);
    }

    ajouterDate(date) {
        this.date = date;
    }
}

class rrule {
    constructor(freq,until,interval) {
        this.freq = freq;
        this.until = until;
        this.interval = interval;
    }
}

class FormDate {
    constructor(uv,aujourdhui) {
        this.form = document.createElement('form');
        this.form.valeur = null;
        this.form.submitButton = null;

        this.titre = document.createElement('div');
        this.titre.classList.add('titreFormDate');
        this.titre.innerHTML = uv.afficherTitre();
        this.form.append(this.titre);


        this.rubriques = [];
        this.add();


        this.rubriques[0].addTwoChoiceQuestion(ajoutJourRelatif(aujourdhui,uv),uv);
        body.append(this.form);
        body.append($('footer'));

        
    }

    add() {
        let new_div = new DivForm();
        this.rubriques.push(new_div);
        this.form.append(new_div.div);
    }

    formEvent(submit) {
        this.form.submitButton = submit;
        this.form.addEventListener('change',getValueForm,false);
    }

}

class DivForm {
    constructor() {
        this.div = document.createElement('div');
        this.div.classList.add("divFormDate");

        this.inputs = [];

    }

    addRadioButton(date, uv,id) {
        let new_input = new RadioButtonForm("choix_date",date,id);
        new_input.addTextLabel(uv);
        this.inputs.push(new_input);
        this.div.append(new_input.radioDiv);
    }

    addTwoChoiceQuestion(date,uv) {
        this.addRadioButton(date,uv,"choix_1");
        this.addRadioButton(ajouterJour(date,7),uv,"choix_2");
    }
}

class RadioButtonForm {
    constructor(name,date,id) {
        this.radioDiv = document.createElement('div');
        this.radio = document.createElement('input');
        this.radio.type ='radio';
        this.radio.id = id;
        this.radio.name ="choix_date";
        this.date = date;
        this.radio.value = this.date.toString();

        this.label = document.createElement('label');
        this.label.for = this.radio.value;
        this.radioDiv.append(this.radio,this.label);
        
    }

    addTextLabel(uv) {
        var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
        let date = new Date(this.date);
        //this.label.innerHTML = this.radio.value.concat("  ",uv.afficherTitre());
        this.label.innerHTML = date.toLocaleDateString("fr-FR", options);
    }
}

class FinalSubmit {
    constructor(listeForms,edt){
        this.listeForms = listeForms;
        this.submitButton = document.createElement('input');
        for(FormDate of this.listeForms) {
            FormDate.formEvent(this);
        }
        this.submitButton.edt = edt;
        this.submitButton.listeForms = this.listeForms;

        this.submitButton.type = "submit";
        this.submitButton.value = "Téléchargez votre emploi du temps";
        this.submitButton.classList.add('finalSubmit');
        this.submitButton.disabled = true;


        this.divSubmit = document.createElement('div');
        this.divSubmit.classList.add('divSubmit');
        this.divSubmit.append(this.submitButton);

        body.append(this.divSubmit);
        body.append($('footer'));
    }

    
}