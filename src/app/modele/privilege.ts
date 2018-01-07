export class Privileges  {
    
    idPrivilege:number;
    nom:string;
    state:string;

    constructor(nom:string, idPrivilege:number, state:string){
        this.nom=nom;
        this.idPrivilege=idPrivilege;
        this.state=state;
    }

    getall(){
        console.log("test");
    }
}