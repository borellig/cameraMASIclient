export class Passage {
    idPassage:number;
    date:Date;
    direction:String;
    fk_user:number;
    fk_vehicule:number;
    fk_access:number;

    constructor(idPassage:number, date:Date, direction:String, fk_user:number, fk_vehicule:number, fk_access:number){
        this.idPassage=idPassage;
        this.date=date;
        this.direction=direction;
        this.fk_user=fk_user;
        this.fk_vehicule=fk_vehicule;
        this.fk_access=fk_access;
    }
}