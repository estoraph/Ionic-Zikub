import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import   firebase from 'firebase';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public myUser = {};

  constructor() {}

  ionViewDidLoad() {
    const userID : string = firebase.auth().currentUser.uid;
    const userRef : firebase.database.Reference = firebase.database().ref(`/userProfile/` + userID);
    userRef.on('value', personSnapshot => {
      this.myUser = personSnapshot.val();
    })
  }

}

/*
private user = firebase.auth().currentUser,
    private username,
    private firstname,
    private lastname,
    private email,
    public navCtrl: NavController, public navParams: NavParams
 */
