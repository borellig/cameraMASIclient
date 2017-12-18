import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Access } from '../../app/modele/access';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'


@Component({
    selector: 'add-parking',
    templateUrl: 'addparking.html',
})
export class AddParking {

    nom: string;
    listAccessAssocie: Array<Access>;
    listAccessNotAssocie: Array<Access>;
    listToAdd: Array<Access>;
    listToRemove: Array<Access>

    constructor(public params: NavParams, public viewCtrl: ViewController, public http: Http) {
        this.nom = params.data.nom;
        this.listAccessAssocie = new Array<Access>();
        this.listAccessNotAssocie = new Array<Access>();
        if (params.data.idParking != undefined) {
            this.http.get("http://10.113.101.89:3000/access/" + params.data.idParking + "/on").map(res => res.json()).subscribe(data => {
                console.log("data", data);
                data.forEach(element => {
                    var access = new Access(element.nom, element.idAccess, element.FK_parking);
                    this.listAccessAssocie.push(access);
                });
                console.log("liston", this.listAccessAssocie)
            });
            this.http.get("http://10.113.101.89:3000/access/" + params.data.idParking + "/off").map(res => res.json()).subscribe(data => {
                data.forEach(element => {
                    var access = new Access(element.nom, element.idAccess, element.FK_parking);
                    this.listAccessNotAssocie.push(access);
                });
            });
        }
        else {
            this.http.get("http://10.113.101.89:3000/access/all").map(res => res.json()).subscribe(data => {
                data.forEach(element => {
                    var access = new Access(element.nom, element.idAccess, element.FK_parking);
                    this.listAccessNotAssocie.push(access);
                });
            });
        }
        this.listToAdd = new Array<Access>();
        this.listToRemove = new Array<Access>();
    }

    addToAdd(access: Access) {
        this.listToAdd.push(access);
    }

    removeToAdd(access: Access) {
        this.listToAdd.splice(this.listToAdd.findIndex(element => {
            return element == access
        }), 1);
    }

    addToRemove(access: Access) {
        this.listToRemove.push(access);
    }

    removeToRemove(access: Access) {
        this.listToRemove.splice(this.listToRemove.findIndex(element => {
            return element == access
        }), 1);
    }

    onList(access: Access) {
        console.log("onlist", access);
        if (this.listToRemove.findIndex(element => { return element == access }) != -1) {
            this.removeToRemove(access);

        }
        else {
            this.addToRemove(access);
        }
        console.log(this.listToRemove);
    }

    offList(access: Access) {
        if (this.listToAdd.findIndex(element => { return element == access }) != -1) {
            this.removeToAdd(access);

        }
        else {
            this.addToAdd(access);
        }
        console.log(this.listToAdd);
    }

    getColorOn(access: Access) {
        if (this.listToRemove.findIndex(element => { return element == access }) != -1) {
            return "lightgray"
        }
        else {
            return "#488aff"
        }
    }

    getColorOff(access: Access) {
        if (this.listToAdd.findIndex(element => { return element == access }) != -1) {
            return "#488aff"
        }
        else {
            return "lightgray"
        }
    }

    addAccess() {
        this.listToAdd.forEach(element => {
            this.listAccessAssocie.push(element);
            this.listAccessNotAssocie.splice(this.listAccessNotAssocie.findIndex(elem => {
                return elem == element
            }), 1);
        })
        this.listToAdd = new Array<Access>();
    }

    removeAccess() {
        this.listToRemove.forEach(element => {
            this.listAccessNotAssocie.push(element);
            this.listAccessAssocie.splice(this.listAccessAssocie.findIndex(elem => {
                return elem == element
            }), 1);
        })
        this.listToRemove = new Array<Access>();
    }

    validate() {
        let newParking: any;
        newParking = new Object();
        newParking.idParking = this.params.data.idParking;
        newParking.nom = this.nom;
        newParking.access = this.listAccessAssocie;
        console.log("newP",newParking);
        this.http.put("http://10.113.101.89:3000/parking/", newParking).map(res => res.json()).subscribe(data => {
            console.log(data);
        });
        this.viewCtrl.dismiss();
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}