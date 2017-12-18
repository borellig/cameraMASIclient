export class Access {
    nom:String
    idAccess:number;
    fk_parking:number;

    constructor(nom:String, idAccess:number, fk_parking:number){
        this.nom=nom;
        this.idAccess=idAccess;
        this.fk_parking=fk_parking;
    }
}