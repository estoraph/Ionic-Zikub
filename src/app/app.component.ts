import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import   firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Initialisation de Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDCsJe9B06MFxqgt7j9M78z2kso_k0FVYo",
      authDomain: "myappmobile-info706.firebaseapp.com",
      databaseURL: "https://myappmobile-info706.firebaseio.com",
      projectId: "myappmobile-info706",
      storageBucket: "myappmobile-info706.appspot.com",
      messagingSenderId: "567074256657"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });
  }

}
