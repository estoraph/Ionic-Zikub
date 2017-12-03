import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import firebase from "firebase";

//import { CONFIG } from '../../config';
import { YouTube, SearchRequest } from 'youtube-search-google-api';
//import moment from 'moment';

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

  searchQuery: string = '';
  items: string[];

  youtubeOptions: any;
   youtube: any;
  
private locked: boolean = false;
private debug: string = '';

  private dataBase = firebase.database();

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {

    
  }

  initSearch() {
    /*this.youtubeOptions = {
      maxResults: 10,
      key: 'AIzaSyDGkjcrmfW31SJV9dYrp2tnVD_MPDbOH7w'
    };*/
    this.youtube = new YouTube();
  }

 initializeItems() {
    this.items = [
      /*'Amsterdam',
      'Bogota',*/
    ];
  }

  


  search(val: string) {
    //this.debug = moment(new Date);
  this.youtube.search(new SearchRequest({
      query: {
        key: 'AIzaSyDGkjcrmfW31SJV9dYrp2tnVD_MPDbOH7w',
        maxResults: 50,
        order: 'viewCount',
        type: 'video',
        publishedAfter: '2017-10-01T00:00:00Z',
        q: val
      }
    }, function(error, response, body) {
      // Handle the response...
      console.log("shit", error, response, body, "shit");
    }))
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    console.info('shite', val);

    this.initSearch();
    if (!this.locked) {
      this.locked = true;
      setTimeout(() => {
        this.search(val);
        this.locked = false;
      }, 3000)  
    }
    
    /*this.youtube.search(new SearchRequest(
    {
      query: {
        key: 'AIzaSyDGkjcrmfW31SJV9dYrp2tnVD_MPDbOH7w',
        maxResults: 50,
        order: 'viewCount',
        type: 'video',
        publishedAfter: '2017-10-01T00:00:00Z',
        q: val
      }
    }, function(error, response, body) {
      // Handle the response...
      console.log("shit", error, response, body, "shit");
    }))*/

    // if the value is an empty string don't filter the items
    /*if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayListPage');

    this.initializeItems();
    this.initSearch();
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
