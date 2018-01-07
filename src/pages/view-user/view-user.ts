import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map'

/**
 * Generated class for the ViewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-user',
  templateUrl: 'view-user.html',
})
export class ViewUserPage {

  idUser:number;
  tabPassage:Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.idUser=navParams.get("idUser");
    this.tabPassage=new Array<any>();
    this.http.get("http://10.113.101.89:3000/passages/"+this.idUser).map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        //if(element.FK_user==this.idUser){
          let passage: any;
          passage = new Object();
          passage.nomParking = element.nomParking;
          passage.person = element.prenomUser + " " + element.nomUser;
          passage.FK_vehicule = element.FK_vehicule;
          passage.date = new Date(element.date).toLocaleString();
          passage.direction = element.direction;
          passage.FK_user=element.FK_user;
          this.tabPassage.push(passage);
        //}
      });
    });

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUserPage');
  }

}
