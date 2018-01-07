import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { AddUser } from "./adduser";
import { AddGroup } from "./addgroup";
import { AddParking } from "./addparking";

import { Vehicule } from "../../app/modele/vehicule"
import { User } from "../../app/modele/user"
import { Privileges } from "../../app/modele/privilege"
import { Passage } from "../../app/modele/passage"
import { Parking } from "../../app/modele/parking"
import { Group } from "../../app/modele/group"
import { ActivePeriod } from "../../app/modele/activePeriod"
import { Access } from "../../app/modele/access"
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'

var ipServer = "http://10.113.101.57";
var portServer = ":3000";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  onglet: String = "users";
  optionsChooser: String = "drivers";
  filter: String = "users";
  filterOptions: Array<String>;
  listItems: Array<any>;
  tabAnnexe: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toastCtrl: ToastController, public http: Http) {
    this.filterOptions = new Array<String>();
    this.listItems = new Array<any>();
    this.getAllUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  changeSegment(event) {
    console.log("changeSegment, Onglet", this.onglet);
    switch (this.onglet) {
      case 'access':
        this.optionsChooser = "groups";
        this.optionsChooserMethods(this.optionsChooser);
        this.filterOptions = new Array<String>();
        this.filter = null;
        this.filterOptions.push("alpha");
        this.filterOptions.push("beta");
        this.filterOptions.push("gamma");
        this.filterOptions.push("delta");
        ///////////////////////////////////
        //this.listItems = new Array<User>();
        break;
      case 'parkings':
        this.optionsChooser = "parkings";
        this.optionsChooserMethods(this.optionsChooser);
        this.listItems = new Array<Parking>();
        break;
      case 'stats':
        this.optionsChooser = "users";
        this.listItems = new Array<User>();
        this.getAllUsers();
        this.tabAnnexe = new Array<any>();
        this.getAllPassageUser();
        break;
      default:
        this.filter = "users";
        this.optionsChooser = "drivers";
        this.getAllUsers();
        this.listItems = new Array<User>();
    }
  }

  addMethods(item: any) {
    console.log("addMethods", this.onglet);
    switch (this.optionsChooser) {
      case "drivers":
        this.createUser(item);
        break;
      case "groups":
        this.createGroup(item);
        break;
      case "parkings":
        this.createParking(item);
        break;
      default:
        break;
    }

  }

  deleteMethods(item: any) {
    switch (this.optionsChooser) {
      case "drivers":
        this.deleteUser(item);
        break;
      case "groups":
        this.deleteGroup(item);
        break;
      case "parkings":
        this.deleteParking(item);
        break;
      default:
        break;
    }
  }

  deleteUser(user: User) {
    console.log(user.idUser);
    this.http.delete(ipServer + portServer + "/user/" + user.idUser).map(res => res.json()).subscribe(data => {
      this.toastCtrl.create({
        message: "Utilisateur " + user.nom + " " + user.prenom + " supprimé...",
        position: "middle",
        duration: 1000
      }).present();
    })
    this.listItems.splice(this.listItems.indexOf(user), 1);
  }

  deleteGroup(group: Group) {
    this.http.delete(ipServer + portServer + "/group/" + group.idGroup).map(res => res.json()).subscribe(data => {
      this.toastCtrl.create({
        message: "Groupe " + group.nom + " supprimé...",
        position: "middle",
        duration: 1000
      }).present();
    })
    this.listItems.splice(this.listItems.indexOf(group), 1);
  }

  deleteParking(parking: Parking) {
    this.http.delete(ipServer + portServer + "/parking/" + parking.idParking).map(res => res.json()).subscribe(data => {
      this.toastCtrl.create({
        message: "Parking " + parking.nom + " supprimé...",
        position: "middle",
        duration: 1000
      }).present();
    })
    this.listItems.splice(this.listItems.indexOf(parking), 1);
  }

  createUser(item: User) {
    console.log("create", item)
    const profileModal = this.modalCtrl.create(AddUser, item);
    profileModal.onDidDismiss(data => {
      if (data != -1 && data != null) {
        let user = new User(data.idUser, data.nom, data.prenom, data.mail, data.password, data.state, data.vehicule, data.FK_groupe);
        if (this.listItems.findIndex(elem => {
          return elem.idUser == user.idUser;
        }) == -1) {
          this.toastCtrl.create({
            message: "Utilisateur " + data.nom + " " + data.prenom + " créé.",
            position: "middle",
            duration: 1000
          }).present();
          this.listItems.push(user);
        }
        else {
          this.listItems[this.listItems.findIndex(elem => {
            return elem.idUser == user.idUser;
          })] = user;
          this.toastCtrl.create({
            message: "Utilisateur " + data.nom + " " + data.prenom + " modifié.",
            position: "middle",
            duration: 1000
          }).present();
        }
        //ajout DB
      }
      else {
        this.toastCtrl.create({
          message: "Opération annulée",
          position: "middle",
          duration: 2000
        }).present();
      }
    });
    profileModal.present();
  }

  isUserModified(user, id) {
    return user.idUser === id;
  }

  createGroup(item: User) {
    console.log("create", item)
    const profileModal = this.modalCtrl.create(AddGroup, item);
    profileModal.present();
  }

  createParking(item: User) {
    console.log("create", item)
    const profileModal = this.modalCtrl.create(AddParking, item);
    profileModal.present();
  }

  optionsChooserMethods(name: String) {
    this.optionsChooser = name;
    this.filter = null;
    console.log("optionsChooserMethods", this.optionsChooser);
    switch (this.optionsChooser) {
      case "drivers":
        this.listItems = new Array<any>();
        this.getAllUsers();
        break;
      case "groups":
        this.listItems = new Array<any>();
        this.getAllGroups();
        console.log("onglet", this.onglet);
        break;
      case "privileges":
        this.listItems = new Array<any>();
        this.getAllPrivileges();
        break;
      case "access":
        this.listItems = new Array<any>();
        this.getAllAccess();
        break
      case "parkings":
        this.listItems = new Array<any>();
        this.getAllParkings();
        break;
      case "activePeriods":
        this.listItems = new Array<any>();
        this.getAllActivePeriods();
        break;
      case "passage":
        this.listItems = new Array<any>();
        this.getAllPassages();
        break;
      case "vehicule":
        this.listItems = new Array<any>();
        this.getAllVehicules();
        break;

      default:
        break;
    }
  }

  tabFilter(user: User) {
    this.getAllPassageUserParam(user.idUser);
    // this.tabAnnexe = this.tabAnnexe.filter(element => {
    //   return element.FK_user == user.idUser;
    // })
  }

  itemClicked(item: Object, i: number) {
    console.log("itemClicked", item);
  }



  getAllUsers() {
    this.http.get(ipServer + portServer + "/users").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let user = new User(element.idUser, element.nom, element.prenom, element.mail, element.password, element.state, element.vehicule, element.FK_group);
        if (user.state) {
          this.listItems.push(user);
          console.log("user----", user);
        }
      });
    });
  }


  // Groupes
  getAllGroups() {
    this.http.get(ipServer + portServer + "/groups").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let group = new Group(element.idGroup, element.nom, element.state);
        this.listItems.push(group);
      });
    });
  }

  // Privilèges
  getAllPrivileges() {
    this.http.get(ipServer + portServer + "/privileges").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        console.log(data);
        let privilege = new Privileges(element.nom, element.idPrivilege, element.state);
        this.listItems.push(privilege);
      });
    });
  }

  // Access
  getAllAccess() {
    this.http.get(ipServer + portServer + "/access/all").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let access = new Access(element.nom, element.idAccess, element.fk_parking);
        this.listItems.push(access);
      });
    });
  }

  // Parkings
  getAllParkings() {
    this.http.get(ipServer + portServer + "/parkings").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let parking = new Parking(element.idParking, element.nom);
        this.listItems.push(parking);
      });
    });
  }

  // ActivePeriods
  getAllActivePeriods() {
    this.http.get(ipServer + portServer + "/activePeriods").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let activePeriod = new ActivePeriod(element.idActivePeriod, element.date, element.duration, element.fk_privilege);
        this.listItems.push(activePeriod);
      });
    });
  }

  // Passage
  getAllPassages() {
    this.http.get(ipServer + portServer + "/passages").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let passage = new Passage(element.idPassage, element.date, element.direction, element.fk_user, element.fk_vehicule, element.fk_access);
        this.listItems.push(passage);
      });
    });
  }

  // Vehicule
  getAllVehicules() {
    this.http.get(ipServer + portServer + "/vehicules").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let vehicule = new Vehicule(element.plaque, element.state, element.fk_user);
        this.listItems.push(vehicule);
      });
    });
  }

  getAllPassageUser() {
    this.http.get(ipServer + portServer + "/passages").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let passage: any;
        passage = new Object();
        passage.nomParking = element.nomParking;
        passage.person = element.prenomUser + " " + element.nomUser;
        passage.FK_vehicule = element.FK_vehicule;
        passage.date = new Date(element.date).toLocaleString();
        passage.direction = element.direction;
        passage.FK_user = element.FK_user;
        this.tabAnnexe.push(passage);
      });
    });
  }

  getAllPassageUserParam(userId:number) {
    this.tabAnnexe=new Array<any>();
    this.http.get(ipServer + portServer + "/passages").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        if(element.FK_user==userId){
          let passage: any;
          passage = new Object();
          passage.nomParking = element.nomParking;
          passage.person = element.prenomUser + " " + element.nomUser;
          passage.FK_vehicule = element.FK_vehicule;
          passage.date = new Date(element.date).toLocaleString();
          passage.direction = element.direction;
          passage.FK_user=element.FK_user;
          this.tabAnnexe.push(passage);
        }
      });
    });
  }



}


