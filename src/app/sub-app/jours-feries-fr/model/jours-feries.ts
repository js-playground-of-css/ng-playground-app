
export class JoursFeries {

    constructor(
        private joursStr : string,
        private libelle : string
    ) {}

    getJoursStr() {
        return this.joursStr;
    }

    getLibelle() {
        return this.libelle;
    }

}