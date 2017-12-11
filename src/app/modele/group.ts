export class Group {
    idGroup:number;
    nom:String;
    state:Boolean;

    constructor(idGroup:number, nom:String, state:Boolean){
        this.idGroup=idGroup;
        this.nom=nom;
        this.state=state;
    }
}