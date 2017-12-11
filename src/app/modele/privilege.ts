export class Privilege {
    idPrivilege:number;
    nom:String;
    state:String;

    constructor(idPrivilege:number, nom:String, state:String){
        this.idPrivilege=idPrivilege;
        this.nom=nom;
        this.state=state;
    }
}