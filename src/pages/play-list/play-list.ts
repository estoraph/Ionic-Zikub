import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as firebase from "firebase";

/**
 * Generated class for the PlayListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-list',
  templateUrl: 'play-list.html',
})
export class PlayListPage {

  private dataBase = firebase.database();

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayListPage');
  }

  createNewPlayList() : void {
    const userID : string = firebase.auth().currentUser.uid;
    let prompt = this.alertCtrl.create({
      title: 'add new playlist',
      message: "enter the name of your new playlist",
      inputs: [
        {
          name:'playlist',
          placeholder: 'Playlist name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { console.log('Cancel clicked'); }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataBase.ref(`/userProfile/` + userID).child('/playlistes/').push(data.playlist);
          }
        }
      ]
      }
    );
    prompt.present();
  }

}
