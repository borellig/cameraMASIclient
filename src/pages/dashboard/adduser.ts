import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { User } from '../../app/modele/user';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'


@Component({
    selector: 'add-user',
    templateUrl: 'adduser.html',
})
export class AddUser {

    itemGroups: Array<String>;

    firstname: string = null;
    surname: string = null;
    group: string = null;
    email: string = null;
    password: String = null;

    constructor(params: NavParams, public viewCtrl: ViewController, public http: Http) {
        console.log("modal lancé");
        this.itemGroups = new Array<String>("grp1", "grp2", "grp3", "grp4");
    }

    confirm() {
        let user = {
            "firstname": this.firstname,
            "surname": this.surname,
            "group": this.group,
            "email": this.email,
            "password": this.password
        };
        // this.http.post("http://10.113.101.71/", user)
        // .subscribe(data => {
        //   console.log(data);
        // });
        // this.http.post("http://10.113.101.68:3000/lol").subscribe(data => {
        //     console.log(data)
        // })
        this.viewCtrl.dismiss(user);
    }

    dismiss() {
        this.viewCtrl.dismiss();
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