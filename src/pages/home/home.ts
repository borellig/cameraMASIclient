import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard'
import { ViewUserPage } from '../view-user/view-user'
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  password: string;

  phrase:string="";

  constructor(public navCtrl: NavController, public http: Http) {

  }

  connexion() {
    let user: any;
    user = new Object();
    user.email = this.email;
    user.password = this.password;
    console.log("user", user);
    this.http.post("http://10.113.101.57:3000/login", user).map(res => res.json()).subscribe(data => {
      console.log(data);
      if (data[0].admin == 0) {
        this.navCtrl.push(ViewUserPage, {idUser : data[0].idUser});
      }
      if (data[0].admin == 1) {
        this.navCtrl.push(DashboardPage);
      }
      if (data[0].result == "0") {
        this.phrase="E-Mail or Password invalid."
        //this.navCtrl.push(DashboardPage);
      }
    });


    //this.navCtrl.push(DashboardPage);
  }

}
