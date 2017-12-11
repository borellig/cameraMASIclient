export class Vehicule {
    plaque:String;
    state:boolean
    fk_user:number;

    constructor(plaque:string, state:boolean, fk_user:number) {
        this.plaque=plaque;
        this.state=state;
        this.fk_user=fk_user;
    }
}