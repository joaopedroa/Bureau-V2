import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';

import {ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database'

import {AngularFireAuthModule} from 'angularfire2/auth';

import {LoginPage} from '../pages/login/login';
import{RegisterPage} from '../pages/register/register';

const firebaseAuth = {
  apiKey: "AIzaSyCYwaSRikXqI8mo9bwc5Vqfg1Tp12dHCHk",
  authDomain: "entradadadosbureau.firebaseapp.com",
  databaseURL: "https://entradadadosbureau.firebaseio.com",
  projectId: "entradadadosbureau",
  storageBucket: "entradadadosbureau.appspot.com",
  messagingSenderId: "937777278595"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
