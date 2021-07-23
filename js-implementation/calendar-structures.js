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
}