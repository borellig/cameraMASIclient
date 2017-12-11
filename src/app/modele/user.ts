export class User {

  idUser:number;
  nom:String;
  prenom:String;
  mail:String;
  password:String;
  state:boolean;
  FK_groupe:number;

  constructor(idUser:number, nom:String, prenom:String, mail:String, password:String, state:boolean, group:number) {
    this.idUser=idUser;
    this.nom=nom;
    this.prenom=prenom;
    this.mail=mail;
    this.password=password;
    this.state=state;
    this.FK_groupe=group;
  }

  

}