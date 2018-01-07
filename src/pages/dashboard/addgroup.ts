import { Component } from '@angular/core';
import { Privileges } from '../../app/modele/privilege';
import { Vehicule } from '../../app/modele/vehicule';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'

/**
 * Generated class for the AddgroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'add-group',
  templateUrl: 'addgroup.html',
})
export class AddGroup {

  nom: string;
  listPrivilegeAssocie: Array<Privileges>;
  listPrivilegeNotAssocie: Array<Privileges>;
  listToAdd: Array<Privileges>;
  listToRemove: Array<Privileges>

  constructor( public viewCtrl: ViewController, public navParams: NavParams, public http: Http) {
    this.nom = navParams.data.nom;
    this.listPrivilegeAssocie = new Array<Privileges>();
    this.listPrivilegeNotAssocie = new Array<Privileges>();
    if (navParams.data.idGroup != undefined) {
      this.http.get("http://10.113.101.57:3000/Privileges/" + navParams.data.idGroup + "/on").map(res => res.json()).subscribe(data => {
        console.log("data", data);
        data.forEach(element => {
          var Privilege = new Privileges(element.nom, element.idprivilege, element.FK_group);
          this.listPrivilegeAssocie.push(Privilege);
        });
        console.log("liston", this.listPrivilegeAssocie)
      });
      this.http.get("http://10.113.101.57:3000/Privileges/" + navParams.data.idGroup + "/off").map(res => res.json()).subscribe(data => {
        data.forEach(element => {
          var Privilege = new Privileges(element.nom, element.idprivilege, element.FK_group);
          this.listPrivilegeNotAssocie.push(Privilege);
        });
      });
    }
    else {
      this.http.get("http://10.113.101.57:3000/privileges").map(res => res.json()).subscribe(data => {
        data.forEach(element => {
          var Privilege = new Privileges(element.nom, element.idprivilege, element.FK_group);
          this.listPrivilegeNotAssocie.push(Privilege);
        });
      });
    }
    this.listToAdd = new Array<Privileges>();
    this.listToRemove = new Array<Privileges>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddgroupPage');
  }

  addToAdd(Privilege: Privileges) {
    this.listToAdd.push(Privilege);
  }

  removeToAdd(Privilege: Privileges) {
    this.listToAdd.splice(this.listToAdd.findIndex(element => {
      return element == Privilege
    }), 1);
  }

  addToRemove(Privilege: Privileges) {
    this.listToRemove.push(Privilege);
  }

  removeToRemove(Privilege: Privileges) {
    this.listToRemove.splice(this.listToRemove.findIndex(element => {
      return element == Privilege
    }), 1);
  }

  onList(Privilege: Privileges) {
    console.log("onlist", Privilege);
    if (this.listToRemove.findIndex(element => { return element == Privilege }) != -1) {
      this.removeToRemove(Privilege);

    }
    else {
      this.addToRemove(Privilege);
    }
    console.log(this.listToRemove);
  }

  offList(Privilege: Privileges) {
    if (this.listToAdd.findIndex(element => { return element == Privilege }) != -1) {
      this.removeToAdd(Privilege);

    }
    else {
      this.addToAdd(Privilege);
    }
    console.log(this.listToAdd);
  }

  getColorOn(Privilege: Privileges) {
    if (this.listToRemove.findIndex(element => { return element == Privilege }) != -1) {
      return "lightgray"
    }
    else {
      return "#488aff"
    }
  }

  getColorOff(Privilege: Privileges) {
    if (this.listToAdd.findIndex(element => { return element == Privilege }) != -1) {
      return "#488aff"
    }
    else {
      return "lightgray"
    }
  }

  addPrivilege() {
    this.listToAdd.forEach(element => {
      this.listPrivilegeAssocie.push(element);
      this.listPrivilegeNotAssocie.splice(this.listPrivilegeNotAssocie.findIndex(elem => {
        return elem == element
      }), 1);
    })
    this.listToAdd = new Array<Privileges>();
  }

  removePrivilege() {
    this.listToRemove.forEach(element => {
      this.listPrivilegeNotAssocie.push(element);
      this.listPrivilegeAssocie.splice(this.listPrivilegeAssocie.findIndex(elem => {
        return elem == element
      }), 1);
    })
    this.listToRemove = new Array<Privileges>();
  }

  validate() {
    let newGroup: any;
    newGroup = new Object();
    if(this.navParams.data.idGroup==undefined){
      this.http.post("http://10.113.101.57:3000/group", this.nom).map(res => res.json()).subscribe(data => {
        newGroup.idGroup=data;
        newGroup.nom = this.nom;
        newGroup.state = 1;
        newGroup.privileges = this.listPrivilegeAssocie;
        console.log("newG", newGroup);
        this.http.put("http://10.113.101.57:3000/group/", newGroup).map(res => res.json()).subscribe(data => {
          console.log(data);
        });
    });
    }
    else {
      newGroup.idGroup = this.navParams.data.idGroup;
      newGroup.nom = this.nom;
      newGroup.state = 1;
      newGroup.privileges = this.listPrivilegeAssocie;
      console.log("newG", newGroup);
      this.http.put("http://10.113.101.57:3000/group/", newGroup).map(res => res.json()).subscribe(data => {
        console.log(data);
      });
    }
    
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
