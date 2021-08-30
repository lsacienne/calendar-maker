class JourSemaine {
    constructor() {
        this.semaine = new Map();
        this.semaine.set("lundi",1);
        this.semaine.set("mardi",2);
        this.semaine.set("mercredi",3);
        this.semaine.set("jeudi",4);
        this.semaine.set("vendredi",5);
        this.semaine.set("samedi",6);
        this.semaine.set("dimanche",7);

        this.semaine.set("lundi ",1);
        this.semaine.set("mardi ",2);
        this.semaine.set("mercredi ",3);
        this.semaine.set("jeudi ",4);
        this.semaine.set("vendredi ",5);
        this.semaine.set("samedi ",6);
        this.semaine.set("dimanche ",7);
    }
}

const dico_semaine = new JourSemaine();