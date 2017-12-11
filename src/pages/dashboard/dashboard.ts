import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { AddUser } from "./adduser";

import { Vehicule } from "../../app/modele/vehicule"
import { User } from "../../app/modele/user"
import { Privilege } from "../../app/modele/privilege"
import { Passage } from "../../app/modele/passage"
import { Parking } from "../../app/modele/parking"
import { Group } from "../../app/modele/group"
import { ActivePeriod } from "../../app/modele/activePeriod"
import { Access } from "../../app/modele/access"
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'

var ipServer = "http://10.113.101.68";
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
  listItems: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public toastCtrl:ToastController, public http: Http) {
    this.filterOptions = new Array<String>();
    this.listItems = new Array<Object>();
    this.http.get(ipServer + portServer +"/users").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let user = new User(element.idUser, element.nom, element.prenom, element.mail, element.password, element.state, element.group);
        this.listItems.push(user);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  changeSegment(event) {
    console.log("changeSegment", this.onglet);
    switch (this.onglet) {
      case 'access':
        this.optionsChooser = "groups";
        this.filterOptions = new Array<String>();
        this.filter = null;
        this.filterOptions.push("alpha");
        this.filterOptions.push("beta");
        this.filterOptions.push("gamma");
        this.filterOptions.push("delta");
        ///////////////////////////////////
        this.listItems = new Array<User>();
        break;
      case 'parkings':
        this.optionsChooser = "parkings";
        this.listItems = new Array<Parking>();
        break;
      case 'stats':
        this.optionsChooser = "users";
        this.listItems = new Array<User>();
        break;
      default:
        this.filter = "users";
        this.listItems = new Array<User>();
    }
  }

  addMethods() {
    console.log("addMethods", this.onglet);
    switch (this.onglet) {
      case "users":
        this.createUser();
        break;
    
      default:
        break;
    }
    
  }

  createUser() {
    const profileModal = this.modalCtrl.create(AddUser);
    profileModal.onDidDismiss(data => {
      if (data != null){
        this.toastCtrl.create({
          message:"Utilisateur "+data.firstname+" "+data.surname+" créé.",
          position:"middle",
          duration:1000
        }).present();
        let user = new User(-1, data.surname, data.firstname, data.email, data.password, true, data.group);
        this.listItems.push(user);
        //ajout DB
      }
      else {
        this.toastCtrl.create({
          message:"Opération annulée",
          position:"middle",
          duration:2000
        }).present();
      }
    });
    profileModal.present();
  }

  optionsChooserMethods(name: String) {
    this.optionsChooser = name;
    this.filter = null;
    console.log("optionsChooserMethods", this.optionsChooser);
    switch (this.filter) {
      case "users":
        this.getAllUsers();
        break;
      case "groups":
        this.getAllGroups();
        break;
      case "privileges":
        this.getAllPrivileges();
        break;
      case "access":
        this.getAllAccess();
        break
      case "parkings":
        this.getAllParkings();
        break;
      case "activePeriods":
        this.getAllActivePeriods();
        break;
      case "passage":
        this.getAllPassages();
        break;
      case "vehicule":
        this.getAllVehicules();
        break;
        
      default:
        break;
    }
  }

  itemClicked(item: Object, i: number) {
    console.log("itemClicked", item);
  }



  getAllUsers(){
    this.http.get(ipServer + portServer + "/users").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let user = new User(element.idUser, element.nom, element.prenom, element.mail, element.password, element.state, element.group);
        this.listItems.push(user);
      });
    });
  }


  // Groupes
  getAllGroups(){
    this.http.get(ipServer + portServer + "/groups").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let group = new Group(element.idGroup, element.nom, element.state);
        this.listItems.push(group);
      });
    });
  }

  // Privilèges
  getAllPrivileges(){
    this.http.get(ipServer + portServer + "/privileges").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let privilege = new Privilege(element.idPrivilege, element.nom, element.state);
        this.listItems.push(privilege);
      });
    });
  }

  // Access
  getAllAccess(){
    this.http.get(ipServer + portServer + "/access").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let access = new Access(element.idAccess, element.fk_parking);
        this.listItems.push(access);
      });
    });
  }

  // Parkings
  getAllParkings(){
    this.http.get(ipServer + portServer + "/parkings").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let parking = new Parking(element.idParking, element.nom);
        this.listItems.push(parking);
      });
    });
  }

  // ActivePeriods
  getAllActivePeriods(){
    this.http.get(ipServer + portServer + "/activePeriods").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let activePeriod = new ActivePeriod(element.idActivePeriod, element.date, element.duration, element.fk_privilege);
        this.listItems.push(activePeriod);
      });
    });
  }

  // Passage
  getAllPassages(){
    this.http.get(ipServer + portServer + "/passages").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let passage = new Passage(element.idPassage, element.date, element.direction, element.fk_user, element.fk_vehicule, element.fk_access);
        this.listItems.push(passage);
      });
    });
  }

  // Vehicule
  getAllVehicules(){
    this.http.get(ipServer + portServer + "/vehicules").map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        let vehicule = new Vehicule(element.plaque, element.state, element.fk_user);
        this.listItems.push(vehicule);
      });
    });
  }



}


