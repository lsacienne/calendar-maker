class CreneauBrut {
    /*
    constructor(uv,type,jour,heure_debut,heure_fin,frequence,salle,mode_ens) {
        this.uv = uv;
        this.type = type;
        this.jour = jour;
        this.heure_debut = heure_debut;
        this.heure_fin = heure_fin;
        this.frequence = frequence;
        this.salle = salle;
        if(typeof(mode_ens) != undefined) {
            this.mode_ens = mode_ens;
        }
        
    }
    */

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
        return dico_semaine.semaine.get(this.jour);
    }

    convertHour() {
        let array = this.heure_debut.split(':').concat(this.heure_fin.split(':'));
        let i = 0;
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
}

class rrule {
    constructor(freq,until,interval) {
        this.freq = freq;
        this.until = until;
        this.interval = interval;
    }
}



const jour_ics = {
    LUNDI:1,
    MARDI:2,
    MERCREDI:3,
    JEUDI:4,
    VENDREDI:5,
    SAMEDI:6,
    DIMANCHE:7
}