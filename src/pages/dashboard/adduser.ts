import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { User } from '../../app/modele/user';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'
import { Group } from '../../app/modele/group';


@Component({
    selector: 'add-user',
    templateUrl: 'adduser.html',
})
export class AddUser {

    itemGroups: Array<Group>;

    firstname: string = null;
    surname: string = null;
    group: number = null;
    email: string = null;
    password: String = null;

    constructor(public params: NavParams, public viewCtrl: ViewController, public http: Http) {
        console.log("modal lancé");
        console.log("avec params");
        this.surname = params.data.nom;
        this.firstname = params.data.prenom;
        this.email = params.data.mail;
        this.password = params.data.password;
        this.itemGroups = new Array<Group>();
        this.http.get("http://10.113.101.89:3000/groups").map(res => res.json()).subscribe(data => {
            console.log(data);
            console.log("fk", params.data.FK_groupe);
            data.forEach(element => {
                var group = new Group(element.idGroup, element.nom, element.state);
                this.itemGroups.push(group);
                console.log("test", group.idGroup==params.data.FK_groupe);
                if (group.idGroup==params.data.FK_groupe){
                    this.group=group.idGroup;
                }
            });
            console.log("tab", this.itemGroups);
        });
        
    }

    confirm() {
        var newUser;
        var user = {
            "nom": this.surname,
            "prenom": this.firstname,
            "mail": this.email,
            "password": this.password,
            "FK_groupe": this.group,
        };
        if (this.params.data.idUser != null) {
            newUser = new User(this.params.data.idUser, user.nom, user.prenom, user.mail, user.password, this.params.data.state, user.FK_groupe);
            this.http.put("http://10.113.101.89:3000/user", newUser).map(res => res.json()).subscribe(data => {
                this.viewCtrl.dismiss(newUser);
            });
        }
        else {
            this.http.post("http://10.113.101.89:3000/user", user).map(res => res.json()).subscribe(data => {
                newUser = new User(data, user.nom, user.prenom, user.mail, user.password, true, 1);
                console.log(newUser);
                this.viewCtrl.dismiss(newUser);
            });
        }
        //let JSONuser=JSON.stringify(user);  
    }

    dismiss() {
        console.log("fin")
        this.viewCtrl.dismiss(-1);
    }

    generatePass() {
        var text = "";
        var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lowerCase = "abcdefghijklmnopqrstuvwxyz";
        var number = "0123456789";
        var randomTabPass = new Array<String>(8);

        var i = 0;


        for (i; i < 3; i++) {
            randomTabPass[i] = upperCase.charAt(Math.floor(Math.random() * upperCase.length));
        }
        for (i; i < 6; i++) {
            randomTabPass[i] = lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
        }
        for (i; i < 8; i++) {
            randomTabPass[i] = number.charAt(Math.floor(Math.random() * number.length));
        }

        this.shuffle(randomTabPass);

        for (var index = 0; index < randomTabPass.length; index++) {
            text += randomTabPass[index];
        }


        console.log("generatePass", text)
        this.password = text;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    buttonDisabled(): boolean {
        if (!this.surname || !this.firstname || !this.email || !this.group || !this.password) {
            return true;
        }
        else {
            return false;
        }
    }
}