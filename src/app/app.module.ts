import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MaterialIconsModule } from 'ionic2-material-icons';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard'
import { AddUser } from '../pages/dashboard/adduser'
import { AddGroup } from '../pages/dashboard/addgroup'
import { AddPrivilege } from '../pages/dashboard/addprivilege'
import { AddParking } from '../pages/dashboard/addparking'
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    AddUser,
    AddGroup,
    AddPrivilege,
    AddParking
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    MaterialIconsModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    AddUser,
    AddGroup,
    AddPrivilege,
    AddParking
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
